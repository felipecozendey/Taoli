import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, PlusCircle } from 'lucide-react'

export default function ProfDashboard() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Painel do Profissional">
        <Button size="sm" className="hidden sm:flex">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Paciente
        </Button>
      </DashboardHeader>
      <PageContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900 dark:text-teal-100">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
            </CardContent>
          </Card>
        </div>

        <h3 className="font-semibold text-lg mb-4">Próximos Atendimentos</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl border bg-card flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Paciente de Demonstração {i}</p>
                <p className="text-sm text-muted-foreground">Hoje, 14:00 - Retorno</p>
              </div>
              <Button variant="outline" size="sm">
                Acessar Prontuário
              </Button>
            </div>
          ))}
        </div>
      </PageContent>
    </div>
  )
}
