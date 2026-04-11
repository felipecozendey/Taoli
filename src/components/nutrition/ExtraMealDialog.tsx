import { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Utensils, Search, Check, X, Flame, Droplet } from 'lucide-react'
import { searchFoodItems, addExtraMealToDay } from '@/services/nutrition'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'

interface ExtraMealDialogProps {
  date: string
  onSuccess: () => void
  patientId?: string
}

export function ExtraMealDialog({ date, onSuccess, patientId }: ExtraMealDialogProps) {
  const { user, impersonatedUser } = useAuth()
  const activeUser = impersonatedUser || user
  const targetId = patientId || activeUser?.id

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedFood, setSelectedFood] = useState<any | null>(null)
  const [amountGrams, setAmountGrams] = useState<number | ''>(100)
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearchQuery('')
      setSearchResults([])
      setSelectedFood(null)
      setAmountGrams(100)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true)
        try {
          const results = await searchFoodItems(searchQuery)
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
  }, [searchQuery])

  const calculatedMacros = useMemo(() => {
    if (!selectedFood || !amountGrams) return null
    const numAmount = Number(amountGrams)
    if (isNaN(numAmount)) return null

    const cal = Number(selectedFood.energy_kcal || selectedFood.base_calories) || 0
    const prot = Number(selectedFood.protein_g || selectedFood.base_protein) || 0
    const carb = Number(selectedFood.carbs_g || selectedFood.base_carbs) || 0
    const fat = Number(selectedFood.fats_g || selectedFood.base_fats) || 0

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
      }

      await addExtraMealToDay(targetId, date, extraMealData)
      toast({ title: 'Refeição extra registada!' })
      handleOpenChange(false)
      onSuccess()
    } catch (err) {
      toast({ title: 'Erro ao registar refeição', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Card className="border-dashed border-2 bg-transparent hover:bg-muted/50 transition-colors cursor-pointer shadow-sm">
          <CardContent className="p-5 flex items-center justify-center gap-3 h-full">
            <div className="p-2 bg-muted rounded-full">
              <Utensils className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="font-medium text-muted-foreground">Refeição Extra</span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registar Refeição Extra</DialogTitle>
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
                        onClick={() => setSelectedFood(item)}
                        className="flex flex-col items-start p-2 text-left hover:bg-muted rounded-sm transition-colors"
                      >
                        <span className="font-medium text-sm flex items-center gap-2">
                          <Check className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground pl-5">
                          {item.energy_kcal || item.base_calories || 0} kcal / 100g
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Nenhum resultado.
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground text-center px-4">
                    Digite 3 letras para pesquisar.
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
                <Label htmlFor="amountGrams">Quantidade (g)</Label>
                <Input
                  id="amountGrams"
                  type="number"
                  placeholder="150"
                  value={amountGrams}
                  onChange={(e) => setAmountGrams(e.target.value ? Number(e.target.value) : '')}
                  className="text-lg"
                />
              </div>
              {calculatedMacros && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-2 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 p-2 rounded-md">
                    <Flame className="h-4 w-4" />
                    <span className="font-semibold text-sm">{calculatedMacros.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 p-2 rounded-md">
                    <div className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                      P
                    </div>
                    <span className="font-semibold text-sm">{calculatedMacros.protein}g Prot</span>
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
              )}
              <Button
                onClick={handleSave}
                className="w-full mt-4"
                disabled={!amountGrams || isSubmitting}
              >
                {isSubmitting ? 'A salvar...' : 'Adicionar ao Diário'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
