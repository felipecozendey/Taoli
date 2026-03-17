import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BrainCircuit, LayoutDashboard, Database, Layers } from 'lucide-react'
import { SecondBrainPanel } from './components/SecondBrainPanel'
import { FlashcardsPanel } from './components/FlashcardsPanel'
import { StudyDashboardPanel } from './components/StudyDashboardPanel'
import { useFlashcards } from '@/hooks/use-flashcards'

export default function ClientStudy() {
  const flashcardsData = useFlashcards()

  return (
    <div className="flex flex-col min-h-screen lg:h-screen overflow-hidden bg-background">
      <DashboardHeader title="Central de Estudos & Foco">
        <div className="hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shadow-sm border border-primary/20">
          <BrainCircuit className="h-5 w-5" />
        </div>
      </DashboardHeader>

      <PageContent className="flex-1 overflow-hidden p-0 md:p-6 flex flex-col min-h-0">
        <Tabs
          defaultValue="dashboard"
          className="flex flex-col flex-1 h-full w-full animate-fade-in-up"
        >
          <div className="px-4 py-3 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 md:bg-transparent md:p-0 md:mb-4">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 h-12 bg-muted/50 p-1 border rounded-xl shadow-sm">
              <TabsTrigger
                value="dashboard"
                className="text-xs sm:text-sm h-full rounded-lg font-medium gap-2"
              >
                <LayoutDashboard className="h-4 w-4 hidden sm:block" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="second-brain"
                className="text-xs sm:text-sm h-full rounded-lg font-medium gap-2"
              >
                <Database className="h-4 w-4 hidden sm:block" />
                <span>Segundo Cérebro</span>
              </TabsTrigger>
              <TabsTrigger
                value="flashcards"
                className="text-xs sm:text-sm h-full rounded-lg font-medium gap-2"
              >
                <Layers className="h-4 w-4 hidden sm:block" />
                <span>Flashcards</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="dashboard"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none"
          >
            <StudyDashboardPanel />
          </TabsContent>

          <TabsContent
            value="second-brain"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none md:pb-0 pb-4 px-4 md:px-0"
          >
            <div className="flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col">
              <SecondBrainPanel />
            </div>
          </TabsContent>

          <TabsContent
            value="flashcards"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none md:pb-0 pb-4 px-4 md:px-0"
          >
            <div className="flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col">
              <FlashcardsPanel data={flashcardsData} />
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
