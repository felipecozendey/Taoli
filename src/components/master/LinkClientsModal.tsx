import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Unlink, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  getProfessionalClients,
  linkProfessionalClient,
  unlinkProfessionalClient,
} from '@/services/master'
import type { Profile } from '@/services/master'

interface LinkClientsModalProps {
  isOpen: boolean
  onClose: () => void
  professional: Profile | null
  allUsers: Profile[]
}

export function LinkClientsModal({
  isOpen,
  onClose,
  professional,
  allUsers,
}: LinkClientsModalProps) {
  const [linkedClients, setLinkedClients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  const { toast } = useToast()

  const fetchClients = async () => {
    if (!professional?.id) return
    setIsLoading(true)
    try {
      const data = await getProfessionalClients(professional.id)
      setLinkedClients(data)
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar clientes',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && professional?.id) {
      fetchClients()
      setSelectedClientId('')
    } else {
      setLinkedClients([])
    }
  }, [isOpen, professional?.id])

  const availableClients = allUsers.filter(
    (u) => u.role === 'client' && !linkedClients.some((lc) => lc.client_id === u.id),
  )

  const handleLink = async () => {
    if (!professional?.id || !selectedClientId) return
    setIsLinking(true)
    try {
      await linkProfessionalClient(professional.id, selectedClientId)
      toast({ title: 'Cliente vinculado com sucesso' })
      setSelectedClientId('')
      await fetchClients()
    } catch (error: any) {
      toast({ title: 'Erro ao vincular', description: error.message, variant: 'destructive' })
    } finally {
      setIsLinking(false)
    }
  }

  const handleUnlink = async (clientId: string) => {
    if (!professional?.id) return
    try {
      await unlinkProfessionalClient(professional.id, clientId)
      toast({ title: 'Cliente desvinculado com sucesso' })
      await fetchClients()
    } catch (error: any) {
      toast({ title: 'Erro ao desvincular', description: error.message, variant: 'destructive' })
    }
  }

  // Ensure this is called after all hooks to comply with React hook rules
  if (!professional) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerir Pacientes - {professional.name || 'Sem nome'}</DialogTitle>
          <DialogDescription>
            Vincule ou desvincule pacientes da carteira deste profissional.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 my-4">
          <div className="flex-1">
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um paciente..." />
              </SelectTrigger>
              <SelectContent>
                {availableClients.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    Nenhum paciente disponível
                  </SelectItem>
                ) : (
                  availableClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name || 'Sem nome'} ({client.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleLink}
            disabled={!selectedClientId || selectedClientId === 'empty' || isLinking}
          >
            {isLinking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Vincular
          </Button>
        </div>

        <div className="border rounded-md overflow-hidden bg-card">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium border-b">
            Pacientes Vinculados ({linkedClients.length})
          </div>
          <ScrollArea className="h-[300px]">
            {isLoading ? (
              <div className="p-8 flex justify-center text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : linkedClients.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                Nenhum paciente vinculado a este profissional.
              </div>
            ) : (
              <div className="divide-y">
                {linkedClients.map((link) => (
                  <div
                    key={link.client_id}
                    className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{link.client?.name || 'Sem nome'}</span>
                      <span className="text-xs text-muted-foreground">{link.client?.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleUnlink(link.client_id)}
                      title="Desvincular"
                    >
                      <Unlink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
