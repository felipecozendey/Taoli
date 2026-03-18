import { useState } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { UserPlus, Copy, ArrowRight, Target, Link as LinkIcon } from 'lucide-react'

interface Patient {
  id: string
  name: string
  status: 'Ativo' | 'Pendente'
  objective: string
}

export default function ProfPatients() {
  const { toast } = useToast()

  const [patients] = useState<Patient[]>([
    { id: '1', name: 'João Silva', status: 'Ativo', objective: 'Hipertrofia' },
    { id: '2', name: 'Maria Santos', status: 'Pendente', objective: 'Emagrecimento' },
  ])

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast({
        title: 'Sucesso!',
        description: 'Código copiado para a área de transferência!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível copiar o código.',
        variant: 'destructive',
      })
    }
  }

  const handleAccess = (name: string) => {
    toast({
      description: `A abrir perfil de ${name}...`,
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Os Meus Pacientes">
        <Dialog>
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
                  value="FIT-X89B2"
                  className="pl-9 font-mono font-medium text-base tracking-wider"
                />
              </div>
              <Button onClick={() => copyCode('FIT-X89B2')} className="shrink-0 gap-2">
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

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up"
          style={{ animationDelay: '50ms' }}
        >
          {patients.map((patient) => (
            <Card
              key={patient.id}
              className="flex flex-col transition-all hover:shadow-md border-border/50"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border shadow-sm">
                    <AvatarFallback className="bg-primary/5 text-primary font-medium">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-base leading-none mb-1.5 text-foreground">
                      {patient.name}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                      <Target className="h-3 w-3 mr-1 opacity-70" />
                      {patient.objective}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    patient.status === 'Ativo'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 shadow-sm'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-900 shadow-sm'
                  }
                >
                  {patient.status}
                </Badge>
              </CardHeader>
              <CardFooter className="mt-auto pt-2 pb-4">
                <Button
                  variant="secondary"
                  className="w-full justify-between group bg-muted/50 hover:bg-muted"
                  onClick={() => handleAccess(patient.name)}
                >
                  <span className="font-medium">Aceder ao Prontuário</span>
                  <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </PageContent>
    </div>
  )
}
