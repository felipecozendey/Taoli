import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { PlusCircle, Droplets, Flame, Utensils } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { getDailyNutritionProgress } from '@/services/nutrition'
import { cn } from '@/lib/utils'

interface PatientNutritionMirrorProps {
  patientId: string
}

export function PatientNutritionMirror({ patientId }: PatientNutritionMirrorProps) {
  const navigate = useNavigate()
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!patientId) return

    const fetchData = async () => {
      setLoading(true)
      const formattedDate = format(date, 'yyyy-MM-dd')
      const result = await getDailyNutritionProgress(patientId, formattedDate)
      setData(result)
      setLoading(false)
    }

    fetchData()
  }, [patientId, date])

  const renderMacro = (label: string, consumed: number, target: number, colorClass: string) => {
    const pct = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">{label}</span>
          <span className="text-muted-foreground">
            {consumed}g / {target}g
          </span>
        </div>
        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }

  // Calculate Caloric Difference
  const targetCals = data?.targets?.calories || 0
  const consumedCals = data?.consumed?.calories || 0
  const hasTarget = targetCals > 0
  const diferenca = targetCals - consumedCals
  const isExceeded = hasTarget && diferenca < 0
  const displayValue = Math.abs(diferenca)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column (Controls) */}
      <div className="lg:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Navegação Histórica</CardTitle>
            <CardDescription>Selecione uma data para analisar.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="rounded-md border shadow-sm bg-background"
            />
          </CardContent>
        </Card>
        <Button
          className="w-full"
          onClick={() => navigate(`/professional/prescriptions?patientId=${patientId}`)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Prescrição
        </Button>
      </div>

      {/* Right Column (Monitoring Dashboard) */}
      <div className="lg:col-span-8">
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : data && data.targets.calories === 0 && data.logs.length === 0 ? (
          <Card className="border-dashed bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <Utensils className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground font-medium">
                No data or active diet on this day.
              </p>
            </CardContent>
          </Card>
        ) : data ? (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className={cn(isExceeded && 'border-red-500 bg-red-50 dark:bg-red-950/20')}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle
                    className={cn(
                      'text-sm font-medium',
                      isExceeded && 'text-red-700 dark:text-red-400',
                    )}
                  >
                    Calorias (kcal)
                  </CardTitle>
                  <Flame
                    className={cn('h-4 w-4', isExceeded ? 'text-red-500' : 'text-orange-500')}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      'text-3xl font-bold tracking-tight',
                      isExceeded && 'text-red-600 dark:text-red-400',
                    )}
                  >
                    {consumedCals}{' '}
                    <span
                      className={cn(
                        'text-lg font-normal',
                        isExceeded ? 'text-red-400' : 'text-muted-foreground',
                      )}
                    >
                      / {targetCals}
                    </span>
                  </div>
                  {hasTarget && (
                    <p
                      className={cn(
                        'text-xs mt-1 font-semibold',
                        isExceeded ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground',
                      )}
                    >
                      {isExceeded ? `Excedeu ${displayValue} kcal` : `Restam ${displayValue} kcal`}
                    </p>
                  )}
                  {!hasTarget && (
                    <p className="text-xs text-muted-foreground mt-1">Total consumido vs meta</p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">Ingestão de Água</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                    {data.consumed.water}{' '}
                    <span className="text-lg text-muted-foreground font-normal">ml</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Registrado pelo paciente</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progresso de Macronutrientes</CardTitle>
                <CardDescription>Comparativo do consumo com a dieta prescrita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {renderMacro(
                  'Proteínas',
                  data.consumed.protein,
                  data.targets.protein,
                  'bg-blue-500',
                )}
                {renderMacro(
                  'Carboidratos',
                  data.consumed.carbs,
                  data.targets.carbs,
                  'bg-emerald-500',
                )}
                {renderMacro('Gorduras', data.consumed.fat, data.targets.fat, 'bg-amber-500')}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Diário de Consumo</CardTitle>
                <CardDescription>Refeições e alimentos registrados no dia</CardDescription>
              </CardHeader>
              <CardContent>
                {data.logs.length > 0 ? (
                  <div className="space-y-3">
                    {data.logs.map((log: any) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <span className="font-medium text-sm">{log.food_name}</span>
                        <Badge variant="secondary" className="font-semibold">
                          {log.calories} kcal
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-sm text-muted-foreground border rounded-lg border-dashed">
                    Nenhum registro de consumo para este dia.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}
