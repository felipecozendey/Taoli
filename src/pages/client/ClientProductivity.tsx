import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useToast } from '@/hooks/use-toast'
import { Inbox, Sun, Trash2, ChevronDown, CheckCircle2 } from 'lucide-react'
import { getTasks, createTask, updateTask, deleteTask } from '@/services/productivity'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function ClientProductivity() {
  const { toast } = useToast()

  const [tasks, setTasks] = useState<any[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isCompletedOpen, setIsCompletedOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
      }
    })
  }, [])

  const loadTasks = async () => {
    if (!userId) return
    try {
      const data = await getTasks(userId)
      setTasks(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const handleCreateTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!newTaskTitle.trim() || !userId) return

    try {
      await createTask(userId, newTaskTitle, null)
      setNewTaskTitle('')
      loadTasks()
      toast({ title: 'Tarefa capturada na Caixa de Entrada!' })
    } catch (error) {
      toast({ title: 'Erro ao criar tarefa', variant: 'destructive' })
    }
  }

  const handleMoveToToday = async (taskId: string) => {
    try {
      await updateTask(taskId, { target_date: today })
      loadTasks()
    } catch (error) {
      toast({ title: 'Erro ao mover tarefa', variant: 'destructive' })
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    try {
      await updateTask(taskId, { status: 'completed' })
      loadTasks()
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
      loadTasks()
    } catch (error) {
      toast({ title: 'Erro ao deletar tarefa', variant: 'destructive' })
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
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
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-opacity"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
      </PageContent>
    </div>
  )
}
