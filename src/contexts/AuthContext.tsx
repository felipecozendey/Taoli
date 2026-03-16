import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type Role = 'ADMIN' | 'PROFESSIONAL' | 'CLIENT'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USERS: Record<Role, User> = {
  ADMIN: {
    id: 'admin-1',
    name: 'Master Admin',
    email: 'admin@system.com',
    role: 'ADMIN',
    avatarUrl: 'https://img.usecurling.com/i?q=admin&shape=fill&color=gray',
  },
  PROFESSIONAL: {
    id: 'prof-1',
    name: 'Dra. Ana Silva',
    email: 'ana.silva@clinica.com',
    role: 'PROFESSIONAL',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  CLIENT: {
    id: 'client-1',
    name: 'Carlos Mendes',
    email: 'carlos@email.com',
    role: 'CLIENT',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial load from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('saas_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (role: Role) => {
    const selectedUser = MOCK_USERS[role]
    setUser(selectedUser)
    localStorage.setItem('saas_user', JSON.stringify(selectedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('saas_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
