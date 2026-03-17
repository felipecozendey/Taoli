import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BrainCircuit, Layers, Network, FileText, Search } from 'lucide-react'

export function SecondBrainPanel() {
  return (
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
                  A fisiologia humana é o estudo das funções normais do corpo humano, abrangendo
                  desde o nível celular até os sistemas orgânicos complexos. Este documento
                  centraliza os conceitos principais.
                </p>

                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium text-foreground">Nota Rápida</p>
                  <p className="text-sm">
                    Revisar a relação entre o sistema endócrino e a homeostase celular antes da
                    prova prática.
                  </p>
                </div>

                <p className="font-medium text-foreground mt-6">Tópicos Principais:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Sistema Nervoso:</strong> Controle e
                    coordenação.
                  </li>
                  <li>
                    <strong className="text-foreground">Sistema Cardiovascular:</strong> Transporte
                    de nutrientes e oxigênio pela corrente sanguínea.
                  </li>
                  <li>
                    <strong className="text-foreground">Homeostase:</strong> Manutenção do
                    equilíbrio dinâmico interno frente a mudanças externas.
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
}
