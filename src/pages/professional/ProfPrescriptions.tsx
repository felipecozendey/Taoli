import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Trash2, Plus } from 'lucide-react'

interface FoodItem {
  id: string
  name: string
  energy: number
  protein: number
  carbs: number
  fats: number
  source: string
}

interface DietEntry extends FoodItem {
  entryId: string
  portion: string | number
}

const MOCK_FOODS: FoodItem[] = [
  {
    id: '1',
    name: 'Arroz branco, cozido',
    energy: 128,
    protein: 2.5,
    carbs: 28.1,
    fats: 0.2,
    source: 'TACO_4ed',
  },
  {
    id: '2',
    name: 'Feijão, carioca, cozido',
    energy: 76,
    protein: 4.8,
    carbs: 13.6,
    fats: 0.5,
    source: 'TACO_4ed',
  },
  {
    id: '3',
    name: 'Frango, peito, grelhado',
    energy: 159,
    protein: 32.0,
    carbs: 0,
    fats: 2.5,
    source: 'TACO_4ed',
  },
  {
    id: '4',
    name: 'Ovo, de galinha, cozido',
    energy: 146,
    protein: 13.3,
    carbs: 0.6,
    fats: 9.5,
    source: 'TACO_4ed',
  },
  {
    id: '5',
    name: 'Maçã, com casca',
    energy: 56,
    protein: 0.3,
    carbs: 15.2,
    fats: 0,
    source: 'TACO_4ed',
  },
]

const calc = (val: number, port: string | number) => ((val / 100) * (Number(port) || 0)).toFixed(1)

export default function ProfPrescriptions() {
  const [search, setSearch] = useState('')
  const [targetMeal, setTargetMeal] = useState('cafe')
  const [meals, setMeals] = useState([
    { id: 'cafe', name: 'Café da Manhã', entries: [] as DietEntry[] },
    { id: 'almoco', name: 'Almoço', entries: [] as DietEntry[] },
    { id: 'lanche', name: 'Lanche da Tarde', entries: [] as DietEntry[] },
    { id: 'jantar', name: 'Jantar', entries: [] as DietEntry[] },
  ])

  const filteredFoods = useMemo(
    () => MOCK_FOODS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const addFood = (food: FoodItem) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === targetMeal
          ? {
              ...m,
              entries: [...m.entries, { ...food, entryId: Math.random().toString(), portion: 100 }],
            }
          : m,
      ),
    )
  }

  const updatePortion = (mId: string, eId: string, val: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mId
          ? {
              ...m,
              entries: m.entries.map((e) => (e.entryId === eId ? { ...e, portion: val } : e)),
            }
          : m,
      ),
    )
  }

  const removeFood = (mId: string, eId: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mId ? { ...m, entries: m.entries.filter((e) => e.entryId !== eId) } : m,
      ),
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Prescrição de Dieta" />
      <PageContent className="flex flex-col lg:h-[calc(100vh-4rem)] p-4 md:p-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          <Card className="w-full lg:w-[350px] flex flex-col shrink-0 h-[400px] lg:h-full border-muted/60 shadow-sm">
            <CardHeader className="p-4 border-b space-y-3">
              <CardTitle className="text-base font-semibold">Buscar Alimentos</CardTitle>
              <div className="flex flex-col gap-2">
                <Select value={targetMeal} onValueChange={setTargetMeal}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a refeição" />
                  </SelectTrigger>
                  <SelectContent>
                    {meals.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        Adicionar em: {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Ex: Arroz, Frango..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-3">
              <div className="flex flex-col gap-2">
                {filteredFoods.map((food) => (
                  <Card
                    key={food.id}
                    className="p-3 border-transparent bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer group"
                    onClick={() => addFood(food)}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                        {food.name}
                      </span>
                      <Badge variant="outline" className="text-[10px] bg-background">
                        {food.source}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground items-center">
                      <span>{food.energy} kcal / 100g</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {filteredFoods.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground mt-6">
                    Nenhum resultado encontrado.
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          <Card className="flex-1 flex flex-col h-[500px] lg:h-full border-muted/60 shadow-sm overflow-hidden">
            <CardHeader className="p-4 border-b bg-muted/10">
              <CardTitle className="text-base font-semibold">Plano Alimentar</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {meals.map((meal) => {
                  const mTotal = meal.entries.reduce(
                    (acc, e) => {
                      const p = Number(e.portion) || 0
                      return {
                        e: acc.e + (e.energy / 100) * p,
                        p: acc.p + (e.protein / 100) * p,
                        c: acc.c + (e.carbs / 100) * p,
                        f: acc.f + (e.fats / 100) * p,
                      }
                    },
                    { e: 0, p: 0, c: 0, f: 0 },
                  )

                  return (
                    <div key={meal.id} className="rounded-lg border overflow-hidden">
                      <div className="bg-muted/40 p-3 px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b gap-2">
                        <h3 className="font-semibold text-sm text-primary">{meal.name}</h3>
                        <div className="flex gap-3 text-xs font-medium text-muted-foreground">
                          <span className="text-foreground">{mTotal.e.toFixed(0)} kcal</span>
                          <span>P: {mTotal.p.toFixed(1)}g</span>
                          <span>C: {mTotal.c.toFixed(1)}g</span>
                          <span>G: {mTotal.f.toFixed(1)}g</span>
                        </div>
                      </div>
                      <div className="bg-background">
                        {meal.entries.length === 0 ? (
                          <div className="p-6 text-center text-xs text-muted-foreground">
                            Nenhum alimento adicionado a esta refeição.
                          </div>
                        ) : (
                          <div className="flex flex-col divide-y">
                            {meal.entries.map((entry) => (
                              <div
                                key={entry.entryId}
                                className="p-3 px-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-muted/10 transition-colors"
                              >
                                <div className="flex-1 text-sm font-medium">{entry.name}</div>
                                <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
                                  <div className="flex items-center gap-1.5">
                                    <Input
                                      type="number"
                                      className="w-20 h-8 text-right text-xs"
                                      value={entry.portion}
                                      onChange={(e) =>
                                        updatePortion(meal.id, entry.entryId, e.target.value)
                                      }
                                    />
                                    <span className="text-xs text-muted-foreground font-medium">
                                      g
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground min-w-[120px] justify-end">
                                    <span className="font-medium text-foreground">
                                      {calc(entry.energy, entry.portion)} kcal
                                    </span>
                                    <span>P: {calc(entry.protein, entry.portion)}g</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                                    onClick={() => removeFood(meal.id, entry.entryId)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
