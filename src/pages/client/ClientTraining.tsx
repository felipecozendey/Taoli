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
import {
  Dumbbell,
  Timer,
  Activity,
  CheckCircle2,
  Check,
  Target,
  HeartPulse,
  Edit2,
  Plus,
  Lightbulb,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { getClientActivePlans, getFullPlanDetails } from '@/services/training'
import { TrainingBuilderModal } from '@/components/training/TrainingBuilderModal'
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalClose,
} from '@/components/ui/responsive-modal'
import { Label } from '@/components/ui/label'
import { AuthorshipBadge } from '@/components/shared/AuthorshipBadge'

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
  created_by?: string | null
  professional_feedback?: string | null
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

  const [isBuilderOpen, setIsBuilderOpen] = useState(false)

  // State for the responsive modal
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null)
  const [executionData, setExecutionData] = useState<
    Record<string, { load: string; reps: string }>
  >({})

  // Execution Mode State
  const [isExecutionMode, setIsExecutionMode] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isSetActive, setIsSetActive] = useState(false)

  const loadData = async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      const plans = await getClientActivePlans(user.id)

      if (plans && plans.length > 0) {
        setAllPlans(plans as PlanListType[])
        const fullDetails = await getFullPlanDetails(plans[0].id)
        setActivePlan(fullDetails as unknown as FullPlanDetailsType)
      } else {
        setAllPlans([])
        setActivePlan(null)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user?.id])

  const toggleComplete = (id: string) => setCompleted((p) => ({ ...p, [id]: !p[id] }))

  if (isExecutionMode && activePlan) {
    const exercise = activePlan.items[currentExerciseIndex]
    const isLastSet = currentSet === exercise.sets
    const isLastExercise = currentExerciseIndex === activePlan.items.length - 1

    const handleAction = () => {
      if (!isSetActive) {
        setIsSetActive(true)
      } else {
        setIsSetActive(false)
        if (isLastSet) {
          if (isLastExercise) {
            setIsExecutionMode(false)
            // mark all as completed
            const allIds = activePlan.items.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
            setCompleted(allIds)
          } else {
            setCurrentExerciseIndex((i) => i + 1)
            setCurrentSet(1)
          }
        } else {
          setCurrentSet((s) => s + 1)
        }
      }
    }

    return (
      <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex flex-col">
            <span className="text-gray-400 text-lg uppercase tracking-wider font-bold mb-1">
              Exercício {currentExerciseIndex + 1} de {activePlan.items.length}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight line-clamp-2">
              {exercise.exercise?.name || 'Exercício'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-12 w-12 shrink-0 ml-4"
            onClick={() => setIsExecutionMode(false)}
          >
            <Activity className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            <div className="flex flex-col items-center justify-center bg-gray-900 rounded-3xl p-6 border border-gray-800">
              <span className="text-gray-400 text-xl sm:text-2xl font-medium mb-2 uppercase tracking-widest">
                Série
              </span>
              <div className="text-6xl sm:text-8xl font-black text-emerald-400 whitespace-nowrap">
                {currentSet}
                <span className="text-3xl sm:text-5xl text-gray-600">/{exercise.sets}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-900 rounded-3xl p-6 border border-gray-800">
              <span className="text-gray-400 text-xl sm:text-2xl font-medium mb-2 uppercase tracking-widest">
                Reps
              </span>
              <div className="text-6xl sm:text-8xl font-black text-blue-400">{exercise.reps}</div>
            </div>
          </div>

          {(exercise.target_load_kg || exercise.rest_seconds) && (
            <div className="flex gap-4 w-full max-w-lg">
              {exercise.target_load_kg && (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/50 rounded-2xl p-4 border border-gray-800/50">
                  <span className="text-gray-500 text-base sm:text-lg font-medium mb-1 uppercase tracking-wider">
                    Carga
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    {exercise.target_load_kg}
                    <span className="text-xl sm:text-2xl text-gray-500 ml-1">kg</span>
                  </span>
                </div>
              )}
              {exercise.rest_seconds && (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/50 rounded-2xl p-4 border border-gray-800/50">
                  <span className="text-gray-500 text-base sm:text-lg font-medium mb-1 uppercase tracking-wider">
                    Descanso
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    {exercise.rest_seconds}
                    <span className="text-xl sm:text-2xl text-gray-500 ml-1">s</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-black border-t border-gray-900 pb-8 sm:pb-6 shrink-0">
          <Button
            className={cn(
              'w-full h-24 text-2xl sm:text-3xl font-black rounded-2xl transition-all duration-300 uppercase tracking-wide',
              !isSetActive
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]'
                : isLastSet && isLastExercise
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]',
            )}
            onClick={handleAction}
          >
            {!isSetActive
              ? `Iniciar Série ${currentSet}`
              : isLastSet && isLastExercise
                ? 'Concluir Treino'
                : isLastSet
                  ? 'Próximo Exercício'
                  : 'Concluir Série'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full pb-20 md:pb-0">
      <DashboardHeader title="Os Meus Treinos">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex bg-muted">
            Área de Exercício
          </Badge>
          <Button onClick={() => setIsBuilderOpen(true)} size="sm" className="hidden sm:flex">
            <Plus className="w-4 h-4 mr-2" /> Montar Meu Treino
          </Button>
        </div>
      </DashboardHeader>

      <PageContent className="max-w-3xl mx-auto w-full animate-fade-in-up px-4 py-4 md:p-6">
        <div className="mb-6 sm:hidden">
          <Button
            onClick={() => setIsBuilderOpen(true)}
            className="w-full h-12 text-md font-medium"
          >
            <Plus className="w-5 h-5 mr-2" /> Montar Meu Treino
          </Button>
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
                {activePlan.professional_feedback && (
                  <Alert className="mb-6 bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900">
                    <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
                      <span className="font-semibold mr-1">Dica do seu profissional:</span>
                      {activePlan.professional_feedback}
                    </AlertDescription>
                  </Alert>
                )}

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
                    <div className="flex items-center gap-1.5 opacity-80 text-sm mt-1 mb-2">
                      <Timer className="w-4 h-4" />
                      <span>
                        {activePlan.plan_type === 'workout'
                          ? 'Treino'
                          : 'Protocolo de Reabilitação'}
                      </span>
                    </div>
                    {activePlan.created_by && (
                      <AuthorshipBadge
                        createdBy={activePlan.created_by}
                        patientId={activePlan.client_id}
                      />
                    )}
                  </div>
                  {activePlan.plan_type === 'workout' ? (
                    <Dumbbell className="w-10 h-10 opacity-30" />
                  ) : (
                    <HeartPulse className="w-10 h-10 opacity-30" />
                  )}
                </div>

                {activePlan.plan_type === 'workout' && activePlan.items?.length > 0 && (
                  <Button
                    className="w-full h-16 text-xl font-bold bg-primary text-primary-foreground mb-6 rounded-xl shadow-lg"
                    onClick={() => {
                      setCurrentExerciseIndex(0)
                      setCurrentSet(1)
                      setIsSetActive(false)
                      setIsExecutionMode(true)
                    }}
                  >
                    <Activity className="w-6 h-6 mr-3" /> Modo Execução
                  </Button>
                )}

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

                          <div className="flex gap-2 pt-3 border-t border-dashed mt-3">
                            <ResponsiveModal>
                              <ResponsiveModalTrigger asChild>
                                <Button
                                  variant="secondary"
                                  className="w-full h-12 text-sm sm:h-10 font-medium"
                                  disabled={isCompleted}
                                >
                                  <Edit2 className="w-4 h-4 mr-2" />
                                  Registrar Carga/Reps
                                </Button>
                              </ResponsiveModalTrigger>
                              <ResponsiveModalContent className="sm:max-w-[425px]">
                                <ResponsiveModalHeader>
                                  <ResponsiveModalTitle>Registrar Desempenho</ResponsiveModalTitle>
                                  <ResponsiveModalDescription>
                                    {item.exercise?.name}
                                  </ResponsiveModalDescription>
                                </ResponsiveModalHeader>
                                <div className="grid grid-cols-2 gap-4 py-4 px-4 sm:px-0">
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor={`load-${item.id}`}
                                      className="text-base sm:text-sm"
                                    >
                                      Carga Real (kg)
                                    </Label>
                                    <Input
                                      id={`load-${item.id}`}
                                      type="number"
                                      placeholder="Ex: 20"
                                      className="h-12 sm:h-10 text-base sm:text-sm"
                                      value={executionData[item.id]?.load || ''}
                                      onChange={(e) =>
                                        setExecutionData((prev) => ({
                                          ...prev,
                                          [item.id]: { ...prev[item.id], load: e.target.value },
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor={`reps-${item.id}`}
                                      className="text-base sm:text-sm"
                                    >
                                      Repetições
                                    </Label>
                                    <Input
                                      id={`reps-${item.id}`}
                                      type="number"
                                      placeholder="Ex: 12"
                                      className="h-12 sm:h-10 text-base sm:text-sm"
                                      value={executionData[item.id]?.reps || ''}
                                      onChange={(e) =>
                                        setExecutionData((prev) => ({
                                          ...prev,
                                          [item.id]: { ...prev[item.id], reps: e.target.value },
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                                <ResponsiveModalFooter className="px-4 sm:px-0 pb-4 sm:pb-0">
                                  <ResponsiveModalClose asChild>
                                    <Button
                                      type="button"
                                      className="h-12 sm:h-10 w-full sm:w-auto"
                                      onClick={() =>
                                        setCompleted((p) => ({ ...p, [item.id]: true }))
                                      }
                                    >
                                      Salvar e Concluir
                                    </Button>
                                  </ResponsiveModalClose>
                                </ResponsiveModalFooter>
                              </ResponsiveModalContent>
                            </ResponsiveModal>
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
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={cn(
                              'text-xs font-medium',
                              plan.plan_type === 'rehabilitation' &&
                                'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
                            )}
                          >
                            {plan.plan_type === 'workout' ? 'Treino' : 'Reabilitação'}
                          </Badge>
                          {plan.created_by && (
                            <AuthorshipBadge
                              createdBy={plan.created_by}
                              patientId={plan.client_id}
                              className="text-[10px] px-1.5 py-0"
                            />
                          )}
                        </div>
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

      {user && (
        <TrainingBuilderModal
          isOpen={isBuilderOpen}
          onClose={() => setIsBuilderOpen(false)}
          clientId={user.id}
          onSuccess={loadData}
        />
      )}
    </div>
  )
}
