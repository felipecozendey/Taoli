import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dumbbell, Timer, Activity, CheckCircle2, Check, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const TODAY_EXERCISES = [
  { id: '1', name: 'Supino Reto com Barra', m: 'Peito', sets: '3x', reps: '10-12' },
  { id: '2', name: 'Desenvolvimento com Halteres', m: 'Ombros', sets: '4x', reps: '10' },
  { id: '3', name: 'Tríceps Pulley', m: 'Tríceps', sets: '3x', reps: '15' },
]

const WEEKLY_PLANS = [
  { id: 'A', title: 'Treino A', desc: 'Peito, Ombro e Tríceps' },
  { id: 'B', title: 'Treino B', desc: 'Costas, Bíceps e Abdômen' },
  { id: 'C', title: 'Treino C', desc: 'Pernas Completas e Panturrilha' },
  { id: 'D', title: 'Descanso Ativo', desc: 'Cardio leve 30 min + Alongamento' },
]

const LOAD_EVOLUTION = [
  { id: '1', name: 'Supino Reto com Barra', old: '60kg', new: '70kg', date: 'Há 2 semanas' },
  { id: '2', name: 'Leg Press 45°', old: '150kg', new: '180kg', date: 'Há 1 mês' },
  { id: '3', name: 'Remada Curvada', old: '40kg', new: '50kg', date: 'Há 3 semanas' },
]

export default function ClientTraining() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  const toggleComplete = (id: string) => setCompleted((p) => ({ ...p, [id]: !p[id] }))

  return (
    <div className="flex flex-col min-h-full pb-20 md:pb-0">
      <DashboardHeader title="Os Meus Treinos">
        <Badge variant="secondary" className="hidden sm:inline-flex bg-muted">
          Treinador: Prof. Marcos
        </Badge>
      </DashboardHeader>

      <PageContent className="max-w-3xl mx-auto w-full animate-fade-in-up px-4 py-4 md:p-6">
        <div className="flex sm:hidden mb-4 items-center gap-2">
          <Badge variant="secondary" className="bg-muted w-full justify-center py-1.5 text-sm">
            Treinador: Prof. Marcos
          </Badge>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1 bg-muted/60">
            <TabsTrigger
              value="today"
              className="py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full"
            >
              Treino de Hoje
            </TabsTrigger>
            <TabsTrigger
              value="plans"
              className="py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full"
            >
              Meus Planos
            </TabsTrigger>
            <TabsTrigger
              value="evolution"
              className="py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full"
            >
              Evolução
              <br className="sm:hidden" /> de Cargas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-0 space-y-4">
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-primary text-lg">Treino A - Peito e Tríceps</h3>
                <div className="flex items-center gap-1.5 text-primary/80 text-sm mt-1">
                  <Timer className="w-4 h-4" />
                  <span>Duração estimada: 55 min</span>
                </div>
              </div>
              <Dumbbell className="w-10 h-10 text-primary/30" />
            </div>

            <div className="space-y-4">
              {TODAY_EXERCISES.map((ex, idx) => {
                const isCompleted = completed[ex.id]
                return (
                  <Card
                    key={ex.id}
                    className={cn(
                      'transition-all duration-300',
                      isCompleted && 'opacity-60 bg-muted/50',
                    )}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400">
                              {ex.m}
                            </span>
                          </div>
                          <h4
                            className={cn(
                              'font-bold text-base sm:text-lg leading-tight',
                              isCompleted && 'line-through text-muted-foreground',
                            )}
                          >
                            {ex.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5" /> Meta: {ex.sets} {ex.reps} reps
                          </p>
                        </div>
                        <Button
                          variant={isCompleted ? 'default' : 'outline'}
                          size="icon"
                          className={cn(
                            'shrink-0 rounded-full h-12 w-12 transition-colors',
                            isCompleted
                              ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white'
                              : 'border-muted-foreground/30',
                          )}
                          onClick={() => toggleComplete(ex.id)}
                        >
                          <Check
                            className={cn(
                              'h-6 w-6',
                              isCompleted ? 'text-white' : 'text-muted-foreground/50',
                            )}
                          />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dashed">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            Carga (kg)
                          </label>
                          <Input
                            type="number"
                            placeholder="Ex: 20"
                            className="h-11 bg-background text-sm"
                            disabled={isCompleted}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            Repetições
                          </label>
                          <Input
                            type="number"
                            placeholder="Ex: 12"
                            className="h-11 bg-background text-sm"
                            disabled={isCompleted}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Button className="w-full h-14 text-lg mt-6" size="lg">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Finalizar Treino
            </Button>
          </TabsContent>

          <TabsContent value="plans" className="mt-0">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {WEEKLY_PLANS.map((plan) => (
                <AccordionItem
                  key={plan.id}
                  value={plan.id}
                  className="bg-card border rounded-xl overflow-hidden px-1"
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <div className="flex flex-col items-start text-left gap-1">
                      <span className="font-bold text-base">{plan.title}</span>
                      <span className="text-sm text-muted-foreground font-normal">{plan.desc}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-2">Exercícios previstos:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Exercício Exemplo 1</li>
                        <li>Exercício Exemplo 2</li>
                        <li>Exercício Exemplo 3</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="evolution" className="mt-0 space-y-3">
            {LOAD_EVOLUTION.map((evo) => (
              <Card key={evo.id} className="overflow-hidden">
                <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> {evo.date}
                    </p>
                    <h4 className="font-bold text-base truncate">{evo.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg shrink-0 border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-sm font-semibold text-muted-foreground line-through decoration-emerald-300">
                      {evo.old}
                    </span>
                    <span className="text-emerald-500 font-bold text-lg sm:text-xl">→</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg sm:text-xl">
                      {evo.new}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
