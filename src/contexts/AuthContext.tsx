import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
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
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: data.name || 'Usuário',
                role: (data.role as Role) || 'client',
              })
            } else {
              setUser(null)
            }
            setIsLoading(false)
          }
        })
    } else {
      setUser(null)
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
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, logout }}>
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
