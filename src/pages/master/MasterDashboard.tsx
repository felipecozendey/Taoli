import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Activity, CreditCard } from 'lucide-react'

export default function MasterDashboard() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Master Admin Dashboard" />
      <PageContent>
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,234</div>
              <p className="text-xs text-muted-foreground">+180 desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profissionais Ativos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">423</div>
              <p className="text-xs text-muted-foreground">+12 aprovações pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Estimada</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 124.500</div>
              <p className="text-xs text-muted-foreground">+8.2% de crescimento</p>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-64 flex items-center justify-center text-muted-foreground">
          [Gráfico de Crescimento de Usuários - Placeholder]
        </div>
      </PageContent>
    </div>
  )
}
