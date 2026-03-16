import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function MasterSettings() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Configurações Globais" />
      <PageContent>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
            <CardDescription>Gerencie o nome e comportamento global da plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
      </PageContent>
    </div>
  )
}
