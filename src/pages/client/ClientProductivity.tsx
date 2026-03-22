import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, Plus, Flame, Calendar, Loader2 } from 'lucide-react'
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

  const loadData = async (silent = false) => {
    if (!silent) setIsLoading(true)
    try {
      const [habitsRes, tasksRes, logsRes] = await Promise.all([
        productivityService.getHabits(),
        productivityService.getTasks(currentDate, currentDate),
        productivityService.getHabitLogs(currentDate, currentDate),
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

  const totalItems = habits.length + tasks.length
  const completedItems = habitLogs.length + tasks.filter((t) => t.status === 'done').length
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
    const isCompleted = habitLogs.some((log) => log.habit_id === habitId)

    // Atualização Otimista
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
      setHabitLogs(habitLogs.filter((log) => log.habit_id !== habitId))
    }

    await productivityService.toggleHabitLog(habitId, currentDate)
    loadData(true) // Recarrega silenciosamente
  }

  const handleToggleTask = async (task: ProductivityTask) => {
    const isDone = task.status === 'done'
    const newStatus = isDone ? 'todo' : 'done'

    // Atualização Otimista
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)))
    if (newStatus === 'done') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }

    await productivityService.updateTask(task.id, { status: newStatus })
    loadData(true) // Recarrega silenciosamente
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
      <PageContent className="max-w-3xl mx-auto w-full">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">O Meu Dia</h2>
            <p className="text-muted-foreground capitalize">{displayDate}</p>
          </div>
        </div>

        {/* Barra de Progresso */}
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

        {/* Hábitos */}
        {habits.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Hábitos</h3>
            </div>
            <div className="flex flex-col gap-3">
              {habits.map((habit) => {
                const isCompleted = habitLogs.some((log) => log.habit_id === habit.id)
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

        {/* Tarefas */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 px-1">Tarefas</h3>
          <div className="flex flex-col gap-2">
            {tasks.length > 0 ? (
              tasks.map((task) => {
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

            {/* Input Rápido */}
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
                className="shrink-0 text-primary hover:text-primary hover:bg-primary/10 h-10 w-10 rounded-lg"
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
      </PageContent>
    </div>
  )
}
