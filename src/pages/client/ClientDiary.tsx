import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ClientDiary() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Meu Diário" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de Diário Alimentar e Emocional (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
