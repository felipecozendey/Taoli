import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
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
import { Apple, Dumbbell, Brain, MoreVertical, Trash2, Plus, Search } from 'lucide-react'

type Area = 'nutrition' | 'training' | 'mental'

interface Professional {
  id: string
  name: string
  specialty: string
  avatarSeed: string
  baseArea: Area
  permissions: Record<Area, boolean>
}

const initialProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    specialty: 'Psicologia',
    avatarSeed: 'carlos',
    baseArea: 'mental',
    permissions: { nutrition: false, training: false, mental: true },
  },
  {
    id: '2',
    name: 'Dra. Thaís',
    specialty: 'Nutrição',
    avatarSeed: 'thais',
    baseArea: 'nutrition',
    permissions: { nutrition: true, training: true, mental: false },
  },
]

const areaDetails = {
  nutrition: {
    label: 'Partilhar Nutrição',
    icon: Apple,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
  },
  training: {
    label: 'Partilhar Treinos',
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-500/20',
  },
  mental: {
    label: 'Partilhar Saúde Mental',
    icon: Brain,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-500/20',
  },
}

export default function ClientTeam() {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals)
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const { toast } = useToast()

  const togglePermission = (profId: string, area: Area) => {
    setProfessionals((prev) =>
      prev.map((prof) => {
        if (prof.id === profId) {
          return {
            ...prof,
            permissions: { ...prof.permissions, [area]: !prof.permissions[area] },
          }
        }
        return prof
      }),
    )
  }

  const handleRemove = (profId: string) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== profId))
    toast({
      title: 'Profissional removido',
      description: 'O acesso aos seus dados foi revogado com sucesso.',
    })
  }

  const handleConnect = () => {
    if (!inviteCode.trim()) return

    toast({
      title: 'Conexão estabelecida!',
      description: 'Profissional encontrado e adicionado à sua equipe.',
    })
    setIsConnectOpen(false)
    setInviteCode('')
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="A Minha Equipe de Saúde">
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
            <div className="flex items-center space-x-2 pt-4">
              <Input
                placeholder="Código de Convite"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <Button onClick={handleConnect}>
                <Search className="mr-2 h-4 w-4" />
                Procurar
              </Button>
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {professionals.map((prof) => (
            <Card key={prof.id} className="animate-fade-in-up border-border/60 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border bg-muted">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?seed=${prof.avatarSeed}`}
                    />
                    <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-base leading-tight">{prof.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{prof.specialty}</p>
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
                      onClick={() => handleRemove(prof.id)}
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
                    {(Object.keys(areaDetails) as Area[])
                      .filter((area) => area !== prof.baseArea)
                      .map((area) => {
                        const detail = areaDetails[area]
                        const Icon = detail.icon
                        return (
                          <div key={area} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-md ${detail.bg}`}>
                                <Icon className={`h-4 w-4 ${detail.color}`} />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">
                                {detail.label}
                              </span>
                            </div>
                            <Switch
                              checked={prof.permissions[area]}
                              onCheckedChange={() => togglePermission(prof.id, area)}
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {professionals.length === 0 && (
            <div className="col-span-full p-12 text-center text-muted-foreground border rounded-xl border-dashed">
              Nenhum profissional conectado no momento.
            </div>
          )}
        </div>
      </PageContent>
    </div>
  )
}
