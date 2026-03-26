import { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Search, Plus, Apple, Activity, UtensilsCrossed, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { searchFoodItems, saveDiet } from '@/services/nutrition'
import { useToast } from '@/hooks/use-toast'

interface FoodItem {
  id: string
  name: string
  energy_kcal: number | null
  protein_g: number | null
  carbs_g: number | null
  fats_g: number | null
  base_qty_g: number | null
  source?: string | null
}

interface MealItem {
  id: string
  food: FoodItem
  amount_grams: number
  notes?: string
}

interface Meal {
  id: string
  name: string
  time: string
  items: MealItem[]
}

interface DietPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  clientId?: string
}

export function DietPrescriptionModal({ isOpen, onClose, clientId }: DietPrescriptionModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()

  const [isSaving, setIsSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Café da Manhã', time: '08:00', items: [] },
    { id: '2', name: 'Almoço', time: '12:00', items: [] },
    { id: '3', name: 'Lanche da Tarde', time: '16:00', items: [] },
    { id: '4', name: 'Jantar', time: '20:00', items: [] },
  ])

  const [activeMealId, setActiveMealId] = useState('1')

  // Debounced Search Effect
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      const { data } = await searchFoodItems(searchQuery)
      if (data) {
        setSearchResults(data as FoodItem[])
      }
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Macro Calculation
  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => {
        meal.items.forEach((item) => {
          const ratio = item.amount_grams / (item.food.base_qty_g || 100)
          acc.calories += Number(item.food.energy_kcal || 0) * ratio
          acc.protein += Number(item.food.protein_g || 0) * ratio
          acc.carbs += Number(item.food.carbs_g || 0) * ratio
          acc.fats += Number(item.food.fats_g || 0) * ratio
        })
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    )
  }, [meals])

  const activeMeal = meals.find((m) => m.id === activeMealId)

  // Actions
  const handleAddFood = (food: FoodItem) => {
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id === activeMealId) {
          return {
            ...m,
            items: [
              ...m.items,
              { id: Math.random().toString(36).substring(7), food, amount_grams: 100 },
            ],
          }
        }
        return m
      }),
    )
    setSearchQuery('')
    setSearchResults([])
  }

  const handleUpdateGrams = (mealId: string, itemId: string, grams: number) => {
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id === mealId) {
          return {
            ...m,
            items: m.items.map((item) =>
              item.id === itemId ? { ...item, amount_grams: grams } : item,
            ),
          }
        }
        return m
      }),
    )
  }

  const handleRemoveItem = (mealId: string, itemId: string) => {
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id === mealId) {
          return {
            ...m,
            items: m.items.filter((item) => item.id !== itemId),
          }
        }
        return m
      }),
    )
  }

  const handleSaveDiet = async () => {
    if (!user?.id || !clientId) {
      toast({
        title: 'Erro',
        description: 'Usuário ou cliente não identificado.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    try {
      const { error } = await saveDiet(clientId, user.id, 'Prescrição Personalizada', meals)
      if (error) throw error

      toast({ title: 'Sucesso', description: 'Dieta salva e aplicada ao paciente!' })
      onClose()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a dieta.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden flex flex-col sm:rounded-xl">
        <DialogHeader className="p-4 border-b bg-background z-10 shadow-sm shrink-0 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Prescrição Dietética
            </DialogTitle>
            <DialogDescription>
              Monte o plano alimentar buscando alimentos e ajustando as porções para obter os macros
              ideais.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden bg-background">
          {/* Left Sidebar: Meals */}
          <div className="w-64 border-r bg-muted/5 flex flex-col shrink-0">
            <div className="p-4 border-b">
              <Button
                className="w-full justify-start text-primary border-primary/20 hover:bg-primary/10"
                variant="outline"
                onClick={() => {
                  const id = Math.random().toString(36).substring(7)
                  setMeals([
                    ...meals,
                    { id, name: `Refeição ${meals.length + 1}`, time: '12:00', items: [] },
                  ])
                  setActiveMealId(id)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Refeição
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setActiveMealId(meal.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    activeMealId === meal.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <span>{meal.name}</span>
                  <span className="text-xs opacity-70 font-normal">{meal.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel: Foods */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Search Input Area */}
            <div className="p-4 border-b bg-background shrink-0 relative">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar alimento (TACO, IBGE...)"
                  className="pl-9 h-10 bg-muted/50 focus-visible:bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-[calc(100%-8px)] left-4 right-4 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
                  {searchResults.map((food) => (
                    <button
                      key={food.id}
                      className="w-full text-left px-4 py-3 hover:bg-muted border-b last:border-0 flex justify-between items-center transition-colors"
                      onClick={() => handleAddFood(food)}
                    >
                      <div>
                        <div className="font-medium text-sm text-foreground">{food.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {food.energy_kcal} kcal | P: {food.protein_g}g | C: {food.carbs_g}g | G:{' '}
                          {food.fats_g}g em {food.base_qty_g}g
                        </div>
                      </div>
                      <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                        <Plus className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Meal Items List */}
            <div className="flex-1 overflow-y-auto bg-muted/10 p-6">
              {activeMeal?.items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-sm">
                    <div className="mx-auto w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm border border-border/50">
                      <UtensilsCrossed className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-base font-medium mb-1 text-foreground">
                      Nenhum alimento adicionado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nenhum alimento adicionado ao {activeMeal.name}. Busque acima para começar a
                      montar esta refeição.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeMeal?.items.map((item) => {
                    const ratio = item.amount_grams / (item.food.base_qty_g || 100)
                    const kcal = (Number(item.food.energy_kcal || 0) * ratio).toFixed(1)
                    const prot = (Number(item.food.protein_g || 0) * ratio).toFixed(1)
                    const carb = (Number(item.food.carbs_g || 0) * ratio).toFixed(1)
                    const fat = (Number(item.food.fats_g || 0) * ratio).toFixed(1)

                    return (
                      <div
                        key={item.id}
                        className="bg-background border rounded-lg p-4 flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-sm truncate text-foreground"
                            title={item.food.name}
                          >
                            {item.food.name}
                          </h4>
                          <div className="text-xs text-muted-foreground mt-1 flex gap-3 font-medium">
                            <span className="text-blue-500/80">🔥 {kcal} kcal</span>
                            <span className="text-red-500/80">🥩 {prot}g P</span>
                            <span className="text-emerald-500/80">🍞 {carb}g C</span>
                            <span className="text-yellow-600/80">🥑 {fat}g G</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={item.amount_grams || ''}
                              onChange={(e) =>
                                handleUpdateGrams(activeMeal.id, item.id, Number(e.target.value))
                              }
                              className="w-20 h-9 text-right font-medium"
                              min="0"
                            />
                            <span className="text-sm font-medium text-muted-foreground">g</span>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(activeMeal.id, item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Macros */}
          <div className="w-80 bg-muted/10 border-l flex flex-col p-6 shrink-0 z-10">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-foreground">
              <Activity className="h-5 w-5 text-primary" />
              Resumo da Dieta
            </h3>

            <div className="space-y-6 flex-1">
              {/* Calorias */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Calorias</span>
                  <span className="text-muted-foreground font-semibold">
                    {Math.round(totals.calories)}{' '}
                    <span className="text-xs font-normal">/ 2000 kcal</span>
                  </span>
                </div>
                <Progress
                  value={Math.min((totals.calories / 2000) * 100, 100)}
                  className="h-2.5 bg-blue-100 dark:bg-blue-950/50"
                  indicatorClassName="bg-blue-500 transition-all duration-500 ease-out"
                />
              </div>

              {/* Proteínas */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Proteínas</span>
                  <span className="text-muted-foreground font-semibold">
                    {Math.round(totals.protein)}
                    <span className="text-xs font-normal">g</span>
                  </span>
                </div>
                <Progress
                  value={Math.min((totals.protein / 150) * 100, 100)}
                  className="h-2.5 bg-red-100 dark:bg-red-950/50"
                  indicatorClassName="bg-red-500 transition-all duration-500 ease-out"
                />
              </div>

              {/* Carboidratos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Carboidratos</span>
                  <span className="text-muted-foreground font-semibold">
                    {Math.round(totals.carbs)}
                    <span className="text-xs font-normal">g</span>
                  </span>
                </div>
                <Progress
                  value={Math.min((totals.carbs / 250) * 100, 100)}
                  className="h-2.5 bg-green-100 dark:bg-emerald-950/50"
                  indicatorClassName="bg-emerald-500 transition-all duration-500 ease-out"
                />
              </div>

              {/* Gorduras */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Gorduras</span>
                  <span className="text-muted-foreground font-semibold">
                    {Math.round(totals.fats)}
                    <span className="text-xs font-normal">g</span>
                  </span>
                </div>
                <Progress
                  value={Math.min((totals.fats / 80) * 100, 100)}
                  className="h-2.5 bg-yellow-100 dark:bg-yellow-950/50"
                  indicatorClassName="bg-yellow-500 transition-all duration-500 ease-out"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white shadow-md transition-all active:scale-[0.98]"
              onClick={handleSaveDiet}
              disabled={isSaving || totals.calories === 0}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Dieta'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
