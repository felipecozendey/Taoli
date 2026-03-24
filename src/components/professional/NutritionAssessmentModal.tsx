import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useToast } from '@/hooks/use-toast'
import { uploadClientMedia } from '@/lib/supabase/storage'
import { createAssessment } from '@/services/nutrition'
import { Loader2, User, Ruler, Activity, Zap, Camera, Save, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  clientId: string
  onSuccess?: () => void
}

export function NutritionAssessmentModal({ isOpen, onClose, clientId, onSuccess }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  const [basic, setBasic] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '' as 'M' | 'F' | '',
  })
  const [circs, setCircs] = useState<Record<string, string>>({
    chest: '',
    waist: '',
    abdomen: '',
    hip: '',
    rightArm: '',
    leftArm: '',
    rightThigh: '',
    leftThigh: '',
    rightCalf: '',
    leftCalf: '',
  })
  const [folds, setFolds] = useState<Record<string, string>>({
    triceps: '',
    biceps: '',
    subscapular: '',
    suprailiac: '',
    chest: '',
    abdomen: '',
    thigh: '',
    midaxillary: '',
    calf: '',
  })
  const [bia, setBia] = useState<Record<string, string>>({
    bodyFat: '',
    muscleMass: '',
    visceralFat: '',
    water: '',
  })
  const [energy, setEnergy] = useState({ formula: 'harris', activityLevel: '1.2' })
  const [photos, setPhotos] = useState<Record<string, File | null>>({
    front: null,
    side: null,
    back: null,
  })

  const results = useMemo(() => {
    const w = parseFloat(basic.weight) || 0
    const h = parseFloat(basic.height) || 0
    const a = parseFloat(basic.age) || 0
    const g = basic.gender

    const bmi = w > 0 && h > 0 ? w / Math.pow(h / 100, 2) : 0

    const sum7 = [
      'chest',
      'midaxillary',
      'triceps',
      'subscapular',
      'abdomen',
      'suprailiac',
      'thigh',
    ].reduce((sum, k) => sum + (parseFloat(folds[k]) || 0), 0)

    let skinfoldFat = 0
    if (sum7 > 0 && a > 0 && g) {
      const d =
        g === 'M'
          ? 1.112 - 0.00043499 * sum7 + 0.00000055 * sum7 * sum7 - 0.00028826 * a
          : 1.097 - 0.00046971 * sum7 + 0.00000056 * sum7 * sum7 - 0.00012828 * a
      if (d > 0) skinfoldFat = 495 / d - 450
    }

    const biaFat = parseFloat(bia.bodyFat) || 0
    const finalFat = biaFat > 0 ? biaFat : skinfoldFat

    let bmr = 0
    if (w > 0 && h > 0 && a > 0 && g) {
      if (energy.formula === 'harris') {
        bmr =
          g === 'M'
            ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
            : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
      } else {
        bmr = g === 'M' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161
      }
    }
    const tdee = bmr * (parseFloat(energy.activityLevel) || 1.2)

    return {
      bmi: bmi > 0 ? bmi.toFixed(1) : '--',
      skinfoldFat: skinfoldFat > 0 ? skinfoldFat.toFixed(1) : '--',
      finalFat: finalFat > 0 ? finalFat.toFixed(1) : '--',
      bmr: bmr > 0 ? Math.round(bmr) : '--',
      tdee: tdee > 0 ? Math.round(tdee) : '--',
    }
  }, [basic, folds, bia, energy])

  const handleSave = async () => {
    if (!clientId) {
      toast({
        title: 'Erro de Sincronização',
        description: 'O ID do paciente não foi identificado.',
        variant: 'destructive',
      })
      return
    }

    if (!basic.weight || !basic.height || !basic.age || !basic.gender) {
      toast({
        title: 'Campos incompletos',
        description: 'Preencha os dados básicos.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const urls: any = {}
      for (const k of ['front', 'side', 'back']) {
        if (photos[k]) urls[`${k}_photo_url`] = await uploadClientMedia(photos[k]!, clientId)
      }

      const parseObj = (obj: any) =>
        Object.fromEntries(
          Object.entries(obj)
            .filter(([_, v]) => v)
            .map(([k, v]) => [k, parseFloat(v as string)]),
        )

      const assessmentData = {
        client_id: clientId,
        weight: parseFloat(basic.weight) || 0,
        height: parseFloat(basic.height) || 0,
        body_fat_percentage: parseFloat(results.finalFat as string) || undefined,
        bmr: parseFloat(results.bmr as string) || undefined,
        tdee: parseFloat(results.tdee as string) || undefined,
        circumferences: parseObj(circs),
        skinfolds: parseObj(folds),
        formulas_used: { energy: energy.formula, fat: 'jackson_pollock_7', bia },
        date: new Date().toISOString().split('T')[0],
        ...urls,
      }

      const { error } = await createAssessment(assessmentData)

      if (error) throw error

      toast({ title: 'Avaliação salva!', description: 'Registada com sucesso.' })

      // Chamada obrigatória ANTES do fechamento do modal
      if (onSuccess) onSuccess()

      onClose()
    } catch (err) {
      toast({ title: 'Erro ao salvar', description: 'Ocorreu um erro.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'basic', label: '1. Básica', icon: User },
    { id: 'circs', label: '2. Perímetros', icon: Ruler },
    { id: 'folds', label: '3. Pregas Cutâneas', icon: Activity },
    { id: 'bia', label: '4. Bioimpedância', icon: Zap },
    { id: 'meta', label: '5. Metabolismo', icon: CheckCircle2 },
    { id: 'photos', label: '6. Fotos', icon: Camera },
  ]

  const circFields = [
    { k: 'chest', l: 'Peito' },
    { k: 'waist', l: 'Cintura' },
    { k: 'abdomen', l: 'Abdómen' },
    { k: 'hip', l: 'Quadril' },
    { k: 'rightArm', l: 'Braço D.' },
    { k: 'leftArm', l: 'Braço E.' },
    { k: 'rightThigh', l: 'Coxa D.' },
    { k: 'leftThigh', l: 'Coxa E.' },
    { k: 'rightCalf', l: 'Gémeos D.' },
    { k: 'leftCalf', l: 'Gémeos E.' },
  ]
  const foldFields = [
    { k: 'triceps', l: 'Tríceps' },
    { k: 'biceps', l: 'Bíceps' },
    { k: 'subscapular', l: 'Subescapular' },
    { k: 'suprailiac', l: 'Suprailíaca' },
    { k: 'chest', l: 'Peitoral' },
    { k: 'abdomen', l: 'Abdominal' },
    { k: 'thigh', l: 'Coxa' },
    { k: 'midaxillary', l: 'Axilar Média' },
    { k: 'calf', l: 'Panturrilha' },
  ]
  const biaFields = [
    { k: 'bodyFat', l: 'Gordura (%)' },
    { k: 'muscleMass', l: 'Músculo (kg)' },
    { k: 'visceralFat', l: 'Gordura Visceral' },
    { k: 'water', l: 'Água (%)' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden flex flex-col sm:rounded-xl">
        <DialogHeader className="p-4 border-b bg-background z-10 shadow-sm shrink-0">
          <DialogTitle className="text-xl">Nova Avaliação Física</DialogTitle>
          <DialogDescription>
            Preencha os módulos para calcular as métricas em tempo real.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-muted/20 border-r p-4 overflow-y-auto flex flex-col gap-2 shrink-0">
            {tabs.map((t) => {
              const Icon = t.icon
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              )
            })}
          </div>

          {/* Central Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-background">
            {activeTab === 'basic' && (
              <div className="space-y-6 max-w-xl">
                <h3 className="text-lg font-semibold">Dados Básicos</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Peso (kg)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={basic.weight}
                      onChange={(e) => setBasic({ ...basic, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Altura (cm)</Label>
                    <Input
                      type="number"
                      value={basic.height}
                      onChange={(e) => setBasic({ ...basic, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Idade</Label>
                    <Input
                      type="number"
                      value={basic.age}
                      onChange={(e) => setBasic({ ...basic, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sexo</Label>
                    <Select
                      value={basic.gender}
                      onValueChange={(v: 'M' | 'F') => setBasic({ ...basic, gender: v })}
                    >
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
              </div>
            )}
            {activeTab === 'circs' && (
              <div className="space-y-6 max-w-2xl">
                <h3 className="text-lg font-semibold">Perímetros (cm)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {circFields.map((f) => (
                    <div key={f.k} className="space-y-2">
                      <Label>{f.l}</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={circs[f.k]}
                        onChange={(e) => setCircs({ ...circs, [f.k]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'folds' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-semibold">Pregas Cutâneas (mm)</h3>
                  <p className="text-sm text-muted-foreground">
                    O cálculo de % de Gordura usa Jackson & Pollock 7.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {foldFields.map((f) => (
                    <div key={f.k} className="space-y-2">
                      <Label>{f.l}</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={folds[f.k]}
                        onChange={(e) => setFolds({ ...folds, [f.k]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'bia' && (
              <div className="space-y-6 max-w-xl">
                <h3 className="text-lg font-semibold">Bioimpedância (BIA)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {biaFields.map((f) => (
                    <div key={f.k} className="space-y-2">
                      <Label>{f.l}</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={bia[f.k]}
                        onChange={(e) => setBia({ ...bia, [f.k]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'meta' && (
              <div className="space-y-6 max-w-xl">
                <h3 className="text-lg font-semibold">Metabolismo e Gasto</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fórmula de TMB</Label>
                    <Select
                      value={energy.formula}
                      onValueChange={(v) => setEnergy({ ...energy, formula: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="harris">Harris-Benedict</SelectItem>
                        <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fator de Atividade (VETA)</Label>
                    <Select
                      value={energy.activityLevel}
                      onValueChange={(v) => setEnergy({ ...energy, activityLevel: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">Sedentário (1.2)</SelectItem>
                        <SelectItem value="1.375">Leve (1.375)</SelectItem>
                        <SelectItem value="1.55">Moderado (1.55)</SelectItem>
                        <SelectItem value="1.725">Intenso (1.725)</SelectItem>
                        <SelectItem value="1.9">Muito Intenso (1.9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'photos' && (
              <div className="space-y-6 max-w-xl">
                <h3 className="text-lg font-semibold">Fotos de Evolução</h3>
                <div className="space-y-4">
                  {['front', 'side', 'back'].map((k) => (
                    <div key={k} className="space-y-2">
                      <Label className="capitalize">
                        {k === 'front' ? 'Frente' : k === 'side' ? 'Perfil' : 'Costas'}
                      </Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhotos({ ...photos, [k]: e.target.files?.[0] || null })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="w-72 bg-muted/10 border-l p-6 flex flex-col shrink-0 overflow-y-auto">
            <h4 className="font-semibold mb-6 flex items-center gap-2 text-primary">
              <Zap className="h-4 w-4" /> Resultados ao Vivo
            </h4>
            <div className="space-y-5 flex-1">
              <div>
                <p className="text-sm text-muted-foreground">IMC</p>
                <p className="text-2xl font-bold">{results.bmi}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">% Gordura (Final)</p>
                <p className="text-2xl font-bold">
                  {results.finalFat}
                  <span className="text-sm font-normal ml-1">%</span>
                </p>
                {results.skinfoldFat !== '--' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Pregas: {results.skinfoldFat}%
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa Metabólica Basal</p>
                <p className="text-2xl font-bold">
                  {results.bmr}
                  <span className="text-sm font-normal ml-1">kcal</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gasto Diário (VETA)</p>
                <p className="text-2xl font-bold">
                  {results.tdee}
                  <span className="text-sm font-normal ml-1">kcal</span>
                </p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full mt-6 h-12 text-base shadow-md"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              Salvar Avaliação Completa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
