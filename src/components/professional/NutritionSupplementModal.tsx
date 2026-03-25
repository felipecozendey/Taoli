import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createSupplement, updateSupplement, type NutritionSupplement } from '@/services/nutrition'
import { Loader2, Pill, Clock, Calendar } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  clientId: string
  onSuccess?: () => void
  initialData?: NutritionSupplement | null
}

export function NutritionSupplementModal({
  isOpen,
  onClose,
  clientId,
  onSuccess,
  initialData,
}: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('Todos os dias')
  const [timing, setTiming] = useState('')
  const [observations, setObservations] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || '')
        setDosage(initialData.dosage || '')
        setFrequency(initialData.frequency || 'Todos os dias')
        setTiming(initialData.timing || '')
        setObservations(initialData.observations || '')
      } else {
        setName('')
        setDosage('')
        setFrequency('Todos os dias')
        setTiming('')
        setObservations('')
      }
    }
  }, [isOpen, initialData])

  const handleSave = async () => {
    if (!name || !dosage) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor, preencha o nome e a dosagem do suplemento.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const payload = {
        client_id: clientId,
        name,
        dosage,
        frequency,
        timing,
        observations,
        is_active: true,
      }

      if (initialData?.id) {
        const { error } = await updateSupplement(initialData.id, payload)
        if (error) throw error
        toast({ title: 'Suplemento atualizado!', description: 'As alterações foram salvas.' })
      } else {
        const { error } = await createSupplement(payload)
        if (error) throw error
        toast({
          title: 'Suplemento prescrito!',
          description: 'A prescrição foi adicionada com sucesso.',
        })
      }

      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o suplemento.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Suplemento' : 'Prescrever Suplemento'}</DialogTitle>
          <DialogDescription>
            Adicione ou atualize um suplemento na rotina do paciente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-primary" /> Nome do Suplemento
            </Label>
            <Input
              id="name"
              placeholder="Ex: Whey Protein Isolado"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dosage">Dosagem</Label>
              <Input
                id="dosage"
                placeholder="Ex: 30g ou 1 scoop"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Frequência
              </Label>
              <Input
                id="frequency"
                placeholder="Ex: Todos os dias"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timing" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Horário
            </Label>
            <Input
              id="timing"
              placeholder="Ex: Pós-treino ou Ao acordar"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Ex: Bater com água gelada para melhor absorção..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="resize-none h-20"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Salvar Alterações' : 'Prescrever'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
