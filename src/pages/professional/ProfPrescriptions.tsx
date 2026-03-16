import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'

export default function ProfPrescriptions() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Prescrições e Dietas" />
      <PageContent>
        <div className="p-12 text-center text-muted-foreground border rounded-xl border-dashed">
          Módulo de Emissão de Documentos (Em desenvolvimento)
        </div>
      </PageContent>
    </div>
  )
}
