import { useState, useEffect } from 'react'
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
import { Utensils, Trash2 } from 'lucide-react'
import { searchFoodItems, addFoodLog } from '@/services/nutrition'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

interface ExtraMealDialogProps {
  date: string
  onSuccess: () => void
}

export function ExtraMealDialog({ date, onSuccess }: ExtraMealDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mealName, setMealName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedFoods, setSelectedFoods] = useState<{ food: any; quantity: number }[]>([])

  const { toast } = useToast()

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchQuery.length > 2) {
        const { data } = await searchFoodItems(searchQuery)
        setSearchResults(data || [])
      } else {
        setSearchResults([])
      }
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setMealName('')
      setSearchQuery('')
      setSearchResults([])
      setSelectedFoods([])
    }
  }

  const handleSelectFood = (food: any) => {
    setSelectedFoods([...selectedFoods, { food, quantity: 100 }])
    setSearchQuery('')
    setSearchResults([])
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const newFoods = [...selectedFoods]
    newFoods[index].quantity = quantity
    setSelectedFoods(newFoods)
  }

  const handleRemoveFood = (index: number) => {
    const newFoods = [...selectedFoods]
    newFoods.splice(index, 1)
    setSelectedFoods(newFoods)
  }

  const totals = selectedFoods.reduce(
    (acc, item) => {
      const qty = Number(item.quantity || 0)
      const baseQty = Number(item.food.base_qty_g || 100)

      return {
        cal: acc.cal + (Number(item.food.energy_kcal || 0) / baseQty) * qty,
        pro: acc.pro + (Number(item.food.protein_g || 0) / baseQty) * qty,
        car: acc.car + (Number(item.food.carbs_g || 0) / baseQty) * qty,
        fat: acc.fat + (Number(item.food.fats_g || 0) / baseQty) * qty,
      }
    },
    { cal: 0, pro: 0, car: 0, fat: 0 },
  )

  const submitExtraMeal = async () => {
    if (!mealName) {
      toast({ title: 'Preencha o nome da refeição', variant: 'destructive' })
      return
    }
    if (selectedFoods.length === 0) {
      toast({ title: 'Adicione pelo menos um alimento', variant: 'destructive' })
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    await addFoodLog(user.id, date, {
      food_name: mealName,
      calories: Math.round(totals.cal),
      protein: Math.round(totals.pro),
      carbs: Math.round(totals.car),
      fat: Math.round(totals.fat),
    })

    toast({ title: 'Refeição extra registrada com sucesso!' })
    setIsOpen(false)
    setMealName('')
    setSelectedFoods([])
    setSearchQuery('')
    onSuccess()
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Refeição Extra</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="mealName">Nome da Refeição</Label>
            <Input
              id="mealName"
              placeholder="Ex: Lanche da Tarde"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="searchFood">Buscar Alimentos</Label>
            <Input
              id="searchFood"
              autoComplete="off"
              placeholder="Pesquisar alimento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((food) => (
                  <button
                    key={food.id}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted focus:bg-muted focus:outline-none transition-colors border-b last:border-b-0"
                    onClick={() => handleSelectFood(food)}
                  >
                    <p className="font-medium text-foreground">{food.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {food.energy_kcal} kcal / {food.base_qty_g || 100}g
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedFoods.length > 0 && (
            <ScrollArea className="max-h-[250px] border rounded-md p-2">
              <div className="space-y-2">
                {selectedFoods.map((item, index) => {
                  const qty = Number(item.quantity || 0)
                  const baseQty = Number(item.food.base_qty_g || 100)
                  const itemCals = Math.round((Number(item.food.energy_kcal || 0) / baseQty) * qty)

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-md"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{item.food.name}</p>
                        <p className="text-xs text-muted-foreground">{itemCals} kcal</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={item.quantity === 0 ? '' : item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, parseFloat(e.target.value) || 0)
                            }
                            className="w-16 h-8 px-2 text-right"
                          />
                          <span className="text-sm text-muted-foreground">g</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleRemoveFood(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}

          {selectedFoods.length > 0 && (
            <div className="grid grid-cols-4 gap-2 pt-4 border-t text-center">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Kcal</p>
                <p className="font-bold">{Math.round(totals.cal)}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Prot(g)</p>
                <p className="font-bold">{Math.round(totals.pro)}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Carb(g)</p>
                <p className="font-bold">{Math.round(totals.car)}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Gord(g)</p>
                <p className="font-bold">{Math.round(totals.fat)}</p>
              </div>
            </div>
          )}

          <Button
            onClick={submitExtraMeal}
            className="w-full mt-2"
            disabled={selectedFoods.length === 0}
          >
            Gravar Refeição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
