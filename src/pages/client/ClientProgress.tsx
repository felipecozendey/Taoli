import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ClientProgress() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Meu Progresso" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de Gráficos e Avaliações Físicas (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
