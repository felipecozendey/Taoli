import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  Inbox,
  Sun,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Flame,
  Plus,
  Play,
  Square,
  Pause,
  Timer,
} from 'lucide-react'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getHabits,
  createHabit,
  toggleHabitLog,
  deleteHabit,
} from '@/services/productivity'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const calculateStreak = (logs: any[]) => {
  if (!logs || logs.length === 0) return 0
  const dates = new Set(logs.map((l: any) => l.completed_date))

  const today = new Date()
  const offset = today.getTimezoneOffset() * 60000
  const localDate = new Date(today.getTime() - offset)
  const todayStr = localDate.toISOString().split('T')[0]

  const yesterday = new Date(localDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let streak = 0
  let checkDate = new Date(localDate)

  if (dates.has(todayStr)) {
    // Start counting from today
  } else if (dates.has(yesterdayStr)) {
    // Start counting from yesterday
    checkDate.setDate(checkDate.getDate() - 1)
  } else {
    return 0
  }

  while (true) {
    const checkStr = checkDate.toISOString().split('T')[0]
    if (dates.has(checkStr)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export default function ClientProductivity() {
  const { toast } = useToast()

  const [tasks, setTasks] = useState<any[]>([])
  const [habits, setHabits] = useState<any[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newHabitTitle, setNewHabitTitle] = useState('')
  const [isCompletedOpen, setIsCompletedOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [activeFocusTask, setActiveFocusTask] = useState<any | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(1500)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    let interval: any = null
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false)
      toast({ title: 'Pomodoro Concluído!', description: 'Sessão de foco finalizada com sucesso.' })
      const audio = new Audio('/notification.mp3') // Optional sound
      audio.play().catch(() => {})
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timeLeft, toast])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
      }
    })
  }, [])

  const loadData = async () => {
    if (!userId) return
    try {
      const [tasksData, habitsData] = await Promise.all([getTasks(userId), getHabits(userId)])
      setTasks(tasksData)
      setHabits(habitsData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  // --- Tasks Handlers ---
  const handleCreateTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!newTaskTitle.trim() || !userId) return

    try {
      await createTask(userId, newTaskTitle, null)
      setNewTaskTitle('')
      loadData()
      toast({ title: 'Tarefa capturada na Caixa de Entrada!' })
    } catch (error) {
      toast({ title: 'Erro ao criar tarefa', variant: 'destructive' })
    }
  }

  const handleMoveToToday = async (taskId: string) => {
    try {
      await updateTask(taskId, { target_date: today })
      loadData()
    } catch (error) {
      toast({ title: 'Erro ao mover tarefa', variant: 'destructive' })
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    try {
      await updateTask(taskId, { status: 'completed' })
      loadData()
      toast({
        title: 'Tarefa Concluída! 🎉',
        description: 'Excelente trabalho, continue assim!',
      })
    } catch (error) {
      toast({ title: 'Erro ao concluir tarefa', variant: 'destructive' })
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId)
      loadData()
    } catch (error) {
      toast({ title: 'Erro ao deletar tarefa', variant: 'destructive' })
    }
  }

  // --- Habits Handlers ---
  const handleCreateHabit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!newHabitTitle.trim() || !userId) return

    try {
      await createHabit(userId, newHabitTitle)
      setNewHabitTitle('')
      loadData()
      toast({ title: 'Hábito criado com sucesso!' })
    } catch (error) {
      toast({ title: 'Erro ao criar hábito', variant: 'destructive' })
    }
  }

  const handleToggleHabit = async (habitId: string, isCompleted: boolean) => {
    try {
      await toggleHabitLog(habitId, today, isCompleted)
      loadData()
    } catch (error) {
      toast({ title: 'Erro ao atualizar hábito', variant: 'destructive' })
    }
  }

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId)
      loadData()
    } catch (error) {
      toast({ title: 'Erro ao deletar hábito', variant: 'destructive' })
    }
  }

  const inboxTasks = tasks.filter((t) => t.target_date === null && t.status === 'pending')
  const todayTasks = tasks.filter((t) => t.target_date === today && t.status === 'pending')
  const completedTasks = tasks.filter((t) => t.status === 'completed' && t.target_date === today)

  return (
    <div className="flex flex-col min-h-full pb-20">
      <DashboardHeader title="Produtividade" />
      <PageContent className="max-w-6xl mx-auto w-full">
        <div className="mb-6 px-1">
          <h2 className="text-2xl font-bold tracking-tight">Produtividade</h2>
          <p className="text-muted-foreground mt-1">
            Capture ideias e organize o seu dia com foco e clareza.
          </p>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="habits">Hábitos</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inbox Column */}
              <Card className="flex flex-col h-[600px] shadow-sm">
                <CardHeader className="pb-4 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Inbox className="h-5 w-5 text-primary" />
                    Caixa de Entrada
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
                  <form onSubmit={handleCreateTask} className="flex gap-2">
                    <Input
                      placeholder="Nova tarefa..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newTaskTitle.trim()}>
                      Adicionar
                    </Button>
                  </form>

                  <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="space-y-2 pb-4">
                      {inboxTasks.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          A caixa de entrada está vazia.
                        </p>
                      ) : (
                        inboxTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg group hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-sm font-medium">{task.title}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="secondary"
                                title="Fazer Hoje"
                                onClick={() => handleMoveToToday(task.id)}
                              >
                                <Sun className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Today Column */}
              <Card className="flex flex-col h-[600px] shadow-sm">
                <CardHeader className="pb-4 border-b bg-primary/5">
                  <CardTitle className="flex items-center gap-2 text-lg text-primary">
                    <Sun className="h-5 w-5" />O Meu Dia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
                  <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="space-y-4 pb-4">
                      <div className="space-y-2">
                        {todayTasks.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg border-primary/20">
                            Nenhuma tarefa planeada para hoje.
                          </p>
                        ) : (
                          todayTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start gap-3 p-3 bg-background border rounded-lg shadow-sm group hover:border-primary/30 transition-colors"
                            >
                              <Checkbox
                                id={`task-${task.id}`}
                                className="mt-0.5 h-5 w-5 rounded-md data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                onCheckedChange={() => handleCompleteTask(task.id)}
                              />
                              <label
                                htmlFor={`task-${task.id}`}
                                className="text-sm font-medium cursor-pointer flex-1 pt-0.5 transition-all hover:text-primary"
                              >
                                {task.title}
                              </label>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  title="Focar (Pomodoro)"
                                  className="h-8 w-8 text-primary hover:bg-primary/10"
                                  onClick={() => {
                                    setActiveFocusTask(task)
                                    setTimeLeft(1500)
                                    setIsTimerRunning(true)
                                  }}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {completedTasks.length > 0 && (
                        <Collapsible
                          open={isCompletedOpen}
                          onOpenChange={setIsCompletedOpen}
                          className="mt-6"
                        >
                          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full p-2 rounded-lg hover:bg-secondary/50">
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform',
                                isCompletedOpen && 'rotate-180',
                              )}
                            />
                            Concluídas Hoje ({completedTasks.length})
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2 mt-2 pl-2">
                            {completedTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex items-center justify-between p-2 opacity-60 hover:opacity-100 transition-opacity group"
                              >
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  <span className="text-sm line-through">{task.title}</span>
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="habits" className="mt-0 space-y-6">
            <Card>
              <CardContent className="p-4">
                <form onSubmit={handleCreateHabit} className="flex gap-2">
                  <Input
                    placeholder="Adicionar Novo Hábito..."
                    value={newHabitTitle}
                    onChange={(e) => setNewHabitTitle(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newHabitTitle.trim()}>
                    <Plus className="w-4 h-4 mr-2" /> Adicionar
                  </Button>
                </form>
              </CardContent>
            </Card>

            {habits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum hábito rastreado. Comece criando um novo hábito acima!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map((habit) => {
                  const streak = calculateStreak(habit.habit_logs)
                  const isDoneToday = habit.habit_logs?.some((l: any) => l.completed_date === today)

                  return (
                    <Card
                      key={habit.id}
                      className="relative group overflow-hidden border-border/50 hover:border-border transition-colors"
                    >
                      <CardContent className="p-5 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{habit.title}</h3>
                            {habit.professional_id && (
                              <Badge variant="secondary" className="mt-1">
                                👨‍⚕️ Prescrito
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity h-8 w-8 -mt-2 -mr-2"
                            onClick={() => handleDeleteHabit(habit.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-center py-4">
                          <div className="flex items-center text-orange-500 font-bold text-4xl">
                            <Flame className="w-8 h-8 mr-2 fill-orange-500" />
                            {streak}{' '}
                            <span className="text-xl ml-2 text-muted-foreground font-medium">
                              Dias
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full font-medium"
                          variant={isDoneToday ? 'default' : 'secondary'}
                          onClick={() => handleToggleHabit(habit.id, !isDoneToday)}
                          style={isDoneToday ? { backgroundColor: '#22c55e', color: 'white' } : {}}
                        >
                          {isDoneToday ? 'Feito Hoje! ✅' : 'Fazer Check-in'}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PageContent>

      {/* Focus Mode Bottom Bar */}
      {activeFocusTask && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up md:px-8">
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Timer className="h-5 w-5 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Em Foco
              </p>
              <p className="font-semibold truncate text-sm md:text-base">{activeFocusTask.title}</p>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <span className="text-5xl md:text-6xl font-mono tabular-nums font-bold text-primary tracking-tight">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 w-full md:w-1/3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? (
                <Pause className="h-5 w-5 text-primary" />
              ) : (
                <Play className="h-5 w-5 text-primary" />
              )}
            </Button>
            <Button
              variant="default"
              className="h-10 rounded-full px-6 shadow-md shadow-primary/20"
              onClick={async () => {
                await handleCompleteTask(activeFocusTask.id)
                setActiveFocusTask(null)
                setIsTimerRunning(false)
              }}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" /> Concluir
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                setActiveFocusTask(null)
                setIsTimerRunning(false)
              }}
            >
              <Square className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
