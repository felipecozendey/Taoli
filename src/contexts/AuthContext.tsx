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
  session: Session | null
  isLoading: boolean
  activeRole: Role | null
  highestRole: Role | null
  logout: () => Promise<void>
  switchRole: (newRole: Role) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<Role | null>(null)
  const [highestRole, setHighestRole] = useState<Role | null>(null)

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

              setHighestRole(dbRole)
              setActiveRole(initialActiveRole)

              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: data.name || 'Usuário',
                role: initialActiveRole,
              })
            } else {
              setUser(null)
              setActiveRole(null)
              setHighestRole(null)
            }
            setIsLoading(false)
          }
        })
    } else {
      setUser(null)
      setActiveRole(null)
      setHighestRole(null)
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
      setUser(null)
      setSession(null)
      setActiveRole(null)
      setHighestRole(null)
      localStorage.removeItem('activeRole')
    }
  }

  const switchRole = (newRole: Role) => {
    if (!highestRole || !user) return

    if (highestRole === 'client' && newRole !== 'client') return
    if (highestRole === 'professional' && newRole === 'admin') return

    localStorage.setItem('activeRole', newRole)
    setActiveRole(newRole)
    setUser({ ...user, role: newRole })

    const routes: Record<Role, string> = {
      admin: '/master',
      professional: '/professional',
      client: '/client',
    }
    navigate(routes[newRole])
  }

  return (
    <AuthContext.Provider
      value={{ user, session, isLoading, activeRole, highestRole, logout, switchRole }}
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
