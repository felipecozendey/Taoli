import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Calendar,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Briefcase,
} from 'lucide-react'
import {
  productivityService,
  ProductivityTask,
  ProductivityHabit,
  ProductivityHabitLog,
} from '@/services/productivity'
import { cn } from '@/lib/utils'

export default function ClientProductivity() {
  const getTodayStr = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const [currentDate] = useState(getTodayStr)
  const [tasks, setTasks] = useState<ProductivityTask[]>([])
  const [habits, setHabits] = useState<ProductivityHabit[]>([])
  const [habitLogs, setHabitLogs] = useState<ProductivityHabitLog[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Pomodoro State
  const WORK_TIME = 25 * 60
  const BREAK_TIME = 5 * 60
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work')
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const loadData = async (silent = false) => {
    if (!silent) setIsLoading(true)
    try {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 14)
      const pastDateStr = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`

      const [habitsRes, tasksRes, logsRes] = await Promise.all([
        productivityService.getHabits(),
        productivityService.getTasks(), // Fetch all tasks for Kanban
        productivityService.getHabitLogs(pastDateStr, currentDate), // Fetch last 14 days
      ])

      if (habitsRes.data) setHabits(habitsRes.data)
      if (tasksRes.data) setTasks(tasksRes.data)
      if (logsRes.data) setHabitLogs(logsRes.data)
    } catch (error) {
      console.error(error)
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (isTimerRunning && timeLeft === 0) {
      try {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play()
      } catch (e) {
        // Ignore audio errors
      }
      const newMode = timerMode === 'work' ? 'break' : 'work'
      setTimerMode(newMode)
      setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME)
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft, timerMode])

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning)

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeLeft(timerMode === 'work' ? WORK_TIME : BREAK_TIME)
  }

  const switchTimerMode = (mode: 'work' | 'break') => {
    setTimerMode(mode)
    setIsTimerRunning(false)
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME)
  }

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  // Daily calculations
  const todaysTasks = tasks.filter((t) => t.due_date === currentDate || !t.due_date)
  const todaysHabitLogs = habitLogs.filter((l) => l.completed_date === currentDate)
  const totalItems = habits.length + todaysTasks.length
  const completedItems =
    todaysHabitLogs.length + todaysTasks.filter((t) => t.status === 'done').length
  const progressPercentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100)

  let motivationText = 'Vamos começar!'
  if (progressPercentage === 100) motivationText = 'Dia perfeito!'
  else if (progressPercentage >= 50) motivationText = 'Metade do caminho!'
  else if (progressPercentage > 0) motivationText = 'Em progresso...'

  const displayDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(currentDate + 'T12:00:00'))

  const handleToggleHabit = async (habitId: string) => {
    const isCompleted = todaysHabitLogs.some((log) => log.habit_id === habitId)

    if (!isCompleted) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      setHabitLogs([
        ...habitLogs,
        {
          id: 'temp',
          habit_id: habitId,
          completed_date: currentDate,
          created_at: new Date().toISOString(),
        },
      ])
    } else {
      setHabitLogs(
        habitLogs.filter(
          (log) => !(log.habit_id === habitId && log.completed_date === currentDate),
        ),
      )
    }

    await productivityService.toggleHabitLog(habitId, currentDate)
    loadData(true)
  }

  const handleToggleTask = async (task: ProductivityTask) => {
    const isDone = task.status === 'done'
    const newStatus = isDone ? 'todo' : 'done'

    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)))
    if (newStatus === 'done') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }

    await productivityService.updateTask(task.id, { status: newStatus })
    loadData(true)
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const tempTitle = newTaskTitle
    setNewTaskTitle('')
    setIsLoading(true)

    await productivityService.createTask({
      title: tempTitle,
      due_date: currentDate,
      status: 'todo',
      priority: 'medium',
    })

    loadData()
  }

  const handleDragStartTask = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId)
  }

  const handleDropTask = async (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: 'todo' | 'in_progress' | 'done',
  ) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')

    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.status === newStatus) return

    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
    if (newStatus === 'done') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }

    await productivityService.updateTask(taskId, { status: newStatus })
    loadData(true)
  }

  const renderKanbanColumn = (status: 'todo' | 'in_progress' | 'done', title: string) => {
    const columnTasks = tasks.filter((t) => t.status === status)

    return (
      <div
        className="bg-muted/30 p-4 rounded-xl border min-h-[500px] flex flex-col gap-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropTask(e, status)}
      >
        <h3 className="font-semibold text-lg mb-2">
          {title}{' '}
          <span className="text-muted-foreground text-sm font-normal ml-2">
            ({columnTasks.length})
          </span>
        </h3>

        {columnTasks.map((task) => (
          <Card
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStartTask(e, task.id)}
            className="p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">{task.title}</span>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    task.priority === 'high'
                      ? 'destructive'
                      : task.priority === 'medium'
                        ? 'default'
                        : 'secondary'
                  }
                  className={cn(
                    task.priority === 'medium' && 'bg-yellow-500 hover:bg-yellow-600 text-white',
                  )}
                >
                  {task.priority === 'high'
                    ? 'Alta'
                    : task.priority === 'medium'
                      ? 'Média'
                      : 'Baixa'}
                </Badge>
                {task.due_date && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(task.due_date + 'T12:00:00').toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // Generate last 14 days array for Heatmap
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - 13 + i)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })

  if (isLoading && tasks.length === 0 && habits.length === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader title="Produtividade" />
        <PageContent className="flex items-center justify-center flex-1">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </PageContent>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full pb-20">
      <DashboardHeader title="Produtividade" />
      <PageContent className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Produtividade</h2>
            <p className="text-muted-foreground capitalize">{displayDate}</p>
          </div>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mb-6">
            <TabsTrigger value="daily">O Meu Dia</TabsTrigger>
            <TabsTrigger value="kanban">Planeamento</TabsTrigger>
            <TabsTrigger value="analytics">Estatísticas & Foco</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="max-w-3xl mt-0">
            <Card className="mb-8 border-none bg-primary/5 shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Progresso Diário</p>
                    <h3 className="text-3xl font-bold">{progressPercentage}%</h3>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{motivationText}</p>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-primary/20" />
              </CardContent>
            </Card>

            {habits.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Hábitos</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {habits.map((habit) => {
                    const isCompleted = todaysHabitLogs.some((log) => log.habit_id === habit.id)
                    return (
                      <button
                        key={habit.id}
                        onClick={() => handleToggleHabit(habit.id)}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-2xl border transition-all text-left active:scale-[0.98]',
                          isCompleted
                            ? 'bg-primary/10 border-transparent shadow-inner'
                            : 'bg-card hover:bg-secondary/40 shadow-sm',
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 transition-transform" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground/40 shrink-0" />
                        )}
                        <span
                          className={cn(
                            'font-medium text-base transition-colors',
                            isCompleted && 'text-muted-foreground',
                          )}
                        >
                          {habit.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 px-1">Tarefas de Hoje</h3>
              <div className="flex flex-col gap-2">
                {todaysTasks.length > 0 ? (
                  todaysTasks.map((task) => {
                    const isDone = task.status === 'done'
                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                      >
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={isDone}
                          onCheckedChange={() => handleToggleTask(task)}
                          className="h-5 w-5 rounded-md"
                        />
                        <label
                          htmlFor={`task-${task.id}`}
                          className={cn(
                            'text-base transition-all duration-300 cursor-pointer flex-1',
                            isDone && 'line-through text-muted-foreground opacity-70',
                          )}
                        >
                          {task.title}
                        </label>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Nenhuma tarefa pendente para hoje.
                  </p>
                )}

                <form
                  onSubmit={handleAddTask}
                  className="flex items-center gap-2 mt-4 p-1.5 rounded-xl border bg-background focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-sm"
                >
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Adicionar nova tarefa para hoje..."
                    className="border-0 shadow-none focus-visible:ring-0 bg-transparent h-10 text-base"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="shrink-0 text-primary hover:bg-primary/10 h-10 w-10 rounded-lg"
                    disabled={!newTaskTitle.trim() || isLoading}
                  >
                    {isLoading && newTaskTitle.trim() ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="kanban" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {renderKanbanColumn('todo', 'Para Fazer')}
              {renderKanbanColumn('in_progress', 'Em Progresso')}
              {renderKanbanColumn('done', 'Concluído')}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-0">
            {/* Pomodoro Timer */}
            <Card className="p-8 flex flex-col items-center justify-center max-w-2xl mx-auto shadow-sm">
              <div className="flex bg-muted p-1 rounded-full mb-8">
                <button
                  onClick={() => switchTimerMode('work')}
                  className={cn(
                    'px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 text-sm',
                    timerMode === 'work'
                      ? 'bg-background shadow-sm text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Briefcase className="h-4 w-4" /> Trabalho - 25m
                </button>
                <button
                  onClick={() => switchTimerMode('break')}
                  className={cn(
                    'px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 text-sm',
                    timerMode === 'break'
                      ? 'bg-background shadow-sm text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Coffee className="h-4 w-4" /> Pausa - 5m
                </button>
              </div>

              <div className="text-7xl md:text-8xl font-bold font-mono tracking-tighter mb-10 tabular-nums">
                {formatTime(timeLeft)}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="rounded-full w-40 h-14 text-base"
                  onClick={toggleTimer}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" /> Pausar
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5 fill-current" /> Iniciar
                    </>
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-14 w-14 border-2"
                  onClick={resetTimer}
                >
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </Card>

            {/* Habit Heatmap */}
            <Card className="p-6 max-w-4xl mx-auto shadow-sm">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Consistência dos Hábitos (Últimos 14 Dias)
              </h3>

              {habits.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum hábito cadastrado.
                </p>
              ) : (
                <div className="space-y-4">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <span className="font-medium text-sm sm:w-48 truncate" title={habit.title}>
                        {habit.title}
                      </span>
                      <div className="flex gap-1.5 flex-1 sm:justify-end overflow-x-auto pb-1 hide-scrollbar">
                        {last14Days.map((dateStr) => {
                          const isCompleted = habitLogs.some(
                            (log) => log.habit_id === habit.id && log.completed_date === dateStr,
                          )
                          const formattedDate = new Date(dateStr + 'T12:00:00').toLocaleDateString(
                            'pt-BR',
                            {
                              day: 'numeric',
                              month: 'short',
                            },
                          )

                          return (
                            <div
                              key={dateStr}
                              className={cn(
                                'w-6 h-6 md:w-7 md:h-7 rounded-md transition-colors shrink-0',
                                isCompleted ? 'bg-primary' : 'bg-muted/50 border border-border/50',
                              )}
                              title={`${formattedDate}: ${isCompleted ? 'Concluído' : 'Não concluído'}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
