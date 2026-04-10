import { useState } from 'react'
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
import { Utensils } from 'lucide-react'
import { addExtraMealToDay } from '@/services/nutrition'
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
  const [mealName, setMealName] = useState('')
  const [amountGrams, setAmountGrams] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setMealName('')
      setAmountGrams('')
      setCalories('')
      setProtein('')
      setCarbs('')
      setFat('')
    }
  }

  const submitExtraMeal = async () => {
    if (!mealName || !amountGrams) {
      toast({ title: 'Preencha o nome e a quantidade', variant: 'destructive' })
      return
    }
    if (!targetId) return

    setIsSubmitting(true)
    try {
      await addExtraMealToDay(targetId, date, {
        name: mealName,
        amount_grams: Number(amountGrams),
        calories: Number(calories) || 0,
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,
      })

      toast({ title: 'Refeição extra registrada com sucesso!' })
      setIsOpen(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro ao registar refeição extra', variant: 'destructive' })
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
          <DialogTitle>Registrar Refeição Extra</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="mealName">Nome da Refeição/Alimento</Label>
            <Input
              id="mealName"
              placeholder="Ex: Pedaço de Bolo"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amountGrams">Quantidade (g)</Label>
            <Input
              id="amountGrams"
              type="number"
              placeholder="Ex: 150"
              value={amountGrams}
              onChange={(e) => setAmountGrams(e.target.value)}
            />
          </div>

          <div className="pt-2 border-t mt-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block">
              Calorias/Macros (Opcional)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="calories" className="text-xs">
                  Calorias (kcal)
                </Label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="protein" className="text-xs">
                  Proteína (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="carbs" className="text-xs">
                  Carboidratos (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fat" className="text-xs">
                  Gorduras (g)
                </Label>
                <Input
                  id="fat"
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={submitExtraMeal}
            className="w-full mt-4"
            disabled={!mealName || !amountGrams || isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Gravar Refeição'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
