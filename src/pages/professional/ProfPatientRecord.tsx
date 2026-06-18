import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowLeft,
  Lock,
  Send,
  Activity,
  Pill,
  Trash2,
  Dumbbell,
  Brain,
  Target,
  MoreHorizontal,
  Apple,
  ChefHat,
  Flame,
  Target as TargetIcon,
  Heart,
  MessageSquare,
  Lightbulb,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import {
  getHabits,
  prescribeHabit,
  toggleHabitApproval,
  updateHabitFeedback,
} from '@/services/productivity'
import { getPatientById } from '@/services/patients'
import { PatientNutritionMirror } from '@/components/professional/PatientNutritionMirror'
import { NutritionAssessmentModal } from '@/components/professional/NutritionAssessmentModal'
import { NutritionSupplementModal } from '@/components/professional/NutritionSupplementModal'
import { DietPrescriptionModal } from '@/components/professional/DietPrescriptionModal'
import { RecipeBuilderModal } from '@/components/professional/RecipeBuilderModal'
import { LabExamsTab } from '@/components/professional/emr/LabExamsTab'
import { AnamnesisTab } from '@/components/professional/emr/AnamnesisTab'
import { StrengthTestTab } from '@/components/professional/emr/StrengthTestTab'
import { PhysicalAssessmentEvolution } from '@/components/professional/emr/PhysicalAssessmentEvolution'
import {
  getPatientSupplements,
  deleteSupplement,
  getPatientAssessments,
  deleteAssessment,
  getTrackingByPeriod,
  getClientActiveDiet,
  updateDietFeedback,
  type NutritionAssessment,
  type NutritionSupplement,
} from '@/services/nutrition'
import { format } from 'date-fns'
import { DollarSign, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  getClientSubscriptions,
  getClientTransactions,
  getServicePlans,
  createClientSubscription,
  createTransaction,
  updateSubscriptionStatus,
} from '@/services/clinic'
import {
  getClientPlans,
  getFullPlanDetails,
  deletePlan,
  updatePlanFeedback,
} from '@/services/training'
import { TrainingBuilderModal } from '@/components/training/TrainingBuilderModal'
import { AuthorshipBadge } from '@/components/shared/AuthorshipBadge'
import { cn } from '@/lib/utils'

const calculateStreak = (logs: any[]) => {
  if (!logs || logs.length === 0) return 0
  const dates = new Set(logs.map((l: any) => l.completed_date))

  const today = new Date()
  const offset = today.getTimezoneOffset() * 60000
  const localDate = new Date(today.getTime() - offset)
  const todayStr = localDate.toISOString().split('T')[0]

  const yesterday = new Date(localDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let streak = 0
  let checkDate = new Date(localDate)

  if (dates.has(todayStr)) {
    // Start counting from today
  } else if (dates.has(yesterdayStr)) {
    // Start counting from yesterday
    checkDate.setDate(checkDate.getDate() - 1)
  } else {
    return 0
  }

  while (true) {
    const checkStr = checkDate.toISOString().split('T')[0]
    if (dates.has(checkStr)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export default function ProfPatientRecord() {
  const { id: patientId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [patientData, setPatientData] = useState<any>(null)
  const [patientActiveDiet, setPatientActiveDiet] = useState<any>(null)
  const [feedbackModal, setFeedbackModal] = useState<{
    type: 'diet' | 'training' | 'habit'
    id: string
    name: string
    currentFeedback: string
  } | null>(null)
  const [todayTracking, setTodayTracking] = useState<any>(null)
  const [permissions, setPermissions] = useState({
    can_view_nutrition: false,
    can_view_training: false,
    can_view_mind: false,
  })

  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: '2023-10-25',
      content: 'Paciente relata melhora no sono após ajuste na rotina.',
    },
    {
      id: 2,
      date: '2023-10-10',
      content: 'Primeira consulta de acompanhamento. Definidas metas iniciais.',
    },
  ])

  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState<NutritionAssessment | null>(null)
  const [isSupplementModalOpen, setIsSupplementModalOpen] = useState(false)
  const [selectedSupplement, setSelectedSupplement] = useState<NutritionSupplement | null>(null)
  const [isDietModalOpen, setIsDietModalOpen] = useState(false)
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)

  const [supplements, setSupplements] = useState<NutritionSupplement[]>([])
  const [assessments, setAssessments] = useState<NutritionAssessment[]>([])
  const [patientHabits, setPatientHabits] = useState<any[]>([])
  const [newPrescription, setNewPrescription] = useState('')
  const [visibleNotes, setVisibleNotes] = useState(5)
  const [visibleAssessments, setVisibleAssessments] = useState(5)

  const [patientPlans, setPatientPlans] = useState<any[]>([])
  const [patientTransactions, setPatientTransactions] = useState<any[]>([])
  const [availablePlans, setAvailablePlans] = useState<any[]>([])

  const [isLinkPlanOpen, setIsLinkPlanOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const [trainingPlans, setTrainingPlans] = useState<any[]>([])
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false)
  const [selectedTrainingPlan, setSelectedTrainingPlan] = useState<any>(null)

  const fetchFinancials = async () => {
    if (!patientId || !user?.id) return
    try {
      const subs = await getClientSubscriptions(user.id, patientId)
      setPatientPlans(subs)
      const txs = await getClientTransactions(user.id, patientId)
      setPatientTransactions(txs)
      const plans = await getServicePlans(user.id)
      setAvailablePlans(plans)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchSupplements = async () => {
    if (!patientId) return
    const { data } = await getPatientSupplements(patientId)
    if (data) setSupplements(data)
  }

  const fetchPatientHabits = async () => {
    if (!patientId) return
    try {
      const data = await getHabits(patientId)
      setPatientHabits(data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchAssessments = async () => {
    if (!patientId) return
    const { data } = await getPatientAssessments(patientId)
    if (data) setAssessments(data)
  }

  const fetchActiveDiet = async () => {
    if (!patientId) return
    try {
      const { data } = await getClientActiveDiet(patientId)
      setPatientActiveDiet(data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchTrainingPlans = async () => {
    if (!patientId) return
    try {
      const data = await getClientPlans(patientId)
      if (data) setTrainingPlans(data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchTodayTracking = async () => {
    if (!patientId) return
    const today = new Date().toISOString().split('T')[0]
    try {
      const data = await getTrackingByPeriod(patientId, today, today)
      if (data && data.length > 0) {
        setTodayTracking(data[0])
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!patientId || !user?.id) return

    let isMounted = true

    const fetchAllData = async () => {
      try {
        setLoading(true)
        const patientLink = await getPatientById(patientId)

        if (!isMounted) return

        if (patientLink) {
          setPatientData(
            Array.isArray(patientLink.client) ? patientLink.client[0] : patientLink.client,
          )
          setPermissions({
            can_view_nutrition: patientLink.can_view_nutrition,
            can_view_training: patientLink.can_view_training,
            can_view_mind: patientLink.can_view_mind,
          })
        } else {
          setPatientData({ name: 'Paciente Não Encontrado' })
        }

        await Promise.all([
          fetchSupplements(),
          fetchAssessments(),
          fetchPatientHabits(),
          fetchTodayTracking(),
          fetchFinancials(),
          fetchTrainingPlans(),
          fetchActiveDiet(),
        ])
      } catch (e) {
        console.error('Error fetching patient data:', e)
        if (isMounted) toast({ title: 'Erro ao carregar dados', variant: 'destructive' })
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAllData()

    const channel = supabase
      .channel('patient_record_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'habits', filter: `client_id=eq.${patientId}` },
        () => fetchPatientHabits(),
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'habit_logs' }, () =>
        fetchPatientHabits(),
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [patientId, user?.id])

  const habitsWithStats = useMemo(() => {
    return patientHabits.map((habit) => ({
      ...habit,
      streak: calculateStreak(habit.habit_logs),
    }))
  }, [patientHabits])

  const handlePrescribeHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPrescription.trim() || !patientId || !user?.id) return

    try {
      await prescribeHabit(patientId, user.id, newPrescription)
      setNewPrescription('')
      fetchPatientHabits()
      toast({ title: 'Hábito prescrito com sucesso!' })
    } catch (e) {
      toast({ title: 'Erro ao prescrever hábito', variant: 'destructive' })
    }
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return
    const today = new Date().toISOString().split('T')[0]
    setNotes([{ id: Date.now(), date: today, content: newNote }, ...notes])
    setNewNote('')
  }

  const handleDeleteSupplement = async (supId: string) => {
    if (confirm('Tem certeza que deseja excluir este suplemento?')) {
      await deleteSupplement(supId)
      fetchSupplements()
    }
  }

  const handleDeleteAssessment = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
      await deleteAssessment(id)
      fetchAssessments()
    }
  }

  const checkPermission = (module: string) => {
    const rawMeta = (user as any)?.user_metadata || (user as any)?.raw_user_meta_data || {}
    const role = rawMeta.role || (user as any)?.role
    const specialties = rawMeta.specialties || []
    if (role === 'master' || role === 'admin') return true
    return specialties.includes(module)
  }

  const handleLinkPlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !patientId) return
    const formData = new FormData(e.currentTarget)
    try {
      await createClientSubscription({
        professional_id: user.id,
        client_id: patientId,
        plan_id: formData.get('plan_id'),
        next_billing_date: formData.get('next_billing_date'),
        status: 'active',
      })
      toast({ title: 'Plano vinculado com sucesso!' })
      fetchFinancials()
      setIsLinkPlanOpen(false)
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    }
  }

  const handleRegisterPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !patientId) return
    const formData = new FormData(e.currentTarget)
    try {
      await createTransaction({
        professional_id: user.id,
        client_id: patientId,
        type: 'income',
        amount: Number(formData.get('amount')),
        description: formData.get('description'),
        transaction_date: formData.get('transaction_date'),
        status: 'paid',
        category: 'general',
      })
      toast({ title: 'Pagamento registrado!' })
      fetchFinancials()
      setIsPaymentOpen(false)
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    }
  }

  const handleCancelSub = async (subId: string) => {
    try {
      await updateSubscriptionStatus(subId, 'cancelled')
      toast({ title: 'Assinatura cancelada.' })
      fetchFinancials()
    } catch (e: any) {
      toast({ title: 'Erro ao cancelar', variant: 'destructive' })
    }
  }

  const handleDuplicateTraining = async (plan: any) => {
    try {
      const fullDetails = await getFullPlanDetails(plan.id)
      const mappedItems = fullDetails.items.map((item: any) => ({
        ...item,
        tempId: Math.random().toString(36).substr(2, 9),
      }))
      setSelectedTrainingPlan({
        name: `${plan.name} (Cópia)`,
        plan_type: plan.plan_type,
        items: mappedItems,
      })
      setIsTrainingModalOpen(true)
    } catch (e) {
      toast({ title: 'Erro ao carregar detalhes do plano', variant: 'destructive' })
    }
  }

  const handleDeleteTrainingPlan = async (planId: string) => {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
      try {
        await deletePlan(planId)
        fetchTrainingPlans()
        toast({ title: 'Plano excluído com sucesso.' })
      } catch (e) {
        toast({ title: 'Erro ao excluir plano', variant: 'destructive' })
      }
    }
  }

  const LockedContent = () => (
    <Card className="border-dashed bg-muted/30">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Lock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Acesso Restrito</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          O paciente não partilhou estes dados consigo ou você não possui esta especialidade.
        </p>
        <Button variant="outline">Solicitar Acesso à Especialidade</Button>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader title="Prontuário do Paciente" />
        <PageContent className="max-w-6xl mx-auto w-full animate-pulse">
          <div className="mb-6">
            <Skeleton className="h-9 w-40" />
          </div>
          <Card className="mb-8">
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
          <Skeleton className="h-12 w-full mb-6 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </PageContent>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Prontuário do Paciente" />
      <PageContent className="max-w-6xl mx-auto w-full animate-fade-in-up">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate('/professional/patients')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Lista
          </Button>
        </div>

        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-20 w-20 border shadow-sm">
              <AvatarFallback className="bg-primary/5 text-primary text-xl font-semibold">
                {patientData?.name?.substring(0, 2).toUpperCase() || 'PT'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1.5 flex-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {patientData?.name || 'Carregando...'}
              </h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>28 anos</span>
                <span>•</span>
                <span>Masculino</span>
                <span>•</span>
                <span>{patientData?.email || 'Email indisponível'}</span>
              </div>
            </div>
            <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-end">
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1"
              >
                Vínculo Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="mb-6 flex flex-wrap w-full h-auto p-1 bg-muted/50 rounded-lg justify-start">
            <TabsTrigger value="geral" className="py-2.5 px-4 rounded-md">
              Geral
            </TabsTrigger>
            <TabsTrigger value="nutricao" className="py-2.5 px-4 rounded-md">
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="avaliacao" className="py-2.5 px-4 rounded-md">
              Avaliação Física
            </TabsTrigger>
            <TabsTrigger value="forca" className="py-2.5 px-4 rounded-md">
              Testes de Força
            </TabsTrigger>
            <TabsTrigger value="exames" className="py-2.5 px-4 rounded-md">
              Exames Lab
            </TabsTrigger>
            <TabsTrigger value="anamnese" className="py-2.5 px-4 rounded-md">
              Anamnese
            </TabsTrigger>
            <TabsTrigger value="treino" className="py-2.5 px-4 rounded-md">
              Treino
            </TabsTrigger>
            <TabsTrigger value="mente" className="py-2.5 px-4 rounded-md">
              Saúde Mental
            </TabsTrigger>
            <TabsTrigger value="produtividade" className="py-2.5 px-4 rounded-md">
              Produtividade
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="py-2.5 px-4 rounded-md">
              Financeiro
            </TabsTrigger>
          </TabsList>

          <Dialog open={!!feedbackModal} onOpenChange={(open) => !open && setFeedbackModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar feedback ao paciente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Item: <span className="font-bold text-foreground">{feedbackModal?.name}</span>
                </p>
                <Textarea
                  placeholder="Escreva sua dica ou orientação para o paciente..."
                  defaultValue={feedbackModal?.currentFeedback || ''}
                  id="feedback-text"
                  className="min-h-[120px]"
                />
                <Button
                  className="w-full"
                  onClick={async () => {
                    const text = (document.getElementById('feedback-text') as HTMLTextAreaElement)
                      .value
                    try {
                      if (feedbackModal?.type === 'diet') {
                        await updateDietFeedback(feedbackModal.id, text)
                        fetchActiveDiet()
                      } else if (feedbackModal?.type === 'training') {
                        await updatePlanFeedback(feedbackModal.id, text)
                        fetchTrainingPlans()
                      } else if (feedbackModal?.type === 'habit') {
                        await updateHabitFeedback(feedbackModal.id, text)
                        fetchPatientHabits()
                      }
                      setFeedbackModal(null)
                      toast({ title: 'Feedback salvo com sucesso!' })
                    } catch (e) {
                      toast({ title: 'Erro ao salvar feedback', variant: 'destructive' })
                    }
                  }}
                >
                  Salvar Feedback
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <TabsContent value="avaliacao" className="animate-fade-in-up mt-0 space-y-6">
            <PhysicalAssessmentEvolution
              assessments={assessments}
              onNewAssessment={() => {
                setSelectedAssessment(null)
                setIsAssessmentModalOpen(true)
              }}
              onEditAssessment={(a) => {
                setSelectedAssessment(a)
                setIsAssessmentModalOpen(true)
              }}
              onDeleteAssessment={handleDeleteAssessment}
            />
          </TabsContent>

          <TabsContent value="forca" className="animate-fade-in-up mt-0 space-y-6">
            <StrengthTestTab clientId={patientId || ''} />
          </TabsContent>

          <TabsContent value="exames" className="animate-fade-in-up mt-0 space-y-6">
            <LabExamsTab clientId={patientId || ''} />
          </TabsContent>

          <TabsContent value="anamnese" className="animate-fade-in-up mt-0 space-y-6">
            <AnamnesisTab clientId={patientId || ''} professionalId={user?.id || ''} />
          </TabsContent>

          <TabsContent value="geral" className="animate-fade-in-up mt-0 space-y-6">
            {/* Dashboard Visão de Helicóptero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                    <Activity className="h-4 w-4 text-primary" /> Consumo de Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold text-foreground">
                        {todayTracking?.total_calories || 0}
                      </span>
                      <span className="text-sm text-muted-foreground mb-1 font-medium">kcal</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-border/50 pt-2">
                      <span className="text-lg font-semibold text-blue-500">
                        {todayTracking?.water_ml || 0}
                      </span>
                      <span className="text-sm text-muted-foreground font-medium">ml água</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                    <Activity className="h-4 w-4 text-primary" /> Peso Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold text-foreground">
                        {assessments[0]?.weight ? assessments[0].weight : '--'}
                      </span>
                      <span className="text-sm text-muted-foreground mb-1 font-medium">kg</span>
                    </div>
                    <div className="border-t border-border/50 pt-2">
                      <p className="text-xs text-muted-foreground font-medium">
                        Último registo:{' '}
                        {assessments[0]
                          ? new Intl.DateTimeFormat('pt-BR').format(new Date(assessments[0].date))
                          : '--'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                    <Flame className="h-4 w-4 text-orange-500" /> Refeições Extras Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!todayTracking?.extra_meals || todayTracking.extra_meals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[3.25rem] text-center">
                      <p className="text-sm text-muted-foreground font-medium">
                        Nenhum desvio registado
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {todayTracking.extra_meals.slice(0, 3).map((meal: any, i: number) => (
                        <li
                          key={i}
                          className="text-sm flex justify-between items-center bg-muted/30 p-1.5 rounded"
                        >
                          <span className="truncate mr-2 font-medium">{meal.name || 'Extra'}</span>
                          <Badge
                            variant="secondary"
                            className="text-orange-600 bg-orange-100/50 hover:bg-orange-100/50 whitespace-nowrap"
                          >
                            +{meal.calories || 0} kcal
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Resumo Multidisciplinar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" /> Nutrição
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {checkPermission('nutrition') ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Último peso:{' '}
                        <span className="font-medium text-foreground">
                          {assessments[0]?.weight || '--'} kg
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Meta:{' '}
                        <span className="font-medium text-foreground">
                          {assessments[0]?.goal_weight ? `${assessments[0].goal_weight} kg` : '--'}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 blur-sm opacity-50 pointer-events-none select-none">
                        <p className="text-sm text-muted-foreground">
                          Último peso: <span className="font-medium">80 kg</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Meta: <span className="font-medium">Emagrecimento</span>
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10">
                        <Lock className="h-5 w-5 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Restrito</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" /> Treino
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {checkPermission('training') ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Plano Atual:{' '}
                        <span className="font-medium text-foreground">Hipertrofia</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Frequência:{' '}
                        <span className="font-medium text-foreground">5x na semana</span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 blur-sm opacity-50 pointer-events-none select-none">
                        <p className="text-sm text-muted-foreground">
                          Plano Atual: <span className="font-medium">Hipertrofia</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Frequência: <span className="font-medium">5x na semana</span>
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10">
                        <Lock className="h-5 w-5 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Restrito</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" /> Saúde Mental
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {checkPermission('mind') ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Humor Médio: <span className="font-medium text-foreground">Bom</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Última Sessão:{' '}
                        <span className="font-medium text-foreground">Há 3 dias</span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 blur-sm opacity-50 pointer-events-none select-none">
                        <p className="text-sm text-muted-foreground">
                          Humor Médio: <span className="font-medium">Bom</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Última Sessão: <span className="font-medium">Há 3 dias</span>
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10">
                        <Lock className="h-5 w-5 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Restrito</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" /> Produtividade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {checkPermission('productivity') ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Hábitos Ativos:{' '}
                        <span className="font-medium text-foreground">{patientHabits.length}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tarefas Pendentes: <span className="font-medium text-foreground">12</span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 blur-sm opacity-50 pointer-events-none select-none">
                        <p className="text-sm text-muted-foreground">
                          Hábitos Ativos: <span className="font-medium">4</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tarefas Pendentes: <span className="font-medium">12</span>
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10">
                        <Lock className="h-5 w-5 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Restrito</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução Clínica e Notas</CardTitle>
                <CardDescription>Anotações e acompanhamento contínuo das sessões.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                  <Textarea
                    placeholder="Descreva a evolução da consulta de hoje..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="resize-none bg-background"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Adicionar Evolução
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Histórico de Notas
                  </h4>
                  {notes.slice(0, visibleNotes).map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-lg border bg-card hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {new Intl.DateTimeFormat('pt-BR').format(new Date(note.date))}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                  {notes.length > visibleNotes && (
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setVisibleNotes((prev) => prev + 5)}
                    >
                      Carregar Mais Notas
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutricao" className="animate-fade-in-up mt-0">
            {!checkPermission('nutrition') ? (
              <LockedContent />
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Nutrição e Suplementação</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerencie o plano alimentar e a prescrição de suplementos.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => {
                        setSelectedSupplement(null)
                        setIsSupplementModalOpen(true)
                      }}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <Pill className="h-4 w-4 mr-2" />
                      Novo Suplemento
                    </Button>
                    <Button
                      onClick={() => setIsDietModalOpen(true)}
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      <Apple className="h-4 w-4 mr-2" />
                      Nova Dieta
                    </Button>
                    <Button
                      onClick={() => setIsRecipeModalOpen(true)}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <ChefHat className="h-4 w-4 mr-2" />
                      Nova Receita
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Apple className="h-4 w-4 text-primary" /> Dieta Atual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patientActiveDiet ? (
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-border/50 bg-muted/20 p-4 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{patientActiveDiet.name}</h4>
                            <AuthorshipBadge
                              createdBy={patientActiveDiet.created_by}
                              patientId={patientId}
                            />
                          </div>
                          {patientActiveDiet.professional_feedback && (
                            <p className="text-sm text-muted-foreground mt-2 border-l-2 pl-2 border-primary/50 italic">
                              "{patientActiveDiet.professional_feedback}"
                            </p>
                          )}
                        </div>
                        {patientActiveDiet.created_by === patientId && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setFeedbackModal({
                                type: 'diet',
                                id: patientActiveDiet.id,
                                name: patientActiveDiet.name,
                                currentFeedback: patientActiveDiet.professional_feedback || '',
                              })
                            }
                          >
                            <MessageSquare className="h-4 w-4 mr-2" /> Avaliar / Dica
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-6 border rounded-md border-dashed">
                        Nenhuma dieta ativa no momento.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" /> Suplementação Ativa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {supplements.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6 border rounded-md border-dashed">
                        Nenhum suplemento prescrito ativamente.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Dosagem</TableHead>
                            <TableHead>Frequência</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {supplements.map((sup) => (
                            <TableRow key={sup.id}>
                              <TableCell className="font-medium">{sup.name}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="font-normal">
                                  {sup.dosage}
                                </Badge>
                              </TableCell>
                              <TableCell>{sup.frequency || '--'}</TableCell>
                              <TableCell>{sup.timing || '--'}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedSupplement(sup)
                                        setIsSupplementModalOpen(true)
                                      }}
                                    >
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                      onClick={() => handleDeleteSupplement(sup.id)}
                                    >
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>

                <div className="pt-6 border-t space-y-4">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Progresso Diário do Paciente
                  </h4>
                  <PatientNutritionMirror patientId={patientId || ''} />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="treino" className="animate-fade-in-up mt-0">
            {!checkPermission('training') ? (
              <LockedContent />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      Módulo de Treino
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Acompanhamento físico e prescrição de exercícios.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedTrainingPlan(null)
                      setIsTrainingModalOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Treino
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    {trainingPlans.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground border-b border-dashed">
                        Nenhum treino prescrito ou criado.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome do Plano</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Autoria</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {trainingPlans.map((plan) => {
                            const isPatientCreated = plan.created_by === patientId
                            return (
                              <TableRow key={plan.id}>
                                <TableCell className="font-medium">{plan.name}</TableCell>
                                <TableCell>
                                  {plan.plan_type === 'workout' ? 'Força' : 'Reabilitação'}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={plan.is_active ? 'default' : 'secondary'}>
                                    {plan.is_active ? 'Ativo' : 'Inativo'}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <AuthorshipBadge
                                    createdBy={plan.created_by}
                                    patientId={plan.client_id}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {isPatientCreated && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            setFeedbackModal({
                                              type: 'training',
                                              id: plan.id,
                                              name: plan.name,
                                              currentFeedback: plan.professional_feedback || '',
                                            })
                                          }
                                        >
                                          <MessageSquare className="h-4 w-4 mr-2 text-primary" />{' '}
                                          Dar Feedback
                                        </DropdownMenuItem>
                                      )}
                                      {isPatientCreated ? (
                                        <DropdownMenuItem
                                          onClick={() => handleDuplicateTraining(plan)}
                                        >
                                          Duplicar e Ajustar
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem
                                          onClick={() => handleDuplicateTraining(plan)}
                                        >
                                          Duplicar Plano
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                        onClick={() => handleDeleteTrainingPlan(plan.id)}
                                      >
                                        Excluir
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mente" className="animate-fade-in-up mt-0">
            {!checkPermission('mind') ? (
              <LockedContent />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Acompanhamento Psicológico</CardTitle>
                  <CardDescription>
                    Visualização do estado de humor e notas partilhadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                    Nenhum dado registado para exibição no momento.
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="financeiro" className="animate-fade-in-up mt-0 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Assinaturas e Planos</h3>
                <p className="text-sm text-muted-foreground">
                  Contratos e pacotes ativos deste paciente.
                </p>
              </div>
              <Dialog open={isLinkPlanOpen} onOpenChange={setIsLinkPlanOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Vincular Plano
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Vincular Plano ao Paciente</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLinkPlan} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Selecionar Plano</Label>
                      <Select name="plan_id" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um plano..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePlans.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name} - €{p.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data da Primeira Cobrança</Label>
                      <Input
                        type="date"
                        name="next_billing_date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Vincular
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plano</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ciclo</TableHead>
                    <TableHead>Próx. Cobrança</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientPlans.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.plan?.name}</TableCell>
                      <TableCell>€ {sub.plan?.price}</TableCell>
                      <TableCell className="capitalize">{sub.plan?.billing_cycle}</TableCell>
                      <TableCell>{format(new Date(sub.next_billing_date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            sub.status === 'active'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-red-50 text-red-700 border-red-200',
                          )}
                        >
                          {sub.status === 'active' ? 'Ativo' : sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleCancelSub(sub.id)}>
                          Cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {patientPlans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                        Nenhum plano vinculado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>

            <div className="flex justify-between items-center pt-4">
              <h3 className="text-lg font-semibold">Histórico de Pagamentos</h3>
              <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary">
                    <DollarSign className="w-4 h-4 mr-2" /> Registrar Pagamento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registrar Pagamento Recebido</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRegisterPayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Valor (€)</Label>
                      <Input type="number" step="0.01" name="amount" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Data do Pagamento</Label>
                      <Input
                        type="date"
                        name="transaction_date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Input name="description" required placeholder="Ex: Mensalidade Maio" />
                    </div>
                    <Button type="submit" className="w-full">
                      Salvar Pagamento
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{format(new Date(tx.transaction_date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell className="font-medium">€ {tx.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            tx.status === 'paid'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
                          )}
                        >
                          {tx.status === 'paid' ? 'Pago' : 'Pendente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {patientTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                        Nenhum pagamento registrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="produtividade" className="animate-fade-in-up mt-0">
            {!checkPermission('productivity') ? (
              <LockedContent />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <TargetIcon className="h-5 w-5 text-primary" />
                      Gestão de Rotina e Hábitos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Prescreva hábitos e acompanhe as ofensivas (streaks) do paciente.
                    </p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Prescrever Novo Hábito</CardTitle>
                    <CardDescription>
                      Adicione um hábito que aparecerá com o selo "👨‍⚕️ Prescrito" para o paciente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePrescribeHabit} className="flex gap-2">
                      <Input
                        placeholder="Ex: Tomar Creatina às 10h"
                        value={newPrescription}
                        onChange={(e) => setNewPrescription(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newPrescription.trim()}>
                        Prescrever
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hábitos do Paciente</CardTitle>
                    <CardDescription>
                      Acompanhe o engajamento e a consistência do paciente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {patientHabits.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                        Nenhum hábito rastreado.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {habitsWithStats.map((habit) => {
                          const streak = habit.streak
                          return (
                            <Card
                              key={habit.id}
                              className="relative overflow-hidden border-border/50"
                            >
                              <CardContent className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <h4 className="font-semibold text-base mb-2">{habit.title}</h4>
                                    <AuthorshipBadge
                                      createdBy={habit.created_by}
                                      patientId={patientId}
                                    />
                                  </div>
                                  <div className="flex gap-1 flex-col">
                                    {habit.created_by === patientId && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                          'h-8 w-8 shrink-0',
                                          habit.is_approved
                                            ? 'text-rose-500 hover:text-rose-600 hover:bg-rose-50'
                                            : 'text-muted-foreground hover:text-rose-500 hover:bg-rose-50',
                                        )}
                                        title="Apoiar este hábito"
                                        onClick={async () => {
                                          try {
                                            await toggleHabitApproval(habit.id, !habit.is_approved)
                                            fetchPatientHabits()
                                          } catch (e) {
                                            toast({
                                              title: 'Erro ao atualizar hábito',
                                              variant: 'destructive',
                                            })
                                          }
                                        }}
                                      >
                                        <Heart
                                          className={cn(
                                            'h-5 w-5',
                                            habit.is_approved ? 'fill-current' : '',
                                          )}
                                        />
                                      </Button>
                                    )}
                                    {habit.created_by === patientId && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 text-blue-500 hover:bg-blue-50"
                                        title="Adicionar feedback"
                                        onClick={() =>
                                          setFeedbackModal({
                                            type: 'habit',
                                            id: habit.id,
                                            name: habit.title,
                                            currentFeedback: habit.professional_feedback || '',
                                          })
                                        }
                                      >
                                        <MessageSquare className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                {habit.professional_feedback && (
                                  <p className="text-xs text-muted-foreground mt-1 border-l-2 pl-2 border-blue-500 italic">
                                    "{habit.professional_feedback}"
                                  </p>
                                )}
                                <div className="flex items-center text-orange-500 font-bold text-2xl mt-1">
                                  <Flame className="w-6 h-6 mr-2 fill-orange-500" />
                                  {streak}{' '}
                                  <span className="text-sm ml-1 text-muted-foreground font-medium">
                                    Dias
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PageContent>

      <NutritionAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        clientId={patientId || ''}
        initialData={selectedAssessment}
        onSuccess={fetchAssessments}
      />
      <NutritionSupplementModal
        isOpen={isSupplementModalOpen}
        onClose={() => setIsSupplementModalOpen(false)}
        clientId={patientId || ''}
        initialData={selectedSupplement}
        onSuccess={fetchSupplements}
      />
      <DietPrescriptionModal
        clientId={patientId}
        isOpen={isDietModalOpen}
        onClose={() => setIsDietModalOpen(false)}
      />
      <RecipeBuilderModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        professionalId={user?.id || ''}
      />
      {user && patientId && (
        <TrainingBuilderModal
          isOpen={isTrainingModalOpen}
          onClose={() => setIsTrainingModalOpen(false)}
          clientId={patientId}
          professionalId={user.id}
          initialData={selectedTrainingPlan}
          onSuccess={fetchTrainingPlans}
        />
      )}
    </div>
  )
}
