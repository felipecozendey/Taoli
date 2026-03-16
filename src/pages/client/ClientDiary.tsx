import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Apple, Dumbbell, Brain, CheckSquare } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ClientDiary() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Resumo do Dia" />
      <PageContent className="max-w-5xl mx-auto w-full animate-fade-in-up">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Diet Summary */}
          <Card className="border-emerald-100 dark:border-emerald-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-emerald-50/50 dark:bg-emerald-900/10 border-b mb-4">
              <CardTitle className="text-lg font-semibold text-emerald-800 dark:text-emerald-400">
                Resumo da Dieta
              </CardTitle>
              <Apple className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Calorias Consumidas</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      1.200 / 2.000 kcal
                    </span>
                  </div>
                  <Progress value={60} className="h-2 bg-emerald-100 dark:bg-emerald-900" />
                </div>
                <div className="bg-muted/40 p-3 rounded-md text-sm text-muted-foreground flex items-center justify-between">
                  <span>Próxima refeição:</span>
                  <span className="font-medium text-foreground">Lanche da Tarde às 16h</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  asChild
                >
                  <Link to="/client/nutrition">Ver Dieta Completa</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Summary */}
          <Card className="border-blue-100 dark:border-blue-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-blue-50/50 dark:bg-blue-900/10 border-b mb-4">
              <CardTitle className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                Treino de Hoje
              </CardTitle>
              <Dumbbell className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">Treino B - Membros Superiores</p>
                    <p className="text-xs text-muted-foreground mt-1">Foco em hipertrofia</p>
                  </div>
                  <span className="text-sm font-medium bg-background px-2 py-1 rounded shadow-sm">
                    45 min
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  asChild
                >
                  <Link to="/client/training">Iniciar Treino</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mood Summary */}
          <Card className="border-purple-100 dark:border-purple-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-purple-50/50 dark:bg-purple-900/10 border-b mb-4">
              <CardTitle className="text-lg font-semibold text-purple-800 dark:text-purple-400">
                Humor
              </CardTitle>
              <Brain className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Como você está se sentindo hoje?
                </p>
                <div className="flex justify-center gap-6">
                  <span className="text-4xl grayscale hover:grayscale-0 hover:scale-110 transition-all cursor-pointer">
                    😢
                  </span>
                  <span className="text-4xl grayscale hover:grayscale-0 hover:scale-110 transition-all cursor-pointer">
                    😐
                  </span>
                  <span className="text-4xl hover:scale-110 transition-all cursor-pointer drop-shadow-sm">
                    😊
                  </span>
                  <span className="text-4xl grayscale hover:grayscale-0 hover:scale-110 transition-all cursor-pointer">
                    🤩
                  </span>
                </div>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <Link to="/client/mind">Registrar Saúde Mental</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Summary */}
          <Card className="border-amber-100 dark:border-amber-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-amber-50/50 dark:bg-amber-900/10 border-b mb-4">
              <CardTitle className="text-lg font-semibold text-amber-800 dark:text-amber-400">
                Tarefas & Foco
              </CardTitle>
              <CheckSquare className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm line-through text-muted-foreground">
                    <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center text-primary text-xs">
                      ✓
                    </div>
                    Leitura (15 páginas)
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <div className="h-5 w-5 border-2 rounded border-muted-foreground/30"></div>
                    Sessão de foco (Estudos)
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <div className="h-5 w-5 border-2 rounded border-muted-foreground/30"></div>
                    Meditação 10 min
                  </li>
                </ul>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    asChild
                  >
                    <Link to="/client/study">Gerenciar Estudos</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
