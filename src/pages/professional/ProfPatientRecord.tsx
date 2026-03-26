import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
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
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { PatientNutritionMirror } from '@/components/professional/PatientNutritionMirror'
import { NutritionAssessmentModal } from '@/components/professional/NutritionAssessmentModal'
import { NutritionSupplementModal } from '@/components/professional/NutritionSupplementModal'
import { DietPrescriptionModal } from '@/components/professional/DietPrescriptionModal'
import {
  getPatientSupplements,
  deleteSupplement,
  getPatientAssessments,
  deleteAssessment,
  type NutritionAssessment,
  type NutritionSupplement,
} from '@/services/nutrition'

export default function ProfPatientRecord() {
  const { id: patientId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [patientData, setPatientData] = useState<any>(null)
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

  const [supplements, setSupplements] = useState<NutritionSupplement[]>([])
  const [assessments, setAssessments] = useState<NutritionAssessment[]>([])

  const fetchSupplements = async () => {
    if (!patientId) return
    const { data } = await getPatientSupplements(patientId)
    if (data) setSupplements(data)
  }

  const fetchAssessments = async () => {
    if (!patientId) return
    const { data } = await getPatientAssessments(patientId)
    if (data) setAssessments(data)
  }

  useEffect(() => {
    if (!patientId || !user?.id) return
    const fetchPatient = async () => {
      try {
        const { data } = await supabase
          .from('professional_client_links')
          .select('*, client:profiles!professional_client_links_client_id_fkey(*)')
          .eq('client_id', patientId)
          .eq('professional_id', user.id)
          .single()

        if (data) {
          setPatientData(Array.isArray(data.client) ? data.client[0] : data.client)
          setPermissions({
            can_view_nutrition: data.can_view_nutrition,
            can_view_training: data.can_view_training,
            can_view_mind: data.can_view_mind,
          })
        } else {
          setPatientData({ name: 'Paciente Não Encontrado' })
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatient()
    fetchSupplements()
    fetchAssessments()
  }, [patientId, user?.id])

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
    if (user?.role === 'admin') return true
    if (module === 'productivity') return true
    return permissions?.[`can_view_${module}` as keyof typeof permissions] || false
  }

  const LockedContent = () => (
    <Card className="border-dashed bg-muted/30">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Lock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Acesso Restrito</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          O paciente não partilhou estes dados consigo. Solicite a permissão na aplicação dele.
        </p>
      </CardContent>
    </Card>
  )

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
            <TabsTrigger value="treino" className="py-2.5 px-4 rounded-md">
              Treino
            </TabsTrigger>
            <TabsTrigger value="mente" className="py-2.5 px-4 rounded-md">
              Saúde Mental
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="animate-fade-in-up mt-0 space-y-6">
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
                        Hábitos Ativos: <span className="font-medium text-foreground">4</span>
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
                  {notes.map((note) => (
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
                      onClick={() => {
                        setSelectedAssessment(null)
                        setIsAssessmentModalOpen(true)
                      }}
                      className="w-full sm:w-auto"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Nova Avaliação Física
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" /> Histórico de Avaliações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {assessments.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6 border rounded-md border-dashed">
                        Nenhuma avaliação registada.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Peso</TableHead>
                            <TableHead>% Gordura</TableHead>
                            <TableHead>TMB</TableHead>
                            <TableHead>VETA</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assessments.map((a) => (
                            <TableRow key={a.id}>
                              <TableCell className="font-medium">
                                {new Intl.DateTimeFormat('pt-BR').format(new Date(a.date))}
                              </TableCell>
                              <TableCell>{a.weight ? `${a.weight} kg` : '--'}</TableCell>
                              <TableCell>
                                {a.body_fat_percentage ? `${a.body_fat_percentage} %` : '--'}
                              </TableCell>
                              <TableCell>{a.bmr ? `${a.bmr} kcal` : '--'}</TableCell>
                              <TableCell>{a.tdee ? `${a.tdee} kcal` : '--'}</TableCell>
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
                                        setSelectedAssessment(a)
                                        setIsAssessmentModalOpen(true)
                                      }}
                                    >
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                      onClick={() => handleDeleteAssessment(a.id)}
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
              <Card>
                <CardHeader>
                  <CardTitle>Módulo de Treino</CardTitle>
                  <CardDescription>
                    Acompanhamento físico e prescrição de exercícios.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                    Nenhum treino prescrito ativamente.
                  </div>
                </CardContent>
              </Card>
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
    </div>
  )
}
