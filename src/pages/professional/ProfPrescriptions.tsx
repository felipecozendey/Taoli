import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Trash2, Plus, Save, Loader2, Info, Pencil } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import {
  createDiet,
  addMeal,
  addMealItem,
  addCustomFoodItem,
  updateCustomFoodItem,
} from '@/services/nutrition'

interface FoodItem {
  id: string
  name: string
  energy_kcal: number | null
  protein_g: number | null
  carbs_g: number | null
  fats_g: number | null
  source: string | null
}

interface DietEntry extends FoodItem {
  entryId: string
  portion: string | number
}

const calc = (val: number | null | undefined, port: string | number) =>
  (((val || 0) / 100) * (Number(port) || 0)).toFixed(1)

export default function ProfPrescriptions() {
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const patientId = searchParams.get('patientId')

  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [targetMeal, setTargetMeal] = useState('cafe')
  const [isSaving, setIsSaving] = useState(false)

  // New Food Modal State
  const [isNewFoodModalOpen, setIsNewFoodModalOpen] = useState(false)
  const [isSavingFood, setIsSavingFood] = useState(false)
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null)
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  })

  const [meals, setMeals] = useState([
    { id: 'cafe', name: 'Café da Manhã', entries: [] as DietEntry[] },
    { id: 'almoco', name: 'Almoço', entries: [] as DietEntry[] },
    { id: 'lanche', name: 'Lanche da Tarde', entries: [] as DietEntry[] },
    { id: 'jantar', name: 'Jantar', entries: [] as DietEntry[] },
  ])

  useEffect(() => {
    const fetchFoods = async () => {
      if (!search.trim()) {
        setSearchResults([])
        return
      }
      setIsSearching(true)
      try {
        const { data, error } = await supabase
          .from('food_items')
          .select('*')
          .ilike('name', `%${search}%`)
          .limit(20)

        if (error) throw error
        setSearchResults(data as FoodItem[])
      } catch (err) {
        console.error('Error fetching foods:', err)
        toast({
          title: 'Erro na busca',
          description: 'Não foi possível buscar os alimentos.',
          variant: 'destructive',
        })
      } finally {
        setIsSearching(false)
      }
    }

    const debounce = setTimeout(fetchFoods, 300)
    return () => clearTimeout(debounce)
  }, [search, toast])

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

  const handleSaveDiet = async () => {
    if (!patientId) {
      toast({
        variant: 'destructive',
        description:
          'Erro: Selecione um paciente a partir da lista de pacientes antes de prescrever.',
      })
      return
    }

    setIsSaving(true)
    try {
      const { data: diet, error: dietError } = await createDiet(patientId, 'Plano Atualizado')
      if (dietError || !diet) throw new Error('Erro ao criar a prescrição da dieta.')

      const mealTimes = ['08:00', '12:30', '16:00', '20:00']

      for (let i = 0; i < meals.length; i++) {
        const meal = meals[i]

        if (meal.entries.length === 0) continue

        const { data: savedMeal, error: mealError } = await addMeal(
          diet.id,
          meal.name,
          mealTimes[i] || '00:00',
          i,
        )

        if (mealError || !savedMeal) throw new Error(`Erro ao salvar refeição: ${meal.name}`)

        for (const entry of meal.entries) {
          const portion = Number(entry.portion) || 0
          const { error: itemError } = await addMealItem(savedMeal.id, entry.id, portion, '')
          if (itemError) throw new Error(`Erro ao salvar alimento: ${entry.name}`)
        }
      }

      toast({
        title: 'Sucesso',
        description: 'Dieta guardada com sucesso!',
      })

      setMeals([
        { id: 'cafe', name: 'Café da Manhã', entries: [] },
        { id: 'almoco', name: 'Almoço', entries: [] },
        { id: 'lanche', name: 'Lanche da Tarde', entries: [] },
        { id: 'jantar', name: 'Jantar', entries: [] },
      ])
      setSearch('')

      navigate(`/professional/patient/${patientId}`)
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao salvar a prescrição.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNewFood = async () => {
    if (!newFood.name.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o nome do alimento.',
        variant: 'destructive',
      })
      return
    }

    setIsSavingFood(true)
    try {
      const foodPayload = {
        name: newFood.name,
        calories: parseFloat(newFood.calories) || 0,
        protein: parseFloat(newFood.protein) || 0,
        carbs: parseFloat(newFood.carbs) || 0,
        fat: parseFloat(newFood.fat) || 0,
        serving_size: '100',
      }

      if (editingFoodId) {
        const { error } = await updateCustomFoodItem(editingFoodId, foodPayload)
        if (error) throw error
        toast({
          title: 'Sucesso',
          description: 'Alimento atualizado com sucesso!',
        })
      } else {
        const { error } = await addCustomFoodItem(foodPayload)
        if (error) throw error
        toast({
          title: 'Sucesso',
          description: 'Alimento cadastrado com sucesso! Já está disponível para busca.',
        })
      }

      setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' })
      setEditingFoodId(null)
      setIsNewFoodModalOpen(false)

      if (search) {
        setSearch(search + ' ') // trigger slight change to re-fetch
        setTimeout(() => setSearch(search), 50)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: editingFoodId
          ? 'Não foi possível atualizar o alimento.'
          : 'Não foi possível cadastrar o alimento.',
        variant: 'destructive',
      })
    } finally {
      setIsSavingFood(false)
    }
  }

  const isDietEmpty = meals.every((m) => m.entries.length === 0)

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Prescrição de Dieta">
        <Button
          onClick={handleSaveDiet}
          disabled={isSaving || isDietEmpty}
          size="sm"
          className="hidden sm:flex"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Guardar Prescrição
        </Button>
      </DashboardHeader>
      <PageContent className="flex flex-col lg:h-[calc(100vh-4rem)] p-4 md:p-6 overflow-hidden">
        {patientId && (
          <Alert className="mb-4 bg-primary/5 text-primary border-primary/20">
            <Info className="h-4 w-4" />
            <AlertDescription className="font-medium ml-2">
              A prescrever dieta para o paciente selecionado
            </AlertDescription>
          </Alert>
        )}

        <div className="sm:hidden mb-4">
          <Button onClick={handleSaveDiet} disabled={isSaving || isDietEmpty} className="w-full">
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar Prescrição
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          <Card className="w-full lg:w-[350px] flex flex-col shrink-0 h-[400px] lg:h-full border-muted/60 shadow-sm">
            <CardHeader className="p-4 border-b space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Buscar Alimentos</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' })
                    setEditingFoodId(null)
                    setIsNewFoodModalOpen(true)
                  }}
                  className="h-8 text-xs px-2"
                >
                  <Plus className="mr-1 h-3 w-3" /> Cadastrar Alimento
                </Button>
              </div>
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
                {isSearching ? (
                  <div className="flex items-center justify-center p-6 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {searchResults.map((food) => (
                      <Card
                        key={food.id}
                        className="p-3 border-transparent bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer group"
                        onClick={() => addFood(food)}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                            {food.name}
                          </span>
                          {food.source && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-background ml-2 shrink-0"
                            >
                              {food.source}
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground items-center">
                          <span>{food.energy_kcal || 0} kcal / 100g</span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                setNewFood({
                                  name: food.name,
                                  calories: food.energy_kcal?.toString() || '',
                                  protein: food.protein_g?.toString() || '',
                                  carbs: food.carbs_g?.toString() || '',
                                  fat: food.fats_g?.toString() || '',
                                })
                                setEditingFoodId(food.id)
                                setIsNewFoodModalOpen(true)
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {search.trim() !== '' && searchResults.length === 0 && !isSearching && (
                      <div className="text-center text-sm text-muted-foreground mt-6">
                        Nenhum resultado encontrado.
                      </div>
                    )}
                    {search.trim() === '' && (
                      <div className="text-center text-sm text-muted-foreground mt-6">
                        Digite para buscar alimentos na base.
                      </div>
                    )}
                  </>
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
                        e: acc.e + ((e.energy_kcal || 0) / 100) * p,
                        p: acc.p + ((e.protein_g || 0) / 100) * p,
                        c: acc.c + ((e.carbs_g || 0) / 100) * p,
                        f: acc.f + ((e.fats_g || 0) / 100) * p,
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
                                      {calc(entry.energy_kcal, entry.portion)} kcal
                                    </span>
                                    <span>P: {calc(entry.protein_g, entry.portion)}g</span>
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

      <Dialog open={isNewFoodModalOpen} onOpenChange={setIsNewFoodModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingFoodId ? 'Editar Alimento' : 'Cadastrar Novo Alimento'}
            </DialogTitle>
            <DialogDescription>
              Insira os valores nutricionais equivalentes a 100g do alimento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Alimento</Label>
              <Input
                id="name"
                placeholder="Ex: Arroz Integral Cozido"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="calories">Calorias (kcal)</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="0"
                  value={newFood.calories}
                  onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="protein">Proteínas (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="0"
                  value={newFood.protein}
                  onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="carbs">Carboidratos (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="0"
                  value={newFood.carbs}
                  onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fat">Gorduras (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  placeholder="0"
                  value={newFood.fat}
                  onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsNewFoodModalOpen(false)
                setEditingFoodId(null)
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveNewFood} disabled={isSavingFood}>
              {isSavingFood && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingFoodId ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
