import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, ChefHat, Trash2 } from 'lucide-react'
import { searchFoodAndRecipes, saveRecipe } from '@/services/nutrition'
import { useToast } from '@/hooks/use-toast'

interface RecipeBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  professionalId: string
}

export function RecipeBuilderModal({ isOpen, onClose, professionalId }: RecipeBuilderModalProps) {
  const [name, setName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState<any[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setInstructions('')
      setIngredients([])
      setSearchQuery('')
      setSearchResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true)
        try {
          const results = await searchFoodAndRecipes(searchQuery, '')
          setSearchResults(results.filter((r) => !r.is_recipe) || [])
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
  }, [searchQuery])

  const addIngredient = (food: any) => {
    setIngredients((prev) => [...prev, { id: crypto.randomUUID(), food, amount_grams: 100 }])
    setSearchQuery('')
    setSearchResults([])
  }

  const updateIngredientAmount = (id: string, amount: number) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, amount_grams: amount } : ing)),
    )
  }

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id))
  }

  const totals = useMemo(() => {
    return ingredients.reduce(
      (acc, ing) => {
        const multiplier = (ing.amount_grams || 0) / 100
        acc.calories += Number(ing.food.energy_kcal || 0) * multiplier
        acc.protein += Number(ing.food.protein_g || 0) * multiplier
        acc.carbs += Number(ing.food.carbs_g || 0) * multiplier
        acc.fats += Number(ing.food.fats_g || 0) * multiplier
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    )
  }, [ingredients])

  const handleSave = async () => {
    if (!name || ingredients.length === 0) return
    setIsSubmitting(true)
    try {
      await saveRecipe(
        professionalId,
        {
          name,
          instructions,
          calories: Math.round(totals.calories),
          protein: Math.round(totals.protein),
          carbs: Math.round(totals.carbs),
          fats: Math.round(totals.fats),
        },
        ingredients,
      )

      toast({ title: 'Receita guardada com sucesso!' })
      onClose()
    } catch (error) {
      toast({ title: 'Erro ao guardar receita', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            Nova Receita
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-1 -mx-1">
          <div className="space-y-6 pb-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Nome da Receita</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Panqueca de Aveia"
                />
              </div>
              <div className="grid gap-2">
                <Label>Modo de Preparo</Label>
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Instruções de preparo..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Ingredientes</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar alimento para adicionar..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchQuery.length > 2 && (
                <div className="border rounded-md p-2 bg-muted/30 max-h-[150px] overflow-y-auto">
                  {isSearching ? (
                    <div className="text-center text-sm text-muted-foreground p-2">
                      A procurar...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {searchResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addIngredient(item)}
                          className="flex flex-col items-start p-2 text-left hover:bg-muted rounded-sm transition-colors"
                        >
                          <span className="font-medium text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.energy_kcal || 0} kcal / 100g
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground p-2">
                      Nenhum resultado encontrado.
                    </div>
                  )}
                </div>
              )}

              {ingredients.length > 0 && (
                <div className="space-y-2 border rounded-md p-3">
                  {ingredients.map((ing) => (
                    <div
                      key={ing.id}
                      className="flex items-center gap-2 bg-background p-2 rounded-md border text-sm"
                    >
                      <span className="flex-1 truncate font-medium">{ing.food.name}</span>
                      <Input
                        type="number"
                        value={ing.amount_grams || ''}
                        onChange={(e) => updateIngredientAmount(ing.id, Number(e.target.value))}
                        className="w-20 h-8"
                      />
                      <span className="text-xs text-muted-foreground">g</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive shrink-0"
                        onClick={() => removeIngredient(ing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center bg-muted/50 p-3 rounded-md gap-3">
                    <span className="font-semibold text-sm">Total da Receita:</span>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="text-orange-600 font-medium">
                        {Math.round(totals.calories)} kcal
                      </span>
                      <span className="text-red-600">{Math.round(totals.protein)}g Prot</span>
                      <span className="text-blue-600">{Math.round(totals.carbs)}g Carb</span>
                      <span className="text-yellow-600">{Math.round(totals.fats)}g Gord</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="pt-4 border-t mt-auto">
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={!name || ingredients.length === 0 || isSubmitting}
          >
            {isSubmitting ? 'A guardar...' : 'Salvar Receita'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
