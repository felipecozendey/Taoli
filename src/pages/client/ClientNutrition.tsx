import { useState, useEffect, useMemo } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
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
  ShoppingCart,
  Plus,
  Check,
  Activity,
  Target,
  Trash2,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
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
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false)
  const [logForm, setLogForm] = useState({ name: '', cal: 0, pro: 0, car: 0, fat: 0 })

  const fetchData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date().toISOString().split('T')[0]
      const [activeDietRes, progData] = await Promise.all([
        getClientActiveDiet(user.id),
        getDailyNutritionProgress(user.id, today),
      ])

      setProgress(progData)

      if (activeDietRes.data) {
        const { data: fullDiet } = await getFullDietDetails(activeDietRes.data.id)
        if (fullDiet) {
          fullDiet.meals.sort((a, b) => a.order_index - b.order_index)
          setDiet(fullDiet)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const macros = progress
    ? [
        {
          id: 'cal',
          lbl: 'Calorias',
          icon: Flame,
          c: 'text-orange-500',
          v: progress.consumed.calories,
          m: progress.targets.calories,
          u: 'kcal',
        },
        {
          id: 'pro',
          lbl: 'Proteínas',
          icon: Activity,
          c: 'text-red-500',
          v: progress.consumed.protein,
          m: progress.targets.protein,
          u: 'g',
        },
        {
          id: 'car',
          lbl: 'Carboidratos',
          icon: Activity,
          c: 'text-blue-500',
          v: progress.consumed.carbs,
          m: progress.targets.carbs,
          u: 'g',
        },
        {
          id: 'fat',
          lbl: 'Gorduras',
          icon: Activity,
          c: 'text-amber-500',
          v: progress.consumed.fat,
          m: progress.targets.fat,
          u: 'g',
        },
      ]
    : []

  const shopList = useMemo(() => {
    if (!diet) return []
    const map = new Map<string, number>()
    diet.meals.forEach((m) =>
      m.meal_items.forEach((i) => {
        if (i.food_items)
          map.set(i.food_items.name, (map.get(i.food_items.name) || 0) + i.portion_g)
      }),
    )
    return Array.from(map.entries()).map(([n, q]) => `${n} (${q}g)`)
  }, [diet])

  const handleAddWater = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    await addWaterLog(user.id, today, 250)
    fetchData()
  }

  const handleAddLog = async (data: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    await addFoodLog(user.id, today, data)
    fetchData()
  }

  const handleDeleteLog = async (id: string) => {
    await deleteFoodLog(id)
    fetchData()
  }

  const handleToggleMeal = async (m: MealDetails) => {
    const existingLog = progress?.logs.find((l: any) => l.food_name === m.name)
    if (existingLog) {
      await handleDeleteLog(existingLog.id)
    } else {
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
    }
  }

  const submitManualLog = () => {
    handleAddLog({
      food_name: logForm.name || 'Consumo Avulso',
      calories: logForm.cal,
      protein: logForm.pro,
      carbs: logForm.car,
      fat: logForm.fat,
    })
    setIsLogDialogOpen(false)
    setLogForm({ name: '', cal: 0, pro: 0, car: 0, fat: 0 })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader title="Minha Nutrição" />
        <PageContent className="max-w-4xl mx-auto w-full space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </PageContent>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minha Nutrição" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Visão Geral</h2>
          <p className="text-muted-foreground text-sm">Acompanhe sua dieta e metas diárias.</p>
        </div>

        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="diary" className="py-2 text-xs sm:text-sm">
              Diário de Hoje
            </TabsTrigger>
            <TabsTrigger value="plan" className="py-2 text-xs sm:text-sm">
              Meu Plano
            </TabsTrigger>
            <TabsTrigger value="shopping" className="py-2 text-xs sm:text-sm">
              Lista de Compras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="space-y-6">
            <Card className="border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Droplets className="h-5 w-5" /> Hidratação
                  </CardTitle>
                </div>
                <Button
                  onClick={handleAddWater}
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <Plus className="h-4 w-4 mr-1" /> 250ml
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2 text-blue-900 dark:text-blue-300">
                  <span>{progress?.consumed?.water || 0}ml consumidos</span>
                  <span>{Math.round(((progress?.consumed?.water || 0) / 2000) * 100)}%</span>
                </div>
                <Progress
                  value={((progress?.consumed?.water || 0) / 2000) * 100}
                  className="h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {macros.map((m) => (
                <Card key={m.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <m.icon className={`h-5 w-5 ${m.c}`} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        {m.v}/{m.m || 0} {m.u}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2">{m.lbl}</p>
                    <Progress value={((m.v || 0) / (m.m || 1)) * 100} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {diet ? (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" /> Refeições do Plano
                </h3>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {diet.meals.map((m) => {
                    const isConsumed = progress?.logs?.some((l: any) => l.food_name === m.name)
                    return (
                      <AccordionItem
                        key={m.id}
                        value={m.id}
                        className={cn(
                          'border rounded-lg px-4 bg-card transition-colors',
                          isConsumed && 'border-emerald-200 bg-emerald-50/10',
                        )}
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex flex-col items-start text-left">
                            <span className="font-semibold text-base flex items-center gap-2">
                              {m.name}
                              {isConsumed && <Check className="h-4 w-4 text-emerald-500" />}
                            </span>
                            <span className="text-sm text-muted-foreground font-normal">
                              {m.time.substring(0, 5)}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                          <ul className="space-y-2 mb-4">
                            {m.meal_items.map((item) => (
                              <li
                                key={item.id}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />{' '}
                                {item.portion_g}g {item.food_items?.name}{' '}
                                {item.notes && <span className="italic">({item.notes})</span>}
                              </li>
                            ))}
                          </ul>
                          <Button
                            onClick={() => handleToggleMeal(m)}
                            variant={isConsumed ? 'default' : 'outline'}
                            className={cn(
                              'w-full gap-2 transition-colors',
                              isConsumed
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200',
                            )}
                          >
                            <Check className="h-4 w-4" />{' '}
                            {isConsumed ? 'Consumido' : 'Marcar como consumido'}
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            ) : (
              <Card className="border-dashed bg-muted/30">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Você não possui um plano alimentar ativo, mas pode registrar seus consumos
                  manualmente.
                </CardContent>
              </Card>
            )}

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" /> Histórico Diário
                </h3>
                <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" /> Adicionar Consumo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Registro Avulso</DialogTitle>
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
                            value={logForm.cal}
                            onChange={(e) =>
                              setLogForm({ ...logForm, cal: Number(e.target.value) })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="pro">Proteínas (g)</Label>
                          <Input
                            type="number"
                            id="pro"
                            value={logForm.pro}
                            onChange={(e) =>
                              setLogForm({ ...logForm, pro: Number(e.target.value) })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="car">Carboidratos (g)</Label>
                          <Input
                            type="number"
                            id="car"
                            value={logForm.car}
                            onChange={(e) =>
                              setLogForm({ ...logForm, car: Number(e.target.value) })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="fat">Gorduras (g)</Label>
                          <Input
                            type="number"
                            id="fat"
                            value={logForm.fat}
                            onChange={(e) =>
                              setLogForm({ ...logForm, fat: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>
                      <Button onClick={submitManualLog} className="mt-2 w-full">
                        Salvar Registro
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                {!progress?.logs || progress.logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground bg-muted/40 p-6 rounded-md text-center border border-dashed">
                    Nenhum registro de consumo para hoje.
                  </p>
                ) : (
                  progress.logs.map((l: any) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between bg-card border p-4 rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">{l.food_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {l.calories}kcal • {l.protein}g P • {l.carbs}g C • {l.fat}g G
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLog(l.id)}
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4">
            {diet ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" /> {diet.name}
                  </CardTitle>
                  <CardDescription>
                    Consulte as opções e substituições da sua dieta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {diet.meals.map((m) => (
                    <div key={m.id} className="space-y-3">
                      <h4 className="font-semibold text-base border-b pb-1 flex justify-between">
                        <span>{m.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {m.time.substring(0, 5)}
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {m.meal_items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-muted/40 p-3 rounded-md border flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {item.portion_g}g de {item.food_items?.name}
                              </p>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Nota: {item.notes}
                                </p>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(
                                ((item.food_items?.energy_kcal || 0) * item.portion_g) /
                                  (item.food_items?.base_qty_g || 100),
                              )}{' '}
                              kcal
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Utensils className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p>Você não possui um plano alimentar prescrito.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="shopping" className="space-y-4">
            {diet ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" /> Lista de Compras
                  </CardTitle>
                  <CardDescription>Baseado no seu plano nutricional.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {shopList.map((item, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border"
                      >
                        <Checkbox id={`item-${i}`} />
                        <span className="text-sm font-medium leading-none">{item}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p>Uma lista de compras será gerada quando você tiver um plano ativo.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
