import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Mail, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha e-mail e senha.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        const role = profile?.role || 'client'
        const routes: Record<string, string> = {
          admin: '/master',
          professional: '/professional',
          client: '/client',
        }

        navigate(routes[role] || '/client')
      }
    } catch (error: any) {
      toast({
        title: 'Falha na Autenticação',
        description:
          error.message === 'Invalid login credentials'
            ? 'E-mail ou senha incorretos.'
            : 'Ocorreu um erro ao tentar entrar. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md animate-fade-in-up border-border/50 shadow-lg">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-bold">Acessar Plataforma</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground w-full mt-2">
              <p className="font-semibold mb-2 text-foreground">Contas de teste:</p>
              <ul className="space-y-1.5">
                <li className="flex justify-between">
                  <span className="font-medium">Admin:</span>
                  <span className="font-mono bg-background px-1 rounded border">
                    admin@system.com / Admin123!
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Profissional:</span>
                  <span className="font-mono bg-background px-1 rounded border">
                    profissional@clinica.com / Prof123!
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Cliente:</span>
                  <span className="font-mono bg-background px-1 rounded border">
                    cliente@email.com / Client123!
                  </span>
                </li>
              </ul>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
