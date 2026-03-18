import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { UserPlus, Copy, ArrowRight, Target, Link as LinkIcon, Users } from 'lucide-react'
import { getMyPatients } from '@/services/patients'

export default function ProfPatients() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [patients, setPatients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [inviteCode, setInviteCode] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    const fetchPatients = async () => {
      setIsLoading(true)
      try {
        const data = await getMyPatients(user.id)
        setPatients(data || [])
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os pacientes.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchPatients()
  }, [user?.id, toast])

  const handleOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
    if (open) {
      setInviteCode(Math.random().toString(36).substring(2, 8).toUpperCase())
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      toast({ title: 'Sucesso!', description: 'Código copiado para a área de transferência!' })
    } catch {
      toast({ title: 'Erro', description: 'Falha ao copiar código.', variant: 'destructive' })
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return '??'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const formatStatus = (status: string) => {
    return status === 'active' ? 'Ativo' : status === 'pending' ? 'Pendente' : 'Rejeitado'
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Os Meus Pacientes">
        <Dialog open={isDialogOpen} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo Paciente</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Convidar Paciente</DialogTitle>
              <DialogDescription>
                Envie este código para o seu paciente para se conectarem.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  readOnly
                  value={inviteCode}
                  className="pl-9 font-mono font-medium tracking-wider"
                />
              </div>
              <Button onClick={copyCode} className="shrink-0 gap-2">
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copiar Link</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <PageContent>
        <div className="mb-6 animate-fade-in-up">
          <p className="text-muted-foreground text-sm md:text-base">
            Faça a gestão da sua lista de clientes e envie novos convites.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col h-[140px]">
                <CardHeader className="flex flex-row items-start gap-4 pb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : patients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up border rounded-lg bg-card/50 border-dashed">
            <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground">Ainda não tem pacientes.</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mb-6">
              Gere um código de convite para conectar-se ao seu primeiro paciente.
            </p>
            <Button onClick={() => handleOpenDialog(true)} variant="secondary">
              <UserPlus className="mr-2 h-4 w-4" />
              Convidar Paciente
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {patients.map((link) => {
              const clientData = Array.isArray(link.client) ? link.client[0] : link.client
              const statusStr = formatStatus(link.status)

              return (
                <Card
                  key={link.id}
                  className="flex flex-col transition-all hover:shadow-md border-border/50"
                >
                  <CardHeader className="flex flex-row items-start justify-between pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border shadow-sm">
                        <AvatarFallback className="bg-primary/5 text-primary font-medium">
                          {getInitials(clientData?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-base leading-none mb-1.5 text-foreground line-clamp-1">
                          {clientData?.name || 'Sem Nome'}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground font-medium">
                          <Target className="h-3 w-3 mr-1 opacity-70" />
                          Saúde Geral
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        link.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                          : 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
                      }
                    >
                      {statusStr}
                    </Badge>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-2 pb-4">
                    <Button
                      variant="secondary"
                      className="w-full justify-between group bg-muted/50 hover:bg-muted"
                      onClick={() => toast({ description: 'A abrir prontuário...' })}
                    >
                      <span className="font-medium">Aceder ao Prontuário</span>
                      <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </PageContent>
    </div>
  )
}
