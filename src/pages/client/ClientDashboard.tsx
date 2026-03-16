import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Droplets, Moon, Flame } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ClientDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title={`Olá, ${user?.name?.split(' ')[0] || 'Visitante'} 👋`} />
      <PageContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-indigo-50 border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
              <Droplets className="h-6 w-6 text-indigo-500 mb-2" />
              <div className="font-semibold text-lg">1.2L</div>
              <div className="text-xs text-muted-foreground">de Água</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-100 dark:bg-orange-950/30 dark:border-orange-900">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
              <Flame className="h-6 w-6 text-orange-500 mb-2" />
              <div className="font-semibold text-lg">450 kcal</div>
              <div className="text-xs text-muted-foreground">Queimadas</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100 dark:bg-purple-950/30 dark:border-purple-900">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
              <Moon className="h-6 w-6 text-purple-500 mb-2" />
              <div className="font-semibold text-lg">7h 20m</div>
              <div className="text-xs text-muted-foreground">Sono</div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 mb-2" />
              <div className="font-semibold text-lg">3/5</div>
              <div className="text-xs text-muted-foreground">Hábitos</div>
            </CardContent>
          </Card>
        </div>

        <h3 className="font-semibold text-lg mb-4">Tarefas de Produtividade Hoje</h3>
        <Card>
          <div className="divide-y">
            {[
              'Leitura Matinal (30 min)',
              'Reunião de Alinhamento (Foco)',
              'Treino de Força (Prescrito)',
            ].map((task, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                <span className="text-sm">{task}</span>
              </div>
            ))}
          </div>
        </Card>
      </PageContent>
    </div>
  )
}
