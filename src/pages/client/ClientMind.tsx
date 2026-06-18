import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Frown, Meh, Smile, Laugh, Plus, Heart, Lightbulb } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getHabits, createHabit, toggleHabitLog } from '@/services/productivity'
import { AuthorshipBadge } from '@/components/shared/AuthorshipBadge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const ProfCard = ({ n, r, img, fb }: { n: string; r: string; img?: string; fb: string }) => (
  <Card className="mb-6 bg-muted/40 border-dashed shadow-sm">
    <CardContent className="p-4 flex items-center gap-4">
      <Avatar className="h-12 w-12 border">
        <AvatarImage src={img} />
        <AvatarFallback>{fb}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">{n}</p>
        <p className="text-xs text-muted-foreground">{r}</p>
      </div>
    </CardContent>
  </Card>
)

export default function ClientMind() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [habits, setHabits] = useState<any[]>([])
  const [newHabitTitle, setNewHabitTitle] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const fetchPatientHabits = async () => {
    if (!user) return
    try {
      const data = await getHabits(user.id)
      setHabits(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchPatientHabits()
  }, [user])

  const handleToggle = async (habitId: string, isCompleted: boolean) => {
    const today = new Date().toISOString().split('T')[0]
    try {
      // Optimistic update
      setHabits(
        habits.map((h) => {
          if (h.id === habitId) {
            const logs = h.habit_logs || []
            if (isCompleted) {
              return { ...h, habit_logs: [...logs, { completed_date: today }] }
            } else {
              return { ...h, habit_logs: logs.filter((l: any) => l.completed_date !== today) }
            }
          }
          return h
        }),
      )
      await toggleHabitLog(habitId, today, isCompleted)
    } catch (e) {
      fetchPatientHabits()
      toast({ title: 'Erro ao atualizar hábito', variant: 'destructive' })
    }
  }

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newHabitTitle.trim()) return
    try {
      await createHabit(user.id, newHabitTitle)
      setNewHabitTitle('')
      setIsAddOpen(false)
      fetchPatientHabits()
      toast({ title: 'Hábito criado com sucesso!' })
    } catch (e) {
      toast({ title: 'Erro ao criar hábito', variant: 'destructive' })
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Saúde Mental" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <ProfCard
          n="Dr. Roberto"
          r="Psicólogo"
          img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5"
          fb="RO"
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base text-center">
              Como você está se sentindo hoje?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-2 sm:gap-6">
            <Button
              variant="ghost"
              className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-blue-50 hover:text-blue-600"
            >
              <Frown className="h-10 w-10 text-blue-400" />
              <span className="text-xs font-medium">Triste</span>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-slate-100 hover:text-slate-700"
            >
              <Meh className="h-10 w-10 text-slate-400" />
              <span className="text-xs font-medium">Neutro</span>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-green-50 hover:text-green-600"
            >
              <Smile className="h-10 w-10 text-green-400" />
              <span className="text-xs font-medium">Feliz</span>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-yellow-50 hover:text-yellow-600"
            >
              <Laugh className="h-10 w-10 text-yellow-500" />
              <span className="text-xs font-medium">Excelente</span>
            </Button>
          </CardContent>
        </Card>

        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="font-semibold text-lg">Meus Hábitos de Bem-estar</h3>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Novo Hábito
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Hábito</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddHabit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Nome do Hábito</Label>
                    <Input
                      placeholder="Ex: Meditar por 10 minutos"
                      value={newHabitTitle}
                      onChange={(e) => setNewHabitTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={!newHabitTitle.trim()}>
                      Criar Hábito
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              {habits.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum hábito cadastrado. Comece adicionando um novo hábito!
                </div>
              ) : (
                habits.map((habit, index) => {
                  const isCompleted = habit.habit_logs?.some((l: any) => l.completed_date === today)
                  const isLast = index === habits.length - 1

                  return (
                    <div
                      key={habit.id}
                      className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center p-4 hover:bg-muted/50 transition-colors gap-y-2 ${!isLast ? 'border-b' : ''}`}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Checkbox
                          id={habit.id}
                          checked={isCompleted}
                          onCheckedChange={(checked) => handleToggle(habit.id, !!checked)}
                          className="h-5 w-5 shrink-0"
                        />
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <Label
                            htmlFor={habit.id}
                            className="cursor-pointer text-sm font-medium flex flex-wrap items-center gap-2"
                          >
                            {habit.title}
                            {habit.is_approved && (
                              <span
                                className="flex items-center text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-rose-100"
                                title="Apoiado pelo Profissional"
                              >
                                <Heart className="w-3 h-3 mr-1 fill-current" />
                                Apoiado
                              </span>
                            )}
                          </Label>
                          <AuthorshipBadge createdBy={habit.created_by} patientId={user?.id} />
                        </div>
                      </div>

                      {habit.professional_feedback && (
                        <Alert className="mt-3 bg-purple-50/50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900 py-2.5 sm:col-span-2 w-full">
                          <Lightbulb className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <AlertDescription className="text-purple-800 dark:text-purple-200 text-xs ml-2">
                            <span className="font-semibold mr-1">Dica do seu profissional:</span>
                            {habit.professional_feedback}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
