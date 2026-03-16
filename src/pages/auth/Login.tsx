import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, Role } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Stethoscope, Leaf } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSimulatedLogin = (role: Role) => {
    setIsLoading(true)
    // Simulate network delay
    setTimeout(() => {
      login(role)
      const routes = { ADMIN: '/master', PROFESSIONAL: '/professional', CLIENT: '/client' }
      navigate(routes[role])
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md animate-fade-in-up border-border/50 shadow-lg">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold">Acessar Plataforma</CardTitle>
          <CardDescription>
            Ambiente de demonstração. Selecione um perfil para entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simulacao" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="simulacao">Simulação (RBAC)</TabsTrigger>
              <TabsTrigger value="padrao">Acesso Padrão</TabsTrigger>
            </TabsList>

            <TabsContent value="simulacao" className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-14 justify-start px-6 gap-4"
                onClick={() => handleSimulatedLogin('ADMIN')}
                disabled={isLoading}
              >
                <Building2 className="text-slate-600" />
                <div className="text-left">
                  <div className="font-semibold">Entrar como Administrador</div>
                  <div className="text-xs text-muted-foreground">Acesso ao MasterLayout</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-14 justify-start px-6 gap-4 border-teal-200 hover:border-teal-300 hover:bg-teal-50"
                onClick={() => handleSimulatedLogin('PROFESSIONAL')}
                disabled={isLoading}
              >
                <Stethoscope className="text-teal-600" />
                <div className="text-left text-teal-900">
                  <div className="font-semibold">Entrar como Profissional</div>
                  <div className="text-xs opacity-80">Acesso ao ProfessionalLayout</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-14 justify-start px-6 gap-4 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50"
                onClick={() => handleSimulatedLogin('CLIENT')}
                disabled={isLoading}
              >
                <Leaf className="text-indigo-600" />
                <div className="text-left text-indigo-900">
                  <div className="font-semibold">Entrar como Cliente</div>
                  <div className="text-xs opacity-80">Acesso ao ClientLayout</div>
                </div>
              </Button>
            </TabsContent>

            <TabsContent value="padrao" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="m@exemplo.com" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" disabled />
              </div>
              <Button className="w-full" disabled>
                Entrar
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Por favor, use a aba "Simulação" para esta demonstração arquitetural.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
