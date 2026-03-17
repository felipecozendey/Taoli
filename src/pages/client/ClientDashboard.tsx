import { useMemo, useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Apple, Dumbbell, Smile, BookOpen, CalendarDays } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const chartData = [
  { day: 'Seg', nutricao: 80, treino: 100, estudos: 60 },
  { day: 'Ter', nutricao: 90, treino: 0, estudos: 80 },
  { day: 'Qua', nutricao: 85, treino: 100, estudos: 90 },
  { day: 'Qui', nutricao: 70, treino: 100, estudos: 40 },
  { day: 'Sex', nutricao: 100, treino: 100, estudos: 100 },
  { day: 'Sáb', nutricao: 60, treino: 0, estudos: 20 },
  { day: 'Dom', nutricao: 50, treino: 0, estudos: 0 },
]

const chartConfig = {
  nutricao: { label: 'Nutrição', color: 'hsl(var(--chart-1))' },
  treino: { label: 'Treino', color: 'hsl(var(--chart-2))' },
  estudos: { label: 'Estudos', color: 'hsl(var(--chart-3))' },
}

export default function ClientDashboard() {
  const { user } = useAuth()
  const [mood, setMood] = useState<number | null>(null)

  const greetingInfo = useMemo(() => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
    const dateStr = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date())
    return { greeting, dateStr: dateStr.charAt(0).toUpperCase() + dateStr.slice(1) }
  }, [])

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title={`${greetingInfo.greeting}, ${user?.name?.split(' ')[0] || 'Visitante'} 👋`}
      />
      <PageContent className="max-w-6xl mx-auto w-full animate-fade-in-up">
        <div className="mb-6 flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span className="font-medium text-sm">{greetingInfo.dateStr}</span>
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-4">Ações de Hoje</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-900/5 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                Resumo de Calorias
              </CardTitle>
              <Apple className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                1.200 <span className="text-sm font-normal text-muted-foreground">/ 2000 kcal</span>
              </div>
              <Progress value={60} className="h-2 bg-emerald-100 dark:bg-emerald-950 mt-3" />
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-900/5 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-blue-800 dark:text-blue-400">
                Treino de Hoje
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold mb-3 mt-1">Treino A - Peito e Tríceps</div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                asChild
              >
                <Link to="/client/training">Iniciar Treino</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900/50 bg-purple-50/20 dark:bg-purple-900/5 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-purple-800 dark:text-purple-400">
                Mente
              </CardTitle>
              <Smile className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Como você está se sentindo hoje?
              </p>
              <div className="flex justify-between px-1">
                {['😢', '😐', '😊', '🤩'].map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setMood(i)}
                    className={`text-2xl transition-all hover:scale-110 ${mood === i ? 'grayscale-0 scale-110 drop-shadow-sm' : 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-900/5 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                Foco & Estudos
              </CardTitle>
              <BookOpen className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold mb-3 mt-1">15 Flashcards para revisar</div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                asChild
              >
                <Link to="/client/study">Começar Revisão</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Consistência na Semana</CardTitle>
            <CardDescription>
              Acompanhamento visual do seu engajamento com as metas propostas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: -20 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="nutricao"
                  fill="var(--color-nutricao)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="treino"
                  fill="var(--color-treino)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="estudos"
                  fill="var(--color-estudos)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageContent>
    </div>
  )
}
