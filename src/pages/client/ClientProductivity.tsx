import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ClientProductivity() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Gestão de Produtividade" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de Pomodoro e Metas (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
