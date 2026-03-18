import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Droplets,
  Flame,
  Utensils,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import {
  getClientActiveDiet,
  getFullDietDetails,
  getDailyNutritionProgress,
  addFoodLog,
  deleteFoodLog,
  addWaterLog,
  type FullDietDetails,
  type MealDetails,
} from '@/services/nutrition'
import { cn } from '@/lib/utils'

export default function ClientNutrition() {
  const [isLoading, setIsLoading] = useState(true)
  const [diet, setDiet] = useState<FullDietDetails | null>(null)
  const [progress, setProgress] = useState<any>(null)
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false)
  const [logForm, setLogForm] = useState({ name: '', cal: 0, pro: 0, car: 0, fat: 0 })

  const { toast } = useToast()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const [activeDietRes, progData] = await Promise.all([
        getClientActiveDiet(user.id),
        getDailyNutritionProgress(user.id, date),
      ])

      setProgress(progData)

      if (activeDietRes.data) {
        const { data: fullDiet } = await getFullDietDetails(activeDietRes.data.id)
        if (fullDiet) {
          fullDiet.meals.sort((a, b) => a.order_index - b.order_index)
          setDiet(fullDiet)
        }
      } else {
        setDiet(null)
      }
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro ao carregar dados', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [date])

  const changeDate = (days: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    setDate(d.toISOString().split('T')[0])
  }

  const handleAddWater = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return
    await addWaterLog(user.id, date, 250)
    toast({ title: '💧 250ml de água registrados!' })
    fetchData()
  }

  const handleAddLog = async (data: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return
    await addFoodLog(user.id, date, data)
    fetchData()
  }

  const handleDeleteLog = async (id: string) => {
    await deleteFoodLog(id)
    toast({ title: 'Registro removido', variant: 'destructive' })
    fetchData()
  }

  const handleLogMeal = async (m: MealDetails) => {
    const isConsumed = progress?.logs?.some((l: any) => l.food_name === m.name)
    if (isConsumed) return

    let cal = 0,
      pro = 0,
      car = 0,
      fat = 0
    m.meal_items.forEach((i) => {
      if (!i.food_items) return
      const r = i.portion_g / (i.food_items.base_qty_g || 100)
      cal += (i.food_items.energy_kcal || 0) * r
      pro += (i.food_items.protein_g || 0) * r
      car += (i.food_items.carbs_g || 0) * r
      fat += (i.food_items.fats_g || 0) * r
    })

    await handleAddLog({
      food_name: m.name,
      calories: Math.round(cal),
      protein: Math.round(pro),
      carbs: Math.round(car),
      fat: Math.round(fat),
    })
    toast({ title: `✔️ Refeição "${m.name}" registrada com sucesso!` })
  }

  const submitManualLog = () => {
    if (!logForm.name) {
      toast({ title: 'Preencha o nome do alimento', variant: 'destructive' })
      return
    }
    handleAddLog({
      food_name: logForm.name,
      calories: logForm.cal,
      protein: logForm.pro,
      carbs: logForm.car,
      fat: logForm.fat,
    })
    toast({ title: 'Alimento avulso registrado!' })
    setIsLogDialogOpen(false)
    setLogForm({ name: '', cal: 0, pro: 0, car: 0, fat: 0 })
  }

  // Circular Progress Calculations
  const targetCals = progress?.targets?.calories || 2000
  const consumedCals = progress?.consumed?.calories || 0
  const remainingCals = Math.max(targetCals - consumedCals, 0)
  const calPercent = Math.min((consumedCals / targetCals) * 100, 100) || 0
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (calPercent / 100) * circumference

  // Display Date Formatting
  const displayDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
    .format(new Date(date + 'T12:00:00'))
    .replace('.', '')

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader title="Minha Nutrição" />
        <PageContent className="max-w-3xl mx-auto w-full space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <div className="grid gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </PageContent>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minha Nutrição" />
      <PageContent className="max-w-3xl mx-auto w-full animate-fade-in-up space-y-6">
        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-card border rounded-lg p-2 px-4 shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => changeDate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold capitalize text-base">{displayDate}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeDate(1)}
            disabled={date === new Date().toISOString().split('T')[0]}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/60">
            <TabsTrigger value="dashboard" className="py-2.5">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="diet" className="py-2.5">
              Minha Dieta
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Calorie Summary */}
            <Card className="shadow-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-muted/20"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <Flame className="h-5 w-5 text-primary mb-1 opacity-80" />
                      <span className="text-2xl font-bold leading-none">{remainingCals}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                        Restantes
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> Proteínas
                        </span>
                        <span>
                          {progress?.consumed?.protein || 0}g / {progress?.targets?.protein || 0}g
                        </span>
                      </div>
                      <Progress
                        value={
                          ((progress?.consumed?.protein || 0) / (progress?.targets?.protein || 1)) *
                          100
                        }
                        className="h-2 [&>div]:bg-blue-500 bg-blue-100 dark:bg-blue-950"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" /> Carboidratos
                        </span>
                        <span>
                          {progress?.consumed?.carbs || 0}g / {progress?.targets?.carbs || 0}g
                        </span>
                      </div>
                      <Progress
                        value={
                          ((progress?.consumed?.carbs || 0) / (progress?.targets?.carbs || 1)) * 100
                        }
                        className="h-2 [&>div]:bg-green-500 bg-green-100 dark:bg-green-950"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-amber-500" /> Gorduras
                        </span>
                        <span>
                          {progress?.consumed?.fat || 0}g / {progress?.targets?.fat || 0}g
                        </span>
                      </div>
                      <Progress
                        value={
                          ((progress?.consumed?.fat || 0) / (progress?.targets?.fat || 1)) * 100
                        }
                        className="h-2 [&>div]:bg-amber-500 bg-amber-100 dark:bg-amber-950"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Water Tracking */}
              <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:border-blue-900 dark:from-blue-950/40 dark:to-blue-900/20 shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 text-white rounded-full shadow-sm">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                        Hidratação
                      </p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                        {progress?.consumed?.water || 0}{' '}
                        <span className="text-sm font-normal">ml</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddWater}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" /> 250ml
                  </Button>
                </CardContent>
              </Card>

              {/* Custom Food Log Action */}
              <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
                <DialogTrigger asChild>
                  <Card className="border-dashed border-2 bg-transparent hover:bg-muted/50 transition-colors cursor-pointer shadow-sm">
                    <CardContent className="p-5 flex items-center justify-center gap-3 h-full">
                      <div className="p-2 bg-muted rounded-full">
                        <Utensils className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-muted-foreground">
                        Adicionar Alimento Avulso
                      </span>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Registro Manual</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Alimento / Refeição</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Maçã ou Almoço Extra"
                        value={logForm.name}
                        onChange={(e) => setLogForm({ ...logForm, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cal">Calorias (kcal)</Label>
                        <Input
                          type="number"
                          id="cal"
                          value={logForm.cal || ''}
                          onChange={(e) => setLogForm({ ...logForm, cal: Number(e.target.value) })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="pro">Proteínas (g)</Label>
                        <Input
                          type="number"
                          id="pro"
                          value={logForm.pro || ''}
                          onChange={(e) => setLogForm({ ...logForm, pro: Number(e.target.value) })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="car">Carbos (g)</Label>
                        <Input
                          type="number"
                          id="car"
                          value={logForm.car || ''}
                          onChange={(e) => setLogForm({ ...logForm, car: Number(e.target.value) })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="fat">Gorduras (g)</Label>
                        <Input
                          type="number"
                          id="fat"
                          value={logForm.fat || ''}
                          onChange={(e) => setLogForm({ ...logForm, fat: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <Button onClick={submitManualLog} className="mt-4 w-full">
                      Salvar Registro
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Daily Logs List */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Consumidos Hoje
              </h3>
              {!progress?.logs || progress.logs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  Nenhum alimento registrado.
                </p>
              ) : (
                progress.logs.map((l: any) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between bg-card border p-3 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-sm">{l.food_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {l.calories} kcal • {l.protein}g P • {l.carbs}g C • {l.fat}g G
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteLog(l.id)}
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* DIET TAB */}
          <TabsContent value="diet" className="space-y-4">
            {diet ? (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" /> {diet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Marque as refeições que você já consumiu hoje para registrar os macros
                    automaticamente.
                  </p>
                </div>

                {diet.meals.map((m) => {
                  const isConsumed = progress?.logs?.some((l: any) => l.food_name === m.name)

                  return (
                    <Card
                      key={m.id}
                      className={cn(
                        'overflow-hidden transition-colors duration-300',
                        isConsumed
                          ? 'border-emerald-200 bg-emerald-50/10 dark:border-emerald-900/50'
                          : '',
                      )}
                    >
                      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between bg-muted/20 border-b">
                        <CardTitle className="text-base flex items-center gap-2">
                          {m.name}
                          {isConsumed && <Check className="h-4 w-4 text-emerald-500" />}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
                          {m.time.substring(0, 5)}
                        </span>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="space-y-2 mb-4">
                          {m.meal_items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                {item.portion_g}g {item.food_items?.name}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {Math.round(
                                  ((item.food_items?.energy_kcal || 0) * item.portion_g) /
                                    (item.food_items?.base_qty_g || 100),
                                )}{' '}
                                kcal
                              </span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          disabled={isConsumed}
                          onClick={() => handleLogMeal(m)}
                          variant={isConsumed ? 'secondary' : 'default'}
                          className={cn(
                            'w-full transition-all',
                            isConsumed
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 opacity-100'
                              : '',
                          )}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          {isConsumed ? 'Consumido' : '✔️ Consumi'}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Utensils className="h-6 w-6 opacity-50" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Nenhum plano ativo</p>
                  <p className="text-sm">
                    Você não possui um plano alimentar prescrito por um profissional no momento.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
