import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { Session } from '@supabase/supabase-js'

export type Role = 'admin' | 'professional' | 'client'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  impersonatedUser: User | null
  session: Session | null
  isLoading: boolean
  activeRole: Role | null
  highestRole: Role | null
  logout: () => Promise<void>
  switchRole: (newRole: Role) => void
  startImpersonation: (targetUser: any) => Promise<void>
  stopImpersonation: () => void
  isImpersonating: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [realUser, setRealUser] = useState<User | null>(null)
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [realActiveRole, setRealActiveRole] = useState<Role | null>(null)
  const [realHighestRole, setRealHighestRole] = useState<Role | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    let mounted = true

    if (session) {
      setIsLoading(true)
      supabase
        .from('profiles')
        .select('name, role')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (mounted) {
            if (!error && data) {
              const dbRole = (data.role as Role) || 'client'
              let initialActiveRole = dbRole

              const savedRole = localStorage.getItem('activeRole') as Role | null
              if (savedRole) {
                if (dbRole === 'admin' || (dbRole === 'professional' && savedRole !== 'admin')) {
                  initialActiveRole = savedRole
                }
              }

              setRealHighestRole(dbRole)
              setRealActiveRole(initialActiveRole)

              setRealUser({
                id: session.user.id,
                email: session.user.email || '',
                name: data.name || 'Usuário',
                role: initialActiveRole,
              })
            } else {
              setRealUser(null)
              setRealActiveRole(null)
              setRealHighestRole(null)
            }
            setIsLoading(false)
          }
        })
    } else {
      setRealUser(null)
      setRealActiveRole(null)
      setRealHighestRole(null)
      setImpersonatedUser(null)
      setIsLoading(false)
    }

    return () => {
      mounted = false
    }
  }, [session])

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
    } else {
      setRealUser(null)
      setSession(null)
      setRealActiveRole(null)
      setRealHighestRole(null)
      setImpersonatedUser(null)
      localStorage.removeItem('activeRole')
    }
  }

  const switchRole = (newRole: Role) => {
    if (impersonatedUser) return
    if (!realHighestRole || !realUser) return

    if (realHighestRole === 'client' && newRole !== 'client') return
    if (realHighestRole === 'professional' && newRole === 'admin') return

    localStorage.setItem('activeRole', newRole)
    setRealActiveRole(newRole)
    setRealUser({ ...realUser, role: newRole })

    const routes: Record<Role, string> = {
      admin: '/master',
      professional: '/professional',
      client: '/client',
    }
    navigate(routes[newRole])
  }

  const startImpersonation = async (targetUser: any) => {
    if (!realUser || realHighestRole !== 'admin') return

    const targetRole = targetUser.role || 'client'

    try {
      const { error } = await supabase.from('audit_logs' as any).insert({
        admin_id: realUser.id,
        target_user_id: targetUser.id,
        action: 'IMPERSONATE_START',
        details: { targetRole },
      })

      if (error) {
        throw error
      }

      setImpersonatedUser({
        id: targetUser.id,
        email: targetUser.email || '',
        name: targetUser.name || 'Usuário',
        role: targetRole as Role,
      })

      const routes: Record<Role, string> = {
        admin: '/master',
        professional: '/professional',
        client: '/client',
      }
      navigate(routes[targetRole as Role] || '/client')
    } catch (error) {
      console.error('Failed to log impersonation start. Access blocked.', error)
      alert('Failed to log impersonation start. Access blocked.')
    }
  }

  const stopImpersonation = () => {
    setImpersonatedUser(null)
    navigate('/master/users')
  }

  const isImpersonating = !!impersonatedUser
  const user = impersonatedUser || realUser
  const activeRole = impersonatedUser ? impersonatedUser.role : realActiveRole
  const highestRole = impersonatedUser ? impersonatedUser.role : realHighestRole

  return (
    <AuthContext.Provider
      value={{
        user,
        impersonatedUser,
        session,
        isLoading,
        activeRole,
        highestRole,
        logout,
        switchRole,
        startImpersonation,
        stopImpersonation,
        isImpersonating,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
