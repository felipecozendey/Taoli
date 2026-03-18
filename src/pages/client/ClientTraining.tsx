import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dumbbell, Timer, Activity, CheckCircle2, Check, Target, HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { getClientActivePlans, getFullPlanDetails } from '@/services/training'

// Keep evolution mock as it's not part of the current AC scope to replace
const LOAD_EVOLUTION = [
  { id: '1', name: 'Supino Reto com Barra', old: '60kg', new: '70kg', date: 'Há 2 semanas' },
  { id: '2', name: 'Leg Press 45°', old: '150kg', new: '180kg', date: 'Há 1 mês' },
  { id: '3', name: 'Remada Curvada', old: '40kg', new: '50kg', date: 'Há 3 semanas' },
]

type PlanListType = {
  id: string
  name: string
  plan_type: string
  client_id: string
  professional_id: string
  is_active: boolean
}

type FullPlanDetailsType = PlanListType & {
  items: {
    id: string
    sets: number
    reps: string
    rest_seconds: number | null
    target_load_kg: number | null
    frequency: string | null
    pain_limit_eva: number | null
    order_index: number
    exercise: {
      name: string
      muscle_group: string
      video_url: string | null
    }
  }[]
}

export default function ClientTraining() {
  const { user } = useAuth()
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  const [isLoading, setIsLoading] = useState(true)
  const [allPlans, setAllPlans] = useState<PlanListType[]>([])
  const [activePlan, setActivePlan] = useState<FullPlanDetailsType | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      if (!user?.id) return

      try {
        setIsLoading(true)
        const plans = await getClientActivePlans(user.id)

        if (!isMounted) return

        if (plans && plans.length > 0) {
          setAllPlans(plans as PlanListType[])
          const fullDetails = await getFullPlanDetails(plans[0].id)
          if (isMounted) setActivePlan(fullDetails as unknown as FullPlanDetailsType)
        } else {
          setAllPlans([])
          setActivePlan(null)
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [user?.id])

  const toggleComplete = (id: string) => setCompleted((p) => ({ ...p, [id]: !p[id] }))

  return (
    <div className="flex flex-col min-h-full pb-20 md:pb-0">
      <DashboardHeader title="Os Meus Treinos">
        <Badge variant="secondary" className="hidden sm:inline-flex bg-muted">
          Área de Exercício
        </Badge>
      </DashboardHeader>

      <PageContent className="max-w-3xl mx-auto w-full animate-fade-in-up px-4 py-4 md:p-6">
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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
            ) : !activePlan ? (
              <div className="text-center py-16 px-4 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
                <Dumbbell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">Nenhum plano ativo</h3>
                <p className="text-sm text-muted-foreground">
                  Nenhum plano de treino ou reabilitação prescrito no momento.
                </p>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    'border p-4 rounded-xl flex items-center justify-between mb-6',
                    activePlan.plan_type === 'workout'
                      ? 'bg-primary/10 border-primary/20 text-primary'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
                  )}
                >
                  <div>
                    <h3 className="font-bold text-lg">{activePlan.name}</h3>
                    <div className="flex items-center gap-1.5 opacity-80 text-sm mt-1">
                      <Timer className="w-4 h-4" />
                      <span>
                        {activePlan.plan_type === 'workout'
                          ? 'Treino Prescrito'
                          : 'Protocolo de Reabilitação'}
                      </span>
                    </div>
                  </div>
                  {activePlan.plan_type === 'workout' ? (
                    <Dumbbell className="w-10 h-10 opacity-30" />
                  ) : (
                    <HeartPulse className="w-10 h-10 opacity-30" />
                  )}
                </div>

                <div className="space-y-4">
                  {activePlan.items?.map((item, idx) => {
                    const isCompleted = completed[item.id]
                    const isWorkout = activePlan.plan_type === 'workout'

                    return (
                      <Card
                        key={item.id}
                        className={cn(
                          'transition-all duration-300',
                          isCompleted && 'opacity-60 bg-muted/50',
                        )}
                      >
                        <CardContent className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400">
                                  {item.exercise?.muscle_group || 'Geral'}
                                </span>
                              </div>
                              <h4
                                className={cn(
                                  'font-bold text-base sm:text-lg leading-tight mt-1',
                                  isCompleted && 'line-through text-muted-foreground',
                                )}
                              >
                                {item.exercise?.name || 'Exercício'}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5" /> Meta: {item.sets}x {item.reps}{' '}
                                reps
                              </p>

                              {/* Chameleon UI based on plan type */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {isWorkout ? (
                                  <>
                                    <Badge
                                      variant="outline"
                                      className="bg-background text-xs font-normal"
                                    >
                                      Carga Alvo:{' '}
                                      <span className="font-semibold ml-1">
                                        {item.target_load_kg ? `${item.target_load_kg}kg` : '-'}
                                      </span>
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-background text-xs font-normal"
                                    >
                                      Descanso:{' '}
                                      <span className="font-semibold ml-1">
                                        {item.rest_seconds ? `${item.rest_seconds}s` : '-'}
                                      </span>
                                    </Badge>
                                  </>
                                ) : (
                                  <>
                                    <Badge
                                      variant="outline"
                                      className="bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 text-xs font-normal"
                                    >
                                      Frequência:{' '}
                                      <span className="font-semibold ml-1">
                                        {item.frequency || '-'}
                                      </span>
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 text-xs font-normal"
                                    >
                                      Limite de Dor (EVA):{' '}
                                      <span className="font-semibold ml-1">
                                        {item.pain_limit_eva ?? '-'}
                                      </span>
                                    </Badge>
                                  </>
                                )}
                              </div>
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
                              onClick={() => toggleComplete(item.id)}
                            >
                              <Check
                                className={cn(
                                  'h-6 w-6',
                                  isCompleted ? 'text-white' : 'text-muted-foreground/50',
                                )}
                              />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dashed mt-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                Carga Real (kg)
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 20"
                                className="h-10 bg-background text-sm"
                                disabled={isCompleted}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                Repetições Reais
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 12"
                                className="h-10 bg-background text-sm"
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
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Finalizar Sessão
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="plans" className="mt-0">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            ) : allPlans.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Nenhum plano encontrado.
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {allPlans.map((plan) => (
                  <AccordionItem
                    key={plan.id}
                    value={plan.id}
                    className="bg-card border rounded-xl overflow-hidden px-1"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex flex-col items-start text-left gap-1">
                        <span className="font-bold text-base">{plan.name}</span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs font-medium mt-1',
                            plan.plan_type === 'rehabilitation' &&
                              'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
                          )}
                        >
                          {plan.plan_type === 'workout' ? 'Treino' : 'Reabilitação'}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-2">
                          Para ver os exercícios, visualize este plano na aba "Treino de Hoje".
                        </p>
                        {plan.id !== activePlan?.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={() => {
                              // Could add a function to switch active plan here if desired
                              // For now, it shows the active plan by default
                            }}
                          >
                            Tornar Plano Ativo (Em Breve)
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
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
