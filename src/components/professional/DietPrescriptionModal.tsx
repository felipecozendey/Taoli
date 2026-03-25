import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface DietPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DietPrescriptionModal({ isOpen, onClose }: DietPrescriptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden flex flex-col sm:rounded-xl">
        <DialogHeader className="p-4 border-b bg-background z-10 shadow-sm shrink-0">
          <DialogTitle className="text-xl">Prescrição Dietética</DialogTitle>
          <DialogDescription>
            Crie um plano alimentar completo com refeições e metas de macronutrientes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden p-6 bg-background flex flex-col">
          <Tabs defaultValue="meals" className="h-full flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none pb-px h-auto bg-transparent">
              <TabsTrigger
                value="meals"
                className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Refeições
              </TabsTrigger>
              <TabsTrigger
                value="foods"
                className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Biblioteca de Alimentos
              </TabsTrigger>
              <TabsTrigger
                value="macros"
                className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Resumo de Macros
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-6">
              <TabsContent value="meals" className="mt-0 h-full">
                <div className="h-full border border-dashed rounded-xl flex items-center justify-center text-muted-foreground p-8">
                  Área para adicionar e organizar refeições. Em breve.
                </div>
              </TabsContent>
              <TabsContent value="foods" className="mt-0 h-full">
                <div className="h-full border border-dashed rounded-xl flex items-center justify-center text-muted-foreground p-8">
                  Biblioteca de alimentos e pesquisa rápida. Em breve.
                </div>
              </TabsContent>
              <TabsContent value="macros" className="mt-0 h-full">
                <div className="h-full border border-dashed rounded-xl flex items-center justify-center text-muted-foreground p-8">
                  Cálculo total de calorias e distribuição de macros. Em breve.
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="p-4 border-t bg-muted/10 flex justify-end gap-2 shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button>Salvar Dieta</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
