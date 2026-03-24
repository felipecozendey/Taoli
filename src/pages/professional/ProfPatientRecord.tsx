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
import { ArrowLeft, Lock, Send, Activity } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { PatientNutritionMirror } from '@/components/professional/PatientNutritionMirror'
import { NutritionAssessmentModal } from '@/components/professional/NutritionAssessmentModal'

export default function ProfPatientRecord() {
  const { id } = useParams()
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

  useEffect(() => {
    if (!id || !user?.id) return
    const fetchPatient = async () => {
      try {
        const { data } = await supabase
          .from('professional_client_links')
          .select('*, client:profiles!professional_client_links_client_id_fkey(*)')
          .eq('client_id', id)
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
  }, [id, user?.id])

  const handleAddNote = () => {
    if (!newNote.trim()) return
    const today = new Date().toISOString().split('T')[0]
    setNotes([{ id: Date.now(), date: today, content: newNote }, ...notes])
    setNewNote('')
  }

  const LockedContent = () => (
    <Card className="border-dashed bg-muted/30">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Lock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Acesso Restrito</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          O paciente não compartilhou estes dados consigo. Solicite a permissão na aplicação dele.
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Prontuário do Paciente" />
      <PageContent className="max-w-5xl mx-auto w-full animate-fade-in-up">
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
          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1">
            <TabsTrigger value="geral" className="py-2">
              Geral / Evolução
            </TabsTrigger>
            <TabsTrigger value="nutricao" className="py-2">
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="treino" className="py-2">
              Treino
            </TabsTrigger>
            <TabsTrigger value="mente" className="py-2">
              Saúde Mental
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="animate-fade-in-up mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Clínica</CardTitle>
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
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Histórico</h4>
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
            {!permissions.can_view_nutrition ? (
              <LockedContent />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Button onClick={() => setIsAssessmentModalOpen(true)}>
                    <Activity className="h-4 w-4 mr-2" />
                    Nova Avaliação Física
                  </Button>
                </div>
                <PatientNutritionMirror patientId={id || ''} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="treino" className="animate-fade-in-up mt-0">
            {!permissions.can_view_training ? (
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
            {!permissions.can_view_mind ? (
              <LockedContent />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Acompanhamento Psicológico</CardTitle>
                  <CardDescription>
                    Visualização do estado de humor e notas compartilhadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                    Nenhum dado registrado para exibição no momento.
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
        clientId={id || ''}
      />
    </div>
  )
}
