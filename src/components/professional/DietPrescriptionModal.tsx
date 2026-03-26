import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Search, Plus, Apple, Activity, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DietPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  clientId?: string
}

export function DietPrescriptionModal({ isOpen, onClose, clientId }: DietPrescriptionModalProps) {
  const [activeMeal, setActiveMeal] = useState('Almoço')
  const meals = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar']

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden flex flex-col sm:rounded-xl">
        <DialogHeader className="p-4 border-b bg-background z-10 shadow-sm shrink-0 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Prescrição Dietética
            </DialogTitle>
            <DialogDescription>
              Monte o plano alimentar arrastando alimentos e ajustando porções para o paciente.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden bg-background">
          {/* Left Sidebar: Meals */}
          <div className="w-64 border-r bg-muted/5 flex flex-col">
            <div className="p-4 border-b">
              <Button
                className="w-full justify-start text-primary border-primary/20 hover:bg-primary/10"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Refeição
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {meals.map((meal) => (
                <button
                  key={meal}
                  onClick={() => setActiveMeal(meal)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    activeMeal === meal
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel: Foods */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="p-4 border-b bg-background shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar alimento (TACO, IBGE...)"
                  className="pl-9 h-10 bg-muted/50"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-muted/10 p-6 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 shadow-sm border border-border/50">
                  <UtensilsCrossed className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <h3 className="text-base font-medium mb-1 text-foreground">
                  Nenhum alimento adicionado
                </h3>
                <p className="text-sm text-muted-foreground">
                  Nenhum alimento adicionado ao {activeMeal}. Busque acima para começar a montar
                  esta refeição.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Macros */}
          <div className="w-80 bg-muted/10 border-l flex flex-col p-6 shrink-0">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-primary" />
              Resumo da Dieta
            </h3>

            <div className="space-y-6 flex-1">
              {/* Calorias */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Calorias</span>
                  <span className="text-muted-foreground">1500 / 2000 kcal</span>
                </div>
                <Progress
                  value={75}
                  className="h-2.5 bg-blue-100 dark:bg-blue-950"
                  indicatorClassName="bg-blue-500"
                />
              </div>

              {/* Proteínas */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Proteínas</span>
                  <span className="text-muted-foreground">120g</span>
                </div>
                <Progress
                  value={60}
                  className="h-2.5 bg-red-100 dark:bg-red-950"
                  indicatorClassName="bg-red-500"
                />
              </div>

              {/* Carboidratos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Carboidratos</span>
                  <span className="text-muted-foreground">150g</span>
                </div>
                <Progress
                  value={45}
                  className="h-2.5 bg-green-100 dark:bg-green-950"
                  indicatorClassName="bg-emerald-500"
                />
              </div>

              {/* Gorduras */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Gorduras</span>
                  <span className="text-muted-foreground">50g</span>
                </div>
                <Progress
                  value={30}
                  className="h-2.5 bg-yellow-100 dark:bg-yellow-950"
                  indicatorClassName="bg-yellow-500"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white shadow-md transition-colors"
            >
              Salvar Dieta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
