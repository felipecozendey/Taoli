import { useState, useEffect, useMemo } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Droplets,
  Flame,
  Utensils,
  Check,
  Trash2,
  Pill,
  BellRing,
  TrendingDown,
  Activity,
  Scale,
  Dna,
  Loader2,
  AlertTriangle,
  Edit2,
  Plus,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import {
  getClientActiveDiet,
  getFullDietDetails,
  getDailyNutritionProgress,
  addFoodLog,
  deleteFoodLog,
  addWaterLog,
  getClientAssessments,
  getClientSupplements,
  getTrackingByPeriod,
  getTrackingForDay,
  deleteExtraMealFromDay,
  type FullDietDetails,
  type MealDetails,
  type NutritionAssessment,
  type NutritionSupplement,
} from '@/services/nutrition'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ExtraMealDialog } from '@/components/nutrition/ExtraMealDialog'
import { DateRangeDashboard } from '@/components/nutrition/DateRangeDashboard'

const weightChartConfig = {
  peso: { label: 'Peso', color: 'hsl(var(--primary))' },
  meta: { label: 'Meta', color: 'hsl(var(--muted-foreground))' },
} satisfies ChartConfig

const compChartConfig = {
  gordura: { label: 'Gordura', color: 'hsl(var(--destructive))' },
  musculo: { label: 'Músculo', color: 'hsl(var(--primary))' },
} satisfies ChartConfig

export default function ClientNutrition() {
  const { user, impersonatedUser } = useAuth()
  const activeUser = impersonatedUser || user
  const [isLoading, setIsLoading] = useState(true)
  const [diet, setDiet] = useState<FullDietDetails | null>(null)
  const [progress, setProgress] = useState<any>(null)
  const [assessments, setAssessments] = useState<NutritionAssessment[]>([])
  const [supplements, setSupplements] = useState<NutritionSupplement[]>([])
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [remindersEnabled, setRemindersEnabled] = useState(false)
  const [periodTracking, setPeriodTracking] = useState<any[]>([])
  const [dayTracking, setDayTracking] = useState<any>(null)
  const [customWater, setCustomWater] = useState('')

  const [extraMealModalOpen, setExtraMealModalOpen] = useState(false)
  const [mealToEdit, setMealToEdit] = useState<any>(null)

  const { toast } = useToast()

  const fetchData = async () => {
    if (!activeUser?.id) return

    setIsLoading(true)
    try {
      const [activeDietRes, progData, assessmentsRes, supplementsRes, dayTrackRes] =
        await Promise.all([
          getClientActiveDiet(activeUser.id),
          getDailyNutritionProgress(activeUser.id, date),
          getClientAssessments(activeUser.id),
          getClientSupplements(activeUser.id),
          getTrackingForDay(activeUser.id, date),
        ])

      setProgress(progData)
      setAssessments(assessmentsRes.data || [])
      setSupplements(supplementsRes.data || [])
      setDayTracking(dayTrackRes)

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
    if (activeUser?.id) {
      fetchData()
    }
  }, [date, activeUser?.id])

  const latestAssessment = assessments?.[0]

  const chartData = useMemo(() => {
    if (!assessments || assessments.length === 0) return []
    return [...assessments].reverse().map((a) => ({
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(
        new Date(a.date),
      ),
      peso: a.weight || 0,
      meta: a.goal_weight || 0,
      gordura: a.body_fat_percentage || 0,
      musculo: a.muscle_mass_percentage || 0,
    }))
  }, [assessments])

  const playBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    } catch (e) {
      console.error('Audio blocked', e)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (remindersEnabled) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          interval = setInterval(() => {
            if (supplements.length > 0) {
              playBeep()
              new Notification('Hora da Suplementação! 💊', {
                body: 'Verifique a sua lista de suplementos para este horário.',
                icon: '/favicon.ico',
              })
            }
          }, 60 * 1000)
        } else {
          setRemindersEnabled(false)
          toast({
            title: 'Permissão negada',
            description: 'Para receber alertas, ative as notificações no seu navegador.',
            variant: 'destructive',
          })
        }
      })
    }
    return () => clearInterval(interval)
  }, [remindersEnabled, supplements])

  const handleAddWaterAmount = async (amount: number) => {
    if (!activeUser?.id || amount <= 0) return
    await addWaterLog(activeUser.id, date, amount)
    toast({ title: `💧 ${amount}ml de água registados!` })
    fetchData()
  }

  const handleDeleteLog = async (id: string) => {
    await deleteFoodLog(id)
    toast({ title: 'Registo removido', variant: 'destructive' })
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

    if (!activeUser?.id) return

    await addFoodLog(activeUser.id, date, {
      food_name: m.name,
      calories: Math.round(cal),
      protein: Math.round(pro),
      carbs: Math.round(car),
      fat: Math.round(fat),
    })
    toast({ title: `✔️ Refeição "${m.name}" registada com sucesso!` })
    fetchData()
  }

  const fetchPeriodData = async (start: Date, end: Date) => {
    if (!activeUser?.id) return
    try {
      setDate(format(end, 'yyyy-MM-dd'))
      const data = await getTrackingByPeriod(
        activeUser.id,
        format(start, 'yyyy-MM-dd'),
        format(end, 'yyyy-MM-dd'),
      )
      setPeriodTracking(data)
    } catch (err) {
      console.error(err)
    }
  }

  const targetCals = progress?.targets?.calories || 2000
  const baseConsumed = progress?.consumed || { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 }
  const extraConsumed = (dayTracking?.extra_meals || []).reduce(
    (acc: any, meal: any) => {
      acc.calories += meal.calories || 0
      acc.protein += meal.protein || 0
      acc.carbs += meal.carbs || 0
      acc.fat += meal.fats || meal.fat || 0
      return acc
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  const totalConsumed = {
    calories: baseConsumed.calories + extraConsumed.calories,
    protein: baseConsumed.protein + extraConsumed.protein,
    carbs: baseConsumed.carbs + extraConsumed.carbs,
    fat: baseConsumed.fat + extraConsumed.fat,
    water: baseConsumed.water,
  }

  const consumedCals = totalConsumed.calories || 0
  const diferenca = targetCals - consumedCals
  const isExceeded = diferenca < 0
  const displayValue = Math.abs(diferenca)
  const calPercent = targetCals > 0 ? Math.min((consumedCals / targetCals) * 100, 100) : 0
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = isExceeded ? 0 : circumference - (calPercent / 100) * circumference

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="A Minha Nutrição" />
      <PageContent className="max-w-3xl mx-auto w-full animate-fade-in-up space-y-6">
        <DateRangeDashboard onRangeChange={fetchPeriodData} />

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted/60">
            <TabsTrigger value="dashboard" className="py-2.5">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="diet" className="py-2.5">
              A Minha Dieta
            </TabsTrigger>
            <TabsTrigger value="supplements" className="py-2.5">
              Suplementação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {isLoading ? (
              <Card className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </Card>
            ) : (
              <>
                <Card className="shadow-sm border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                      <Activity className="h-5 w-5 text-primary" /> Balanço Energético e Macros
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="relative w-36 h-36 flex items-center justify-center shrink-0 mx-auto md:mx-0">
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
                            className={cn(
                              'transition-all duration-1000 ease-out',
                              isExceeded ? 'text-red-500' : 'text-primary',
                            )}
                          />
                        </svg>
                        <div
                          className={cn(
                            'absolute flex flex-col items-center justify-center text-center',
                            isExceeded ? 'text-red-500' : '',
                          )}
                        >
                          <Flame
                            className={cn(
                              'h-5 w-5 mb-1 opacity-80',
                              isExceeded ? 'text-red-500' : 'text-primary',
                            )}
                          />
                          <span className="text-xl font-bold leading-none">
                            {isExceeded ? 'Excedeu' : 'Restam'}
                          </span>
                          <span className="text-sm font-semibold tracking-wider text-muted-foreground mt-1">
                            {displayValue} kcal
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <Tabs defaultValue="macros" className="w-full mt-4">
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="macros">Macronutrientes</TabsTrigger>
                            <TabsTrigger value="micronutrients">Micronutrientes</TabsTrigger>
                          </TabsList>

                          <TabsContent value="macros" className="space-y-4">
                            <div className="space-y-1.5 mb-5 pb-5 border-b border-border/50">
                              <div className="flex justify-between text-xs font-medium mb-1">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Flame className="w-3 h-3 text-orange-500" /> Calorias (VETA)
                                </span>
                                <span>
                                  {consumedCals} / {latestAssessment?.tdee || targetCals || 2000}{' '}
                                  kcal
                                </span>
                              </div>
                              <div className="relative h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    'h-full transition-all duration-500',
                                    isExceeded ? 'bg-red-500' : 'bg-primary',
                                  )}
                                  style={{
                                    width: `${Math.min((consumedCals / (latestAssessment?.tdee || targetCals || 2000)) * 100, 100)}%`,
                                  }}
                                />
                                <div
                                  className="absolute top-0 bottom-0 w-0.5 bg-foreground z-10 shadow-[0_0_2px_rgba(0,0,0,0.5)]"
                                  style={{ left: '99%' }}
                                  title="VETA"
                                />
                              </div>
                              {isExceeded && (
                                <p className="text-[10px] text-red-500 font-medium mt-1">
                                  Meta diária ultrapassada.
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-blue-500" /> Proteínas
                                </span>
                                <span>
                                  {totalConsumed.protein}g / {progress?.targets?.protein || 0}g
                                </span>
                              </div>
                              <Progress
                                value={
                                  (totalConsumed.protein / (progress?.targets?.protein || 1)) * 100
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
                                  {totalConsumed.carbs}g / {progress?.targets?.carbs || 0}g
                                </span>
                              </div>
                              <Progress
                                value={
                                  (totalConsumed.carbs / (progress?.targets?.carbs || 1)) * 100
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
                                  {totalConsumed.fat}g / {progress?.targets?.fat || 0}g
                                </span>
                              </div>
                              <Progress
                                value={(totalConsumed.fat / (progress?.targets?.fat || 1)) * 100}
                                className="h-2 [&>div]:bg-amber-500 bg-amber-100 dark:bg-amber-950"
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="micronutrients">
                            <div className="grid grid-cols-3 gap-3 text-center mt-2">
                              <div className="p-3 bg-muted/30 rounded-lg border">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                  Fibras
                                </p>
                                <p className="text-base font-bold">12g</p>
                              </div>
                              <div className="p-3 bg-muted/30 rounded-lg border">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                  Sódio
                                </p>
                                <p className="text-base font-bold">1500mg</p>
                              </div>
                              <div className="p-3 bg-muted/30 rounded-lg border">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                  Cálcio
                                </p>
                                <p className="text-base font-bold">400mg</p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {!latestAssessment ? (
                  <Card className="p-8 flex flex-col items-center justify-center text-center border-dashed">
                    <Activity className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <h3 className="text-lg font-semibold">Sem dados físicos</h3>
                    <p className="text-sm text-muted-foreground">
                      A sua primeira avaliação física ainda não foi registada pelo seu profissional.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Scale className="h-4 w-4" />
                            <span className="text-sm font-medium">Peso Atual</span>
                          </div>
                          <div className="text-2xl font-bold">
                            {latestAssessment.weight || '--'}{' '}
                            <span className="text-sm font-normal text-muted-foreground">kg</span>
                          </div>
                          {latestAssessment.goal_weight && latestAssessment.weight && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Faltam{' '}
                              {Math.abs(
                                latestAssessment.weight - latestAssessment.goal_weight,
                              ).toFixed(1)}{' '}
                              kg para a meta
                            </p>
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <TrendingDown className="h-4 w-4" />
                            <span className="text-sm font-medium">% de Gordura</span>
                          </div>
                          <div className="text-2xl font-bold">
                            {latestAssessment.body_fat_percentage || '--'}{' '}
                            <span className="text-sm font-normal text-muted-foreground">%</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Gasto Diário</span>
                          </div>
                          <div className="text-2xl font-bold">
                            {latestAssessment.tdee || '--'}{' '}
                            <span className="text-sm font-normal text-muted-foreground">kcal</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Estado Atual</span>
                          </div>
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-sm">
                              {latestAssessment.status || 'Não definido'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {chartData.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Evolução de Peso</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer config={weightChartConfig} className="h-[250px] w-full">
                              <LineChart
                                data={chartData}
                                margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                  dataKey="date"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                />
                                <YAxis
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  domain={['auto', 'auto']}
                                />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend content={<ChartLegendContent />} />
                                <Line
                                  type="monotone"
                                  name="Peso (kg)"
                                  dataKey="peso"
                                  stroke="var(--color-peso)"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                                <Line
                                  type="monotone"
                                  name="Meta (kg)"
                                  dataKey="meta"
                                  stroke="var(--color-meta)"
                                  strokeWidth={2}
                                  strokeDasharray="5 5"
                                  dot={false}
                                />
                              </LineChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Dna className="h-4 w-4" /> Composição Corporal
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer config={compChartConfig} className="h-[250px] w-full">
                              <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                  dataKey="date"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                />
                                <YAxis
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  domain={[0, 100]}
                                />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend content={<ChartLegendContent />} />
                                <Area
                                  type="monotone"
                                  name="Gordura (%)"
                                  dataKey="gordura"
                                  fill="var(--color-gordura)"
                                  stroke="var(--color-gordura)"
                                  fillOpacity={0.4}
                                  stackId="1"
                                />
                                <Area
                                  type="monotone"
                                  name="Músculo (%)"
                                  dataKey="musculo"
                                  fill="var(--color-musculo)"
                                  stroke="var(--color-musculo)"
                                  fillOpacity={0.4}
                                  stackId="2"
                                />
                              </AreaChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:border-blue-900 dark:from-blue-950/40 dark:to-blue-900/20 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-500 text-white rounded-full shadow-sm">
                            <Droplets className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                              Hidratação
                            </p>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                              {totalConsumed.water || 0}{' '}
                              <span className="text-sm font-normal">ml</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddWaterAmount(250)}
                            className="border-blue-200 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                          >
                            + 250ml
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddWaterAmount(500)}
                            className="border-blue-200 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                          >
                            + 500ml
                          </Button>
                          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Input
                              type="number"
                              placeholder="Outro..."
                              className="w-24 h-9 bg-white/50 dark:bg-black/50 border-blue-200 dark:border-blue-800"
                              value={customWater}
                              onChange={(e) => setCustomWater(e.target.value)}
                            />
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-blue-200 text-blue-800 hover:bg-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700 whitespace-nowrap"
                              onClick={() => {
                                const amount = Number(customWater)
                                if (amount > 0) {
                                  handleAddWaterAmount(amount)
                                  setCustomWater('')
                                }
                              }}
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="diet" className="space-y-4">
            {isLoading ? (
              <Card className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </Card>
            ) : diet ? (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" /> {diet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Marque as refeições que consumiu hoje para registar os macros automaticamente.
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

                {dayTracking && dayTracking.extra_meals && dayTracking.extra_meals.length > 0 && (
                  <div className="mt-8 border-t pt-6 border-dashed border-destructive/50">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <h3 className="text-lg font-bold text-destructive">
                        Consumo Extra (Fora do Plano)
                      </h3>
                    </div>
                    {dayTracking.extra_meals.map((extra: any) => (
                      <Card key={extra.id} className="mb-3 border-destructive/30 bg-destructive/5">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{extra.name}</p>
                            <p className="text-sm text-muted-foreground">{extra.amount_grams}g</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {(extra.calories > 0 ||
                              extra.protein > 0 ||
                              extra.carbs > 0 ||
                              extra.fats > 0 ||
                              extra.fat > 0) && (
                              <p className="text-xs text-muted-foreground hidden sm:block">
                                {extra.calories > 0 && (
                                  <span className="mr-1">{extra.calories} kcal</span>
                                )}
                                {extra.protein > 0 && (
                                  <span className="mr-1">| {extra.protein}g P</span>
                                )}
                                {extra.carbs > 0 && (
                                  <span className="mr-1">| {extra.carbs}g C</span>
                                )}
                                {(extra.fats > 0 || extra.fat > 0) && (
                                  <span>| {extra.fats || extra.fat}g G</span>
                                )}
                              </p>
                            )}
                            <Badge variant="destructive">Extra</Badge>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                onClick={() => {
                                  setMealToEdit(extra)
                                  setExtraMealModalOpen(true)
                                }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                onClick={async () => {
                                  if (activeUser?.id) {
                                    try {
                                      await deleteExtraMealFromDay(activeUser.id, date, extra.id)
                                      toast({ title: 'Refeição extra removida!' })
                                      fetchData()
                                    } catch (e) {
                                      toast({
                                        title: 'Erro ao remover refeição',
                                        variant: 'destructive',
                                      })
                                    }
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => {
                    setMealToEdit(null)
                    setExtraMealModalOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Refeição Extra
                </Button>

                <ExtraMealDialog
                  open={extraMealModalOpen}
                  onOpenChange={setExtraMealModalOpen}
                  date={date}
                  onSuccess={fetchData}
                  patientId={activeUser?.id}
                  editMeal={mealToEdit}
                  consumedToday={consumedCals}
                  caloricGoal={latestAssessment?.tdee || targetCals || 2000}
                />
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Utensils className="h-6 w-6 opacity-50" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Nenhum plano ativo</p>
                  <p className="text-sm">
                    Não possui um plano alimentar prescrito por um profissional no momento.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="supplements" className="space-y-4">
            <Card className="mb-6 bg-primary/5 border-primary/20 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Lembretes de Suplementação</h4>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações no navegador para não se esquecer.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="reminders"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  {remindersEnabled ? 'Ativados' : 'Desativados'}
                </Label>
                <Switch
                  id="reminders"
                  checked={remindersEnabled}
                  onCheckedChange={setRemindersEnabled}
                />
              </div>
            </Card>

            {isLoading ? (
              <Card className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </Card>
            ) : supplements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplements.map((sup) => (
                  <Card
                    key={sup.id}
                    className="shadow-sm border-border/50 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-md">
                          <Pill className="h-4 w-4 text-primary" />
                        </div>
                        {sup.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Badge variant="secondary" className="font-medium">
                          {sup.dosage}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        {sup.frequency && (
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Frequência:</span>
                            <span className="font-medium">{sup.frequency}</span>
                          </p>
                        )}
                        {sup.timing && (
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Horário:</span>
                            <span className="font-medium">{sup.timing}</span>
                          </p>
                        )}
                      </div>
                      {sup.observations && (
                        <p className="text-xs italic text-muted-foreground pt-3 mt-1 border-t">
                          "{sup.observations}"
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Pill className="h-6 w-6 opacity-50" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Nenhum suplemento prescrito</p>
                  <p className="text-sm">
                    Ainda não tem suplementos prescritos. Consulte o seu profissional.
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
