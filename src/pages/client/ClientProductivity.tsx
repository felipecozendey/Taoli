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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useFocusGuardian } from '@/hooks/use-focus-guardian'
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
  Sparkles,
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
  const [isLoading, setIsLoading] = useState(true)

  // New Item Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [newItemType, setNewItemType] = useState<'task' | 'habit'>('task')
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newHabitTarget, setNewHabitTarget] = useState('1')
  const [newHabitUnit, setNewHabitUnit] = useState('vezes')

  // Focus Guardian Hook
  const { settings: focusSettings, toggleGuardian, updateInterval } = useFocusGuardian()

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
    habits.filter((h) => {
      const log = todaysHabitLogs.find((l) => l.habit_id === h.id)
      const isQuant = (h.target_value || 1) > 1
      return log ? (isQuant ? (log.progress_made || 0) >= (h.target_value || 1) : true) : false
    }).length + todaysTasks.filter((t) => t.status === 'done').length

  const progressPercentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100)

  let motivationText = 'Vamos começar!'
  if (progressPercentage === 100) motivationText = 'Dia perfeito!'
  else if (progressPercentage >= 50) motivationText = 'Metade do caminho!'
  else if (progressPercentage > 0) motivationText = 'Em progresso...'

  const displayDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(currentDate + 'T12:00:00'))

  const handleToggleHabit = async (habitId: string, amount?: number) => {
    if (amount) {
      confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } })

      // Optimistic update for amount
      setHabitLogs((logs) => {
        const existing = logs.find(
          (l) => l.habit_id === habitId && l.completed_date === currentDate,
        )
        if (existing) {
          return logs.map((l) =>
            l.id === existing.id ? { ...l, progress_made: (l.progress_made || 0) + amount } : l,
          )
        } else {
          return [
            ...logs,
            {
              id: 'temp-' + Date.now(),
              habit_id: habitId,
              completed_date: currentDate,
              progress_made: amount,
              created_at: new Date().toISOString(),
            },
          ]
        }
      })

      await productivityService.toggleHabitLog(habitId, currentDate, amount)
      loadData(true)
    } else {
      const isCompleted = todaysHabitLogs.some((log) => log.habit_id === habitId)

      if (!isCompleted) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
        setHabitLogs([
          ...habitLogs,
          {
            id: 'temp',
            habit_id: habitId,
            completed_date: currentDate,
            progress_made: 1,
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

  const handleCreateNew = async () => {
    if (!newItemTitle.trim()) return
    setIsLoading(true)

    if (newItemType === 'task') {
      await productivityService.createTask({
        title: newItemTitle,
        due_date: currentDate,
        status: 'todo',
        priority: 'medium',
      })
    } else {
      await productivityService.createHabit({
        title: newItemTitle,
        target_value: parseInt(newHabitTarget) || 1,
        target_unit: newHabitUnit || 'vezes',
        frequency: 'daily',
        color: 'blue',
      })
    }

    setNewItemTitle('')
    setNewHabitTarget('1')
    setNewHabitUnit('vezes')
    setIsNewModalOpen(false)
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
    <div className="flex flex-col min-h-full pb-20 relative">
      <DashboardHeader title="Produtividade" />

      {/* Floating Action Button for New Item */}
      <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg z-40 lg:bottom-10 lg:right-10"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Novo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ToggleGroup
              type="single"
              value={newItemType}
              onValueChange={(v) => v && setNewItemType(v as 'task' | 'habit')}
              className="justify-start"
            >
              <ToggleGroupItem value="task" className="flex-1">
                Tarefa
              </ToggleGroupItem>
              <ToggleGroupItem value="habit" className="flex-1">
                Hábito
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder={newItemType === 'task' ? 'Ex: Ler 10 páginas' : 'Ex: Beber água'}
              />
            </div>

            {newItemType === 'habit' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meta</Label>
                  <Input
                    type="number"
                    value={newHabitTarget}
                    onChange={(e) => setNewHabitTarget(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unidade</Label>
                  <Input
                    value={newHabitUnit}
                    onChange={(e) => setNewHabitUnit(e.target.value)}
                    placeholder="ex: ml, min, vezes"
                  />
                </div>
              </div>
            )}

            <Button
              className="w-full mt-2"
              onClick={handleCreateNew}
              disabled={!newItemTitle.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Criar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                    const log = todaysHabitLogs.find((l) => l.habit_id === habit.id)
                    const isQuantitative = (habit.target_value || 1) > 1
                    const progress = log?.progress_made || 0
                    const isCompleted = isQuantitative
                      ? progress >= (habit.target_value || 1)
                      : !!log

                    return (
                      <div
                        key={habit.id}
                        className={cn(
                          'flex items-center justify-between p-4 rounded-2xl border transition-all gap-4',
                          isCompleted
                            ? 'bg-primary/10 border-transparent shadow-inner'
                            : 'bg-card hover:bg-secondary/40 shadow-sm',
                        )}
                      >
                        <button
                          onClick={() => !isQuantitative && handleToggleHabit(habit.id)}
                          className="flex items-center gap-4 text-left active:scale-[0.98] flex-1"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 transition-transform" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground/40 shrink-0" />
                          )}
                          <div className="flex flex-col">
                            <span
                              className={cn(
                                'font-medium text-base transition-colors',
                                isCompleted && 'text-muted-foreground',
                              )}
                            >
                              {habit.title}
                            </span>
                            {isQuantitative && (
                              <span className="text-xs text-muted-foreground mt-0.5 font-medium">
                                {progress} / {habit.target_value} {habit.target_unit}
                              </span>
                            )}
                          </div>
                        </button>

                        {isQuantitative && !isCompleted && (
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-xs bg-secondary/50 hover:bg-secondary"
                              onClick={() => handleToggleHabit(habit.id, 1)}
                            >
                              +1
                            </Button>
                            {['minutos', 'min', 'm', 'paginas', 'páginas', 'ml'].includes(
                              habit.target_unit?.toLowerCase() || '',
                            ) && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 text-xs bg-secondary/50 hover:bg-secondary"
                                onClick={() => handleToggleHabit(habit.id, 5)}
                              >
                                +5
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="default"
                              className="h-8 px-2 text-xs"
                              onClick={() =>
                                handleToggleHabit(habit.id, habit.target_value! - progress)
                              }
                            >
                              Concluir
                            </Button>
                          </div>
                        )}
                      </div>
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
                  <p className="text-sm text-muted-foreground text-center py-6 bg-muted/20 rounded-xl border border-dashed">
                    Nenhuma tarefa pendente para hoje.
                  </p>
                )}

                <Button
                  variant="outline"
                  className="w-full mt-2 border-dashed border-2 bg-transparent text-muted-foreground hover:bg-secondary/50"
                  onClick={() => {
                    setNewItemType('task')
                    setIsNewModalOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Adicionar nova tarefa
                </Button>
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
            {/* Focus Guardian Settings */}
            <Card className="p-6 max-w-4xl mx-auto shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" /> Guardião de Foco
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receba notificações esporádicas para garantir que não se distraiu.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">A cada</span>
                    <select
                      className="bg-transparent border border-border/50 rounded-md text-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                      value={focusSettings?.reminder_interval || 15}
                      onChange={(e) => updateInterval(Number(e.target.value))}
                      disabled={!focusSettings?.is_enabled}
                    >
                      <option value={5}>5 min</option>
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={60}>60 min</option>
                    </select>
                  </div>
                  <div className="h-6 w-[1px] bg-border/50 mx-1"></div>
                  <Switch checked={!!focusSettings?.is_enabled} onCheckedChange={toggleGuardian} />
                </div>
              </div>
            </Card>

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
                          const log = habitLogs.find(
                            (l) => l.habit_id === habit.id && l.completed_date === dateStr,
                          )
                          const isQuantitative = (habit.target_value || 1) > 1
                          const isCompleted = log
                            ? isQuantitative
                              ? (log.progress_made || 0) >= (habit.target_value || 1)
                              : true
                            : false
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
