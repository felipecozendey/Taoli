import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Trash2, Search } from 'lucide-react'
import { getExercises, createPlan, addPlanItem, type PlanItemDetails } from '@/services/training'
import { useToast } from '@/hooks/use-toast'

interface Exercise {
  id: string
  name: string
  muscle_group: string
  category: string
}

interface SelectedExercise extends PlanItemDetails {
  exercise: Exercise
  tempId: string
}

interface TrainingBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string
  professionalId?: string | null
  onSuccess?: () => void
  initialData?: {
    name: string
    plan_type: string
    items: SelectedExercise[]
  } | null
}

export function TrainingBuilderModal({
  isOpen,
  onClose,
  clientId,
  professionalId,
  onSuccess,
  initialData,
}: TrainingBuilderModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [planType, setPlanType] = useState<'workout' | 'rehabilitation'>('workout')
  const [items, setItems] = useState<SelectedExercise[]>([])

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name)
        setPlanType(initialData.plan_type as 'workout' | 'rehabilitation')
        setItems(initialData.items || [])
      } else {
        setName('')
        setPlanType('workout')
        setItems([])
      }
      loadExercises()
    }
  }, [isOpen, initialData])

  const loadExercises = async () => {
    try {
      const data = await getExercises()
      setExercises(data || [])
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddExercise = (exercise: Exercise) => {
    const newItem: SelectedExercise = {
      tempId: Math.random().toString(36).substr(2, 9),
      exercise,
      sets: 3,
      reps: '10',
      rest_seconds: 60,
      target_load_kg: undefined,
      order_index: items.length,
    }
    setItems([...items, newItem])
    setIsSearching(false)
    setSearch('')
  }

  const handleRemoveItem = (tempId: string) => {
    setItems(items.filter((i) => i.tempId !== tempId))
  }

  const handleUpdateItem = (tempId: string, field: keyof SelectedExercise, value: any) => {
    setItems(items.map((i) => (i.tempId === tempId ? { ...i, [field]: value } : i)))
  }

  const handleSave = async () => {
    if (!name.trim() || items.length === 0) {
      toast({ title: 'Preencha o nome e adicione exercícios.', variant: 'destructive' })
      return
    }

    try {
      setLoading(true)
      const plan = await createPlan(clientId, name, planType, professionalId)

      if (plan) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          await addPlanItem(plan.id, item.exercise.id, {
            sets: item.sets,
            reps: item.reps,
            rest_seconds: item.rest_seconds,
            target_load_kg: item.target_load_kg,
            frequency: item.frequency,
            pain_limit_eva: item.pain_limit_eva,
            order_index: i,
          })
        }
      }

      toast({ title: 'Plano salvo com sucesso!' })
      onSuccess?.()
      onClose()
    } catch (e: any) {
      toast({ title: 'Erro ao salvar', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const filteredExercises = exercises.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.muscle_group.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Duplicar Treino' : 'Montar Treino'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Ajuste os detalhes do treino duplicado.'
              : 'Crie uma nova rotina de exercícios.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Treino</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Treino A - Peito e Tríceps"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={planType}
                onValueChange={(v: 'workout' | 'rehabilitation') => setPlanType(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workout">Treino de Força</SelectItem>
                  <SelectItem value="rehabilitation">Reabilitação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold">Exercícios ({items.length})</Label>
              <Button size="sm" variant="outline" onClick={() => setIsSearching(!isSearching)}>
                <Plus className="w-4 h-4 mr-2" /> Adicionar Exercício
              </Button>
            </div>

            {isSearching && (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar exercício por nome ou grupo muscular..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <ScrollArea className="h-[200px] border rounded-md bg-background">
                  {filteredExercises.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      Nenhum exercício encontrado.
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {filteredExercises.map((ex) => (
                        <div
                          key={ex.id}
                          className="flex items-center justify-between p-2 hover:bg-muted rounded-md group cursor-pointer"
                          onClick={() => handleAddExercise(ex)}
                        >
                          <div>
                            <p className="font-medium text-sm">{ex.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {ex.muscle_group} • {ex.category}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            Adicionar
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}

            <div className="space-y-3">
              {items.length === 0 && !isSearching && (
                <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                  Nenhum exercício adicionado.
                </div>
              )}
              {items.map((item, index) => (
                <div
                  key={item.tempId}
                  className="border rounded-lg p-4 bg-card shadow-sm space-y-3 relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary w-6 h-6 rounded flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.exercise.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {item.exercise.muscle_group}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleRemoveItem(item.tempId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Séries</Label>
                      <Input
                        type="number"
                        min={1}
                        value={item.sets}
                        onChange={(e) =>
                          handleUpdateItem(item.tempId, 'sets', parseInt(e.target.value))
                        }
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Repetições</Label>
                      <Input
                        value={item.reps}
                        onChange={(e) => handleUpdateItem(item.tempId, 'reps', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    {planType === 'workout' ? (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Carga Alvo (kg)</Label>
                          <Input
                            type="number"
                            value={item.target_load_kg || ''}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.tempId,
                                'target_load_kg',
                                e.target.value ? parseInt(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm"
                            placeholder="Opcional"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Descanso (s)</Label>
                          <Input
                            type="number"
                            value={item.rest_seconds || ''}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.tempId,
                                'rest_seconds',
                                e.target.value ? parseInt(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm"
                            placeholder="Opcional"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Frequência</Label>
                          <Input
                            value={item.frequency || ''}
                            onChange={(e) =>
                              handleUpdateItem(item.tempId, 'frequency', e.target.value)
                            }
                            className="h-8 text-sm"
                            placeholder="Ex: 3x/dia"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Limite Dor (EVA)</Label>
                          <Input
                            type="number"
                            max={10}
                            min={0}
                            value={item.pain_limit_eva || ''}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.tempId,
                                'pain_limit_eva',
                                e.target.value ? parseInt(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm"
                            placeholder="Ex: 4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-auto">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading || items.length === 0 || !name.trim()}>
            {loading ? 'Salvando...' : 'Salvar Treino'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
