import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { PatientChat } from '@/components/professional/PatientChat'

export default function ProfMessages() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Mensagens e Orientações" />
      <PageContent className="flex-1 overflow-hidden p-6 flex flex-col">
        <PatientChat />
      </PageContent>
    </div>
  )
}
