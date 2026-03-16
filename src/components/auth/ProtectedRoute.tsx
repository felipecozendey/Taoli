import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth, Role } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  allowedRoles: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    // Redirect to login while saving the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(user.role)) {
    // Determine fallback route based on role
    const fallbackRoutes: Record<Role, string> = {
      ADMIN: '/master',
      PROFESSIONAL: '/professional',
      CLIENT: '/client',
    }
    return <Navigate to={fallbackRoutes[user.role]} replace />
  }

  return <Outlet />
}
