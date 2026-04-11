import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Check, X, Flame, Droplet, AlertTriangle } from 'lucide-react'
import {
  searchFoodAndRecipes,
  addExtraMealToDay,
  updateExtraMealInDay,
  getFavoriteFoods,
} from '@/services/nutrition'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'

interface ExtraMealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: string
  onSuccess: () => void
  patientId?: string
  editMeal?: any
  consumedToday?: number
  caloricGoal?: number
}

export function ExtraMealDialog({
  open,
  onOpenChange,
  date,
  onSuccess,
  patientId,
  editMeal,
  consumedToday = 0,
  caloricGoal = 2000,
}: ExtraMealDialogProps) {
  const { user, impersonatedUser } = useAuth()
  const activeUser = impersonatedUser || user
  const targetId = patientId || activeUser?.id

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedFood, setSelectedFood] = useState<any | null>(null)
  const [amountGrams, setAmountGrams] = useState<number | ''>(100)
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [favorites, setFavorites] = useState<any[]>([])

  const { toast } = useToast()

  useEffect(() => {
    if (open && targetId) {
      getFavoriteFoods(targetId)
        .then((data) => setFavorites(data))
        .catch(console.error)
    }
  }, [open, targetId])

  useEffect(() => {
    if (open) {
      if (editMeal) {
        const isRecipe = editMeal.is_recipe || false
        const multiplier = isRecipe
          ? editMeal.amount_grams > 0
            ? editMeal.amount_grams
            : 1
          : editMeal.amount_grams > 0
            ? editMeal.amount_grams / 100
            : 1

        setSelectedFood({
          id: editMeal.food_item_id,
          name: editMeal.name,
          energy_kcal: editMeal.calories / multiplier,
          protein_g: editMeal.protein / multiplier,
          carbs_g: editMeal.carbs / multiplier,
          fats_g: (editMeal.fats || editMeal.fat || 0) / multiplier,
          is_recipe: isRecipe,
        })
        setAmountGrams(editMeal.amount_grams)
      } else {
        setSearchQuery('')
        setSearchResults([])
        setSelectedFood(null)
        setAmountGrams(100)
      }
    }
  }, [open, editMeal])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true)
        try {
          const results = await searchFoodAndRecipes(searchQuery, targetId || '')
          setSearchResults(results || [])
        } catch (error) {
          console.error(error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, targetId])

  const calculatedMacros = useMemo(() => {
    if (!selectedFood || !amountGrams) return null
    const numAmount = Number(amountGrams)
    if (isNaN(numAmount)) return null

    const cal = Number(selectedFood.energy_kcal || selectedFood.base_calories) || 0
    const prot = Number(selectedFood.protein_g || selectedFood.base_protein) || 0
    const carb = Number(selectedFood.carbs_g || selectedFood.base_carbs) || 0
    const fat = Number(selectedFood.fats_g || selectedFood.base_fats) || 0

    if (selectedFood.is_recipe) {
      return {
        calories: Math.round(cal * numAmount),
        protein: Math.round(prot * numAmount),
        carbs: Math.round(carb * numAmount),
        fats: Math.round(fat * numAmount),
      }
    }

    const multiplier = numAmount / 100

    return {
      calories: Math.round(cal * multiplier),
      protein: Math.round(prot * multiplier),
      carbs: Math.round(carb * multiplier),
      fats: Math.round(fat * multiplier),
    }
  }, [selectedFood, amountGrams])

  const handleSave = async () => {
    if (!selectedFood || !amountGrams || !calculatedMacros) return
    if (!targetId) return

    setIsSubmitting(true)
    try {
      const extraMealData = {
        name: selectedFood.name,
        food_item_id: selectedFood.id,
        amount_grams: Number(amountGrams),
        calories: calculatedMacros.calories,
        protein: calculatedMacros.protein,
        carbs: calculatedMacros.carbs,
        fats: calculatedMacros.fats,
        is_recipe: selectedFood.is_recipe || false,
      }

      if (editMeal) {
        await updateExtraMealInDay(targetId, date, {
          ...extraMealData,
          id: editMeal.id,
          added_at: editMeal.added_at,
        })
        toast({ title: 'Refeição extra atualizada!' })
      } else {
        await addExtraMealToDay(targetId, date, extraMealData)
        toast({ title: 'Refeição extra registada!' })
      }

      onOpenChange(false)
      onSuccess()
    } catch (err) {
      toast({ title: 'Erro ao guardar refeição', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editMeal ? 'Editar Refeição Extra' : 'Registar Refeição Extra'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!selectedFood ? (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar alimento..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                {isSearching ? (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    A procurar...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedFood(item)
                          setAmountGrams(item.is_recipe ? 1 : 100)
                        }}
                        className="flex flex-col items-start p-2 text-left hover:bg-muted rounded-sm transition-colors group"
                      >
                        <span className="font-medium text-sm flex items-center gap-2">
                          <Check className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground pl-5">
                          {item.energy_kcal || item.base_calories || 0} kcal{' '}
                          {item.is_recipe ? '/ porção' : '/ 100g'}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Nenhum resultado.
                  </div>
                ) : (
                  <div className="flex flex-col h-full items-center justify-center text-sm text-muted-foreground text-center px-4 py-4">
                    Digite 3 letras para pesquisar.
                    {favorites.length > 0 && searchQuery.length === 0 && (
                      <div className="mt-6 w-full text-left">
                        <Label className="text-muted-foreground mb-3 block text-[10px] font-semibold uppercase tracking-wider">
                          Utilizados Frequentemente
                        </Label>
                        <div className="flex flex-col gap-2">
                          {favorites.map((fav) => (
                            <Button
                              key={fav.food_item_id}
                              variant="secondary"
                              size="sm"
                              className="justify-start font-normal h-auto py-2 px-3"
                              onClick={() => {
                                setSelectedFood({
                                  id: fav.food_item_id,
                                  name: fav.name,
                                  energy_kcal: fav.base_calories,
                                  protein_g: fav.base_protein,
                                  carbs_g: fav.base_carbs,
                                  fats_g: fav.base_fats,
                                  is_recipe: false,
                                })
                                setAmountGrams(100)
                              }}
                            >
                              {fav.name}
                              <span className="ml-auto text-xs text-muted-foreground">
                                {Math.round(fav.base_calories || 0)} kcal
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                <span className="font-medium truncate pr-2">{selectedFood.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs shrink-0 flex items-center gap-1"
                  onClick={() => setSelectedFood(null)}
                >
                  <X className="h-3 w-3" /> Trocar
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amountGrams">
                  {selectedFood.is_recipe ? 'Porções da Receita' : 'Quantidade (g)'}
                </Label>
                <Input
                  id="amountGrams"
                  type="number"
                  step={selectedFood.is_recipe ? '0.1' : '1'}
                  placeholder={selectedFood.is_recipe ? '1' : '150'}
                  value={amountGrams}
                  onChange={(e) => setAmountGrams(e.target.value ? Number(e.target.value) : '')}
                  className="text-lg"
                />
              </div>
              {calculatedMacros && (
                <div className="flex flex-col gap-3 mt-2">
                  {(consumedToday || 0) + calculatedMacros.calories > (caloricGoal || 2000) && (
                    <Alert
                      variant="destructive"
                      className="bg-destructive/10 border-destructive/20 text-destructive"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs font-medium">
                        ⚠️ Esta refeição fará com que ultrapasse a sua meta diária de {caloricGoal}{' '}
                        kcal!
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 p-2 rounded-md">
                      <Flame className="h-4 w-4" />
                      <span className="font-semibold text-sm">
                        {calculatedMacros.calories} kcal
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 p-2 rounded-md">
                      <div className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                        P
                      </div>
                      <span className="font-semibold text-sm">
                        {calculatedMacros.protein}g Prot
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 p-2 rounded-md">
                      <Droplet className="h-4 w-4" />
                      <span className="font-semibold text-sm">{calculatedMacros.carbs}g Carb</span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400 p-2 rounded-md">
                      <div className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                        G
                      </div>
                      <span className="font-semibold text-sm">{calculatedMacros.fats}g Gord</span>
                    </div>
                  </div>
                </div>
              )}
              <Button
                onClick={handleSave}
                className="w-full mt-4"
                disabled={!amountGrams || isSubmitting}
              >
                {isSubmitting
                  ? 'A guardar...'
                  : editMeal
                    ? 'Guardar Alterações'
                    : 'Adicionar ao Diário'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
