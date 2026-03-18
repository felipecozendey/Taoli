import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { Apple, Dumbbell, Brain, MoreVertical, Trash2, Plus, Search, Users } from 'lucide-react'
import {
  getMyTeam,
  connectProfessional,
  updatePermissions,
  disconnectProfessional,
  type ProfessionalLink,
} from '@/services/team'

const areas = [
  {
    key: 'can_view_nutrition',
    label: 'Partilhar Nutrição',
    icon: Apple,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
  },
  {
    key: 'can_view_training',
    label: 'Partilhar Treinos',
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-500/20',
  },
  {
    key: 'can_view_mind',
    label: 'Partilhar Saúde Mental',
    icon: Brain,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-500/20',
  },
] as const

export default function ClientTeam() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [team, setTeam] = useState<ProfessionalLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const loadTeam = async () => {
    if (!user?.id) return
    setIsLoading(true)
    try {
      const data = await getMyTeam(user.id)
      setTeam(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar a sua equipa.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTeam()
  }, [user?.id])

  const handleConnect = async () => {
    if (!inviteCode.trim() || !user?.id) return
    setIsConnecting(true)
    try {
      await connectProfessional(user.id, inviteCode.trim())
      toast({ title: 'Sucesso!', description: 'Profissional adicionado à sua equipa.' })
      setIsConnectOpen(false)
      setInviteCode('')
      loadTeam()
    } catch (error: any) {
      toast({ title: 'Erro na conexão', description: error.message, variant: 'destructive' })
    } finally {
      setIsConnecting(false)
    }
  }

  const togglePermission = async (
    linkId: string,
    key: keyof ProfessionalLink,
    current: boolean,
  ) => {
    try {
      setTeam((prev) =>
        prev.map((link) => (link.id === linkId ? { ...link, [key]: !current } : link)),
      )
      await updatePermissions(linkId, { [key]: !current })
      toast({ description: 'Permissões atualizadas' })
    } catch (error) {
      setTeam((prev) =>
        prev.map((link) => (link.id === linkId ? { ...link, [key]: current } : link)),
      )
      toast({ description: 'Falha ao atualizar permissões.', variant: 'destructive' })
    }
  }

  const handleRemove = async (linkId: string) => {
    try {
      await disconnectProfessional(linkId)
      setTeam((prev) => prev.filter((link) => link.id !== linkId))
      toast({ description: 'O profissional foi removido com sucesso.' })
    } catch (error) {
      toast({ description: 'Erro ao remover profissional.', variant: 'destructive' })
    }
  }

  const getSpecialties = (prof: ProfessionalLink['professional']) => {
    const specs = []
    if (prof.is_nutritionist) specs.push('Nutrição')
    if (prof.is_trainer) specs.push('Treino')
    if (prof.is_psychologist) specs.push('Psicologia')
    return specs.length ? specs.join(' • ') : 'Profissional de Saúde'
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="A Minha Equipa de Saúde">
        <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Conectar Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Conectar Novo Profissional</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Insira a Chave do Profissional para dar-lhe acesso ao seu perfil.
              </p>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Chave do Profissional"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
                <Button onClick={handleConnect} disabled={isConnecting || !inviteCode}>
                  {isConnecting ? <Search className="h-4 w-4 animate-spin" /> : 'Procurar'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <PageContent>
        <div className="mb-8 max-w-2xl">
          <p className="text-muted-foreground text-lg">
            Tens o controlo total dos teus dados. Decide o que partilhar com cada profissional.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((link) => {
              const prof = link.professional
              return (
                <Card key={link.id} className="animate-fade-in-up border-border/60 shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border bg-muted">
                        <AvatarImage
                          src={`https://img.usecurling.com/ppl/thumbnail?seed=${prof.id}`}
                        />
                        <AvatarFallback>{prof.name?.charAt(0) || 'P'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-base leading-tight">
                          {prof.name || 'Profissional'}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {getSpecialties(prof)}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleRemove(link.id)}
                          className="text-destructive cursor-pointer focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remover Profissional
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="text-sm font-medium mb-4 text-foreground/80">
                        Permissões de Partilha
                      </h4>
                      <div className="space-y-4">
                        {areas.map((area) => {
                          const Icon = area.icon
                          const isChecked = link[area.key as keyof ProfessionalLink] as boolean
                          return (
                            <div key={area.key} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md ${area.bg}`}>
                                  <Icon className={`h-4 w-4 ${area.color}`} />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">
                                  {area.label}
                                </span>
                              </div>
                              <Switch
                                checked={isChecked}
                                onCheckedChange={() =>
                                  togglePermission(
                                    link.id,
                                    area.key as keyof ProfessionalLink,
                                    isChecked,
                                  )
                                }
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {team.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-muted-foreground border rounded-xl border-dashed bg-card/50">
                <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground">
                  Nenhum profissional conectado
                </h3>
                <p className="text-sm max-w-sm mt-1 mb-6">
                  Usa a chave fornecida pelo teu profissional para adicionar à tua equipa.
                </p>
                <Button onClick={() => setIsConnectOpen(true)} variant="secondary">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Profissional
                </Button>
              </div>
            )}
          </div>
        )}
      </PageContent>
    </div>
  )
}
