import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth, Role } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface ProtectedRouteProps {
  allowedRoles: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, activeRole, isLoading: authLoading, logout } = useAuth()
  const location = useLocation()
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    let mounted = true
    // Server-side JWT validation for high-privilege master roles
    if (activeRole === 'admin' && user && !authLoading) {
      setIsValidating(true)
      supabase.auth.getUser().then(({ data: { user: serverUser }, error }) => {
        if (!mounted) return
        if (error || !serverUser) {
          logout()
        } else {
          setIsValidating(false)
        }
      })
    }
    return () => {
      mounted = false
    }
  }, [activeRole, user, authLoading, logout])

  if (authLoading || isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user || !activeRole) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(activeRole)) {
    const fallbackRoutes: Record<Role, string> = {
      admin: '/master',
      professional: '/professional',
      client: '/client',
    }
    return <Navigate to={fallbackRoutes[activeRole] || '/'} replace />
  }

  return <Outlet />
}
