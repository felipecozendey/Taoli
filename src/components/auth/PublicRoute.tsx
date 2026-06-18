import { Navigate, Outlet } from 'react-router-dom'
import { useAuth, Role } from '@/contexts/AuthContext'

export function PublicRoute() {
  const { user, activeRole, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (user && activeRole) {
    const routes: Record<Role, string> = {
      admin: '/master',
      professional: '/professional',
      client: '/client',
    }
    return <Navigate to={routes[activeRole] || '/'} replace />
  }

  return <Outlet />
}
