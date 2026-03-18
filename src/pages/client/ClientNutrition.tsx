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
  Droplets,
  Flame,
  Utensils,
  ShoppingCart,
  Plus,
  Check,
  Activity,
  Target,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { getClientActiveDiet, getFullDietDetails, type FullDietDetails } from '@/services/nutrition'
import { cn } from '@/lib/utils'

export default function ClientNutrition() {
  const [water, setWater] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [diet, setDiet] = useState<FullDietDetails | null>(null)
  const [consumedMeals, setConsumedMeals] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return
        const { data: activeDiet } = await getClientActiveDiet(user.id)
        if (activeDiet) {
          const { data: fullDiet } = await getFullDietDetails(activeDiet.id)
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
    fetchDiet()
  }, [])

  const { maxes, vals } = useMemo(() => {
    const max = { cal: 0, pro: 0, car: 0, fat: 0 }
    const val = { cal: 0, pro: 0, car: 0, fat: 0 }
    diet?.meals.forEach((m) => {
      let mCal = 0,
        mPro = 0,
        mCar = 0,
        mFat = 0
      m.meal_items.forEach((i) => {
        if (!i.food_items) return
        const r = i.portion_g / 100
        mCal += (i.food_items.energy_kcal || 0) * r
        mPro += (i.food_items.protein_g || 0) * r
        mCar += (i.food_items.carbs_g || 0) * r
        mFat += (i.food_items.fats_g || 0) * r
      })
      max.cal += mCal
      max.pro += mPro
      max.car += mCar
      max.fat += mFat
      if (consumedMeals[m.id]) {
        val.cal += mCal
        val.pro += mPro
        val.car += mCar
        val.fat += mFat
      }
    })
    return { maxes: max, vals: val }
  }, [diet, consumedMeals])

  const macros = [
    {
      id: 'cal',
      lbl: 'Calorias',
      icon: Flame,
      c: 'text-orange-500',
      v: Math.round(vals.cal),
      m: Math.round(maxes.cal),
      u: 'kcal',
    },
    {
      id: 'pro',
      lbl: 'Proteínas',
      icon: Activity,
      c: 'text-red-500',
      v: Math.round(vals.pro),
      m: Math.round(maxes.pro),
      u: 'g',
    },
    {
      id: 'car',
      lbl: 'Carboidratos',
      icon: Activity,
      c: 'text-blue-500',
      v: Math.round(vals.car),
      m: Math.round(maxes.car),
      u: 'g',
    },
    {
      id: 'fat',
      lbl: 'Gorduras',
      icon: Activity,
      c: 'text-amber-500',
      v: Math.round(vals.fat),
      m: Math.round(maxes.fat),
      u: 'g',
    },
  ]

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

  if (!diet) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader title="Minha Nutrição" />
        <PageContent className="max-w-4xl mx-auto w-full flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md text-center py-12 border-dashed">
            <CardContent>
              <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground">
                O teu nutricionista ainda não prescreveu uma dieta.
              </p>
            </CardContent>
          </Card>
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
                  onClick={() => setWater((p) => Math.min(p + 250, 2000))}
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" /> 250ml
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2 text-blue-900 dark:text-blue-300">
                  <span>{water}ml consumidos</span>
                  <span>{Math.round((water / 2000) * 100)}%</span>
                </div>
                <Progress
                  value={(water / 2000) * 100}
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
                        {m.v}/{m.m} {m.u}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2">{m.lbl}</p>
                    <Progress value={(m.v / (m.m || 1)) * 100} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" /> Refeições do Dia
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {diet.meals.map((m) => (
                  <AccordionItem key={m.id} value={m.id} className="border rounded-lg px-4 bg-card">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-base">{m.name}</span>
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
                        onClick={() => setConsumedMeals((p) => ({ ...p, [m.id]: !p[m.id] }))}
                        variant={consumedMeals[m.id] ? 'default' : 'outline'}
                        className={cn(
                          'w-full gap-2',
                          consumedMeals[m.id]
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200',
                        )}
                      >
                        <Check className="h-4 w-4" />{' '}
                        {consumedMeals[m.id] ? 'Consumido' : 'Marcar como consumido'}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" /> {diet.name}
                </CardTitle>
                <CardDescription>Consulte as opções e substituições da sua dieta.</CardDescription>
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
                              ((item.food_items?.energy_kcal || 0) * item.portion_g) / 100,
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
          </TabsContent>

          <TabsContent value="shopping" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
