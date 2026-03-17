import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { BrainCircuit } from 'lucide-react'
import { SecondBrainPanel } from './components/SecondBrainPanel'
import { FlashcardsPanel } from './components/FlashcardsPanel'
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

      <PageContent className="flex-1 overflow-hidden p-4 md:p-6 flex flex-col min-h-0">
        {/* Desktop Layout (Resizable Columns) */}
        <div className="hidden md:flex flex-1 min-h-0 h-full w-full rounded-xl border bg-background shadow-sm overflow-hidden animate-fade-in-up">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full items-stretch">
            <ResizablePanel defaultSize={60} minSize={30} className="h-full">
              <SecondBrainPanel />
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="w-[1px] bg-border/60 relative before:absolute before:inset-y-0 before:-inset-x-2 before:bg-transparent"
            />

            <ResizablePanel defaultSize={40} minSize={25} className="h-full">
              <FlashcardsPanel data={flashcardsData} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout (Tabs) */}
        <div className="md:hidden flex flex-col flex-1 min-h-0 h-full w-full animate-fade-in-up">
          <Tabs defaultValue="second-brain" className="flex flex-col flex-1 h-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 shrink-0 h-12 bg-muted/50 p-1 border">
              <TabsTrigger
                value="second-brain"
                className="text-xs sm:text-sm h-full rounded-md font-medium"
              >
                Segundo Cérebro
              </TabsTrigger>
              <TabsTrigger
                value="flashcards"
                className="text-xs sm:text-sm h-full rounded-md font-medium"
              >
                Flashcards (SRS)
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="second-brain"
              className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none"
            >
              <div className="flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col">
                <SecondBrainPanel />
              </div>
            </TabsContent>
            <TabsContent
              value="flashcards"
              className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none"
            >
              <div className="flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col">
                <FlashcardsPanel data={flashcardsData} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageContent>
    </div>
  )
}
