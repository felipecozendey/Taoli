import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ProfPatients() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Meus Pacientes" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de listagem de pacientes (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
