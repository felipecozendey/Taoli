import { useState, useMemo } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { uploadClientMedia } from '@/lib/supabase/storage'
import { createAssessment } from '@/services/nutrition'
import { Loader2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  clientId: string
}

export function NutritionAssessmentModal({ isOpen, onClose, clientId }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Form State
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<'M' | 'F' | ''>('')
  const [activityLevel, setActivityLevel] = useState<string>('')
  const [bodyFat, setBodyFat] = useState<string>('')

  // Photos State
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null)
  const [sidePhoto, setSidePhoto] = useState<File | null>(null)
  const [backPhoto, setBackPhoto] = useState<File | null>(null)

  const calculations = useMemo(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)
    const al = parseFloat(activityLevel)

    if (isNaN(w) || isNaN(h) || isNaN(a) || !gender || isNaN(al)) {
      return { bmr: 0, tdee: 0 }
    }

    let bmr = 0
    if (gender === 'M') {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.68 * a
    } else {
      bmr = 447.6 + 9.25 * w + 3.1 * h - 4.33 * a
    }

    const tdee = bmr * al

    return { bmr: Math.round(bmr), tdee: Math.round(tdee) }
  }, [weight, height, age, gender, activityLevel])

  const handleSave = async () => {
    if (!weight || !height || !age || !gender || !activityLevel) {
      toast({
        title: 'Campos incompletos',
        description: 'Preencha todos os campos obrigatórios para o cálculo.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      let frontUrl, sideUrl, backUrl

      if (frontPhoto) frontUrl = await uploadClientMedia(frontPhoto, clientId)
      if (sidePhoto) sideUrl = await uploadClientMedia(sidePhoto, clientId)
      if (backPhoto) backUrl = await uploadClientMedia(backPhoto, clientId)

      const { error } = await createAssessment({
        client_id: clientId,
        weight: parseFloat(weight),
        height: parseFloat(height),
        body_fat_percentage: bodyFat ? parseFloat(bodyFat) : undefined,
        bmr: calculations.bmr,
        tdee: calculations.tdee,
        front_photo_url: frontUrl || undefined,
        side_photo_url: sideUrl || undefined,
        back_photo_url: backUrl || undefined,
        date: new Date().toISOString().split('T')[0],
      })

      if (error) throw error

      toast({
        title: 'Avaliação salva!',
        description: 'A avaliação nutricional foi registrada com sucesso.',
      })

      onClose()

      // Reset form
      setWeight('')
      setHeight('')
      setAge('')
      setGender('')
      setActivityLevel('')
      setBodyFat('')
      setFrontPhoto(null)
      setSidePhoto(null)
      setBackPhoto(null)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar a avaliação.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Avaliação Física</DialogTitle>
          <DialogDescription>
            Insira as métricas do paciente. Os cálculos de TMB e VETA são automáticos.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Métricas Corporais</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex: 75.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Ex: 175"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 30"
                />
              </div>
              <div className="space-y-2">
                <Label>Sexo</Label>
                <Select value={gender} onValueChange={(val: 'M' | 'F') => setGender(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nível de Atividade Física</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentário (Pouco/nenhum)</SelectItem>
                  <SelectItem value="1.375">Leve (1-3 dias/sem)</SelectItem>
                  <SelectItem value="1.55">Moderado (3-5 dias/sem)</SelectItem>
                  <SelectItem value="1.725">Intenso (6-7 dias/sem)</SelectItem>
                  <SelectItem value="1.9">Muito Intenso (2x/dia)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyFat">% de Gordura (Opcional)</Label>
              <Input
                id="bodyFat"
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="Ex: 15.5"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Fotos de Evolução</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Frente</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFrontPhoto(e.target.files?.[0] || null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Perfil</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSidePhoto(e.target.files?.[0] || null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Costas</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackPhoto(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex justify-around items-center text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">TMB Estimada</p>
              <p className="text-2xl font-bold text-primary">
                {calculations.bmr > 0 ? calculations.bmr : '--'} kcal
              </p>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gasto Diário (VETA)</p>
              <p className="text-2xl font-bold text-primary">
                {calculations.tdee > 0 ? calculations.tdee : '--'} kcal
              </p>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Avaliação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
