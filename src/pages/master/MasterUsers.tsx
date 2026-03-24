import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Input } from '@/components/ui/input'
import {
  Search,
  Shield,
  Settings,
  Apple,
  Dumbbell,
  Brain,
  Eye,
  Link as LinkIcon,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { getAllProfiles, updateUserAccess, type Profile } from '@/services/master'
import { useAuth } from '@/contexts/AuthContext'
import { LinkClientsModal } from '@/components/master/LinkClientsModal'

const RoleBadge = ({ role }: { role: string }) => {
  switch (role) {
    case 'admin':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Master
        </Badge>
      )
    case 'professional':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Profissional
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
          Cliente
        </Badge>
      )
  }
}

const SpecialtiesList = ({ user }: { user: Profile }) => {
  if (user.role !== 'professional') return <span className="text-muted-foreground text-sm">-</span>

  const active = []
  if (user.is_nutritionist)
    active.push(
      <div key="nutri" title="Nutrição">
        <Apple className="w-4 h-4 text-emerald-500" />
      </div>,
    )
  if (user.is_trainer)
    active.push(
      <div key="trainer" title="Treino">
        <Dumbbell className="w-4 h-4 text-orange-500" />
      </div>,
    )
  if (user.is_psychologist)
    active.push(
      <div key="psy" title="Psicologia">
        <Brain className="w-4 h-4 text-pink-500" />
      </div>,
    )

  if (active.length === 0) return <span className="text-muted-foreground text-sm">Nenhuma</span>
  return <div className="flex gap-2">{active}</div>
}

export default function MasterUsers() {
  const { startImpersonation } = useAuth()
  const [users, setUsers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [linkingProf, setLinkingProf] = useState<Profile | null>(null)
  const [editForm, setEditForm] = useState({
    role: 'client',
    is_nutritionist: false,
    is_trainer: false,
    is_psychologist: false,
  })

  const { toast } = useToast()

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const data = await getAllProfiles()
      setUsers(data)
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar utilizadores',
        description: error.message || 'Verifique a sua ligação ou permissões.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openEditSheet = (user: Profile) => {
    setSelectedUser(user)
    setEditForm({
      role: user.role || 'client',
      is_nutritionist: user.is_nutritionist,
      is_trainer: user.is_trainer,
      is_psychologist: user.is_psychologist,
    })
    setIsSheetOpen(true)
  }

  const handleSave = async () => {
    if (!selectedUser) return

    try {
      const finalNutritionist = editForm.role === 'professional' ? editForm.is_nutritionist : false
      const finalTrainer = editForm.role === 'professional' ? editForm.is_trainer : false
      const finalPsychologist = editForm.role === 'professional' ? editForm.is_psychologist : false

      await updateUserAccess(selectedUser.id, {
        role: editForm.role,
        is_nutritionist: finalNutritionist,
        is_trainer: finalTrainer,
        is_psychologist: finalPsychologist,
      })

      toast({ title: 'Acessos atualizados com sucesso!' })
      setIsSheetOpen(false)
      fetchUsers()
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar',
        description: error.message || 'Não foi possível atualizar os acessos do utilizador.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Gestão de Utilizadores">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar utilizadores..."
            className="pl-8 bg-muted/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </DashboardHeader>

      <PageContent>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Administre os acessos, papéis e especialidades de todos os utilizadores da plataforma.
          </p>
        </div>

        <div className="rounded-md border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Papel Base</TableHead>
                <TableHead>Especialidades</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[80px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[120px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-[100px] ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{user.name || 'Sem nome'}</span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {user.email || 'Sem email'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role || 'client'} />
                    </TableCell>
                    <TableCell>
                      <SpecialtiesList user={user} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => startImpersonation(user)}>
                          <Eye className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Acessar Conta</span>
                        </Button>

                        {(user.role === 'professional' || user.role === 'admin') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLinkingProf(user)}
                            title="Gerir Pacientes"
                          >
                            <LinkIcon className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Vínculos</span>
                          </Button>
                        )}

                        <Button variant="ghost" size="sm" onClick={() => openEditSheet(user)}>
                          <Shield className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Gerir Acesso</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum utilizador encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </PageContent>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="flex flex-col overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editar Acessos de {selectedUser?.name}</SheetTitle>
            <SheetDescription>
              Altere o papel principal e as especialidades ativas deste utilizador.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 py-6 space-y-8">
            <div className="space-y-3">
              <Label>Papel Principal</Label>
              <Select
                value={editForm.role}
                onValueChange={(val) => setEditForm({ ...editForm, role: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="admin">Master</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editForm.role === 'professional' && (
              <div className="space-y-5 pt-5 border-t animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  Especialidades Liberadas
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-emerald-100/50">
                        <Apple className="w-4 h-4 text-emerald-600" />
                      </div>
                      <Label htmlFor="nutri" className="cursor-pointer font-medium">
                        Nutrição
                      </Label>
                    </div>
                    <Switch
                      id="nutri"
                      checked={editForm.is_nutritionist}
                      onCheckedChange={(c) => setEditForm({ ...editForm, is_nutritionist: c })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-orange-100/50">
                        <Dumbbell className="w-4 h-4 text-orange-600" />
                      </div>
                      <Label htmlFor="treino" className="cursor-pointer font-medium">
                        Educação Física / Fisioterapia (Treino)
                      </Label>
                    </div>
                    <Switch
                      id="treino"
                      checked={editForm.is_trainer}
                      onCheckedChange={(c) => setEditForm({ ...editForm, is_trainer: c })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-pink-100/50">
                        <Brain className="w-4 h-4 text-pink-600" />
                      </div>
                      <Label htmlFor="psico" className="cursor-pointer font-medium">
                        Saúde Mental (Psicologia)
                      </Label>
                    </div>
                    <Switch
                      id="psico"
                      checked={editForm.is_psychologist}
                      onCheckedChange={(c) => setEditForm({ ...editForm, is_psychologist: c })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <SheetFooter className="mt-auto pt-4 border-t">
            <Button onClick={handleSave} className="w-full">
              Salvar Alterações
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {linkingProf && (
        <LinkClientsModal
          isOpen={!!linkingProf}
          onClose={() => setLinkingProf(null)}
          professional={linkingProf}
          allUsers={users}
        />
      )}
    </div>
  )
}
