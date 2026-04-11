import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from 'next-themes'
import { Moon, Sun, Palette, Settings2, CreditCard, ShieldCheck } from 'lucide-react'

export default function MasterSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Configurações Globais" />
      <PageContent>
        <Tabs defaultValue="appearance" className="max-w-4xl">
          <TabsList className="mb-6">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tema da Plataforma (Admin)</CardTitle>
                <CardDescription>
                  Personalize a interface do painel de administração. Escolha entre o modo claro,
                  escuro ou o tema especial Taoli.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-6 w-6" />
                  Claro
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-6 w-6" />
                  Escuro
                </Button>
                <Button
                  variant={theme === 'taoli' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('taoli')}
                >
                  <Palette className="h-6 w-6" />
                  Taoli
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-primary" />
                    <CardTitle>Informações do Sistema</CardTitle>
                  </div>
                  <CardDescription>
                    Gerencie o nome e comportamento global da plataforma.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <Label>Nome da Plataforma</Label>
                    <Input defaultValue="HealthSaaS B2B2C" />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail de Suporte Administrativo</Label>
                    <Input defaultValue="suporte@healthsaas.com" />
                  </div>
                  <Button>Salvar Configurações</Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <CardTitle>Taxas do Sistema & Gateways</CardTitle>
                    </div>
                    <CardDescription>
                      Configure as taxas cobradas aos profissionais e os provedores de pagamento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 bg-secondary/50 rounded-lg border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
                      Módulo de pagamentos em breve.
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" disabled className="w-full">
                      Gerir Pagamentos
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <CardTitle>Políticas Globais</CardTitle>
                    </div>
                    <CardDescription>
                      Termos de uso, política de privacidade e regras de conformidade.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 bg-secondary/50 rounded-lg border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
                      Módulo de políticas em breve.
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" disabled className="w-full">
                      Gerir Políticas
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
