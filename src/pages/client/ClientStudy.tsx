import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { BrainCircuit, Layers, Network, Play, FileText, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const SecondBrainPanel = () => (
  <div className="flex flex-col h-full bg-background relative z-0">
    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20 shrink-0">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">Segundo Cérebro</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-2 bg-background shadow-sm hover:bg-muted/50"
      >
        <Network className="h-4 w-4 text-muted-foreground" />
        <span className="hidden xl:inline">Ver Grafo de Conhecimento</span>
        <span className="xl:hidden">Grafo</span>
      </Button>
    </div>
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Sidebar - Notes List */}
      <div className="w-16 sm:w-56 lg:w-64 border-r bg-muted/5 flex flex-col shrink-0">
        <div className="p-3 border-b">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
            <Input className="h-8 pl-8 text-xs bg-background" placeholder="Buscar notas..." />
          </div>
          <div className="sm:hidden flex justify-center">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button className="w-full flex items-center justify-center sm:justify-start gap-3 px-2 py-2 text-sm rounded-md bg-primary/10 text-primary font-medium transition-colors">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline truncate">Fisiologia Humana</span>
          </button>
          <button className="w-full flex items-center justify-center sm:justify-start gap-3 px-2 py-2 text-sm rounded-md hover:bg-muted text-muted-foreground transition-colors group">
            <Layers className="h-4 w-4 shrink-0 group-hover:text-foreground transition-colors" />
            <span className="hidden sm:inline truncate">Livro: Hábitos Atômicos</span>
          </button>
        </div>
      </div>
      {/* Editor Mockup */}
      <div className="flex-1 bg-background overflow-y-auto relative">
        <div className="absolute inset-0 p-6 lg:p-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground flex items-center gap-2">
              <span>Medicina</span>
              <span className="h-1 w-1 rounded-full bg-border"></span>
              <span>Anatomia</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground outline-none cursor-text">
              Fisiologia Humana
            </h1>

            <div className="text-muted-foreground space-y-4 pt-2 text-[15px] leading-relaxed cursor-text">
              <p>
                A fisiologia humana é o estudo das funções normais do corpo humano, abrangendo desde
                o nível celular até os sistemas orgânicos complexos. Este documento centraliza os
                conceitos principais.
              </p>

              <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-medium text-foreground">Nota Rápida</p>
                <p className="text-sm">
                  Revisar a relação entre o sistema endócrino e a homeostase celular antes da prova
                  prática.
                </p>
              </div>

              <p className="font-medium text-foreground mt-6">Tópicos Principais:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-muted-foreground">
                <li>
                  <strong className="text-foreground">Sistema Nervoso:</strong> Controle e
                  coordenação.
                </li>
                <li>
                  <strong className="text-foreground">Sistema Cardiovascular:</strong> Transporte de
                  nutrientes e oxigênio pela corrente sanguínea.
                </li>
                <li>
                  <strong className="text-foreground">Homeostase:</strong> Manutenção do equilíbrio
                  dinâmico interno frente a mudanças externas.
                </li>
              </ul>

              <div className="pt-8 flex items-center gap-2 text-sm text-muted-foreground/60">
                <span className="w-1 h-5 bg-primary/40 animate-pulse"></span>
                <span>Continue escrevendo (simulado)...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const FlashcardsPanel = () => (
  <div className="flex flex-col h-full bg-muted/10 relative z-0">
    <div className="flex items-center px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-amber-500" />
        <span className="font-semibold text-sm">Flashcards (SRS)</span>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        Meus Baralhos Ativos
      </h3>

      {/* Glassmorphism Card */}
      <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm hover:shadow-md hover:bg-background/80 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1.5">Anatomia Básica</CardTitle>
              <CardDescription>Sistemas do corpo humano e estruturas vitais.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex justify-between items-center mb-6 bg-muted/30 p-4 rounded-xl border border-white/5">
            <div className="flex flex-col items-center flex-1">
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">15</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                A Revisar
              </span>
            </div>
            <div className="w-px h-10 bg-border/60"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">5</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                Novos
              </span>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full gap-2 rounded-xl h-12 font-medium text-base shadow-sm"
          >
            <Play className="h-4 w-4 fill-current" />
            Estudar Agora
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-4 border-dashed bg-transparent shadow-none hover:bg-muted/20 transition-colors cursor-pointer flex items-center justify-center h-32">
        <div className="flex flex-col items-center text-muted-foreground gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">+</span>
          </div>
          <span className="text-sm font-medium">Criar Novo Baralho</span>
        </div>
      </Card>
    </div>
  </div>
)

export default function ClientStudy() {
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
              <FlashcardsPanel />
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
                <FlashcardsPanel />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageContent>
    </div>
  )
}
