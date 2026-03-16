import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ProfCalendar() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Agenda" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de Agenda Semanal (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
