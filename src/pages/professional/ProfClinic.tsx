import { useState, useEffect, useMemo } from 'react'
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Briefcase,
  Plus,
  Calendar as CalendarIcon,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  MoreVertical,
  Link,
  QrCode,
  Settings,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  getAppointmentsByDate,
  createAppointment,
  getTransactionsByMonth,
  createTransaction,
  getServicePlans,
  createServicePlan,
  getSubscriptions,
  updateSubscriptionStatus,
} from '@/services/clinic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const chartData = [
  { name: 'Jan', income: 4000, expense: 1200 },
  { name: 'Fev', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Abr', income: 2780, expense: 3908 },
  { name: 'Mai', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
]

const chartConfig = {
  income: {
    label: 'Receitas',
    color: 'hsl(var(--primary))',
  },
  expense: {
    label: 'Despesas',
    color: 'hsl(var(--destructive))',
  },
}

export default function ProfClinic() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [plans, setPlans] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  const [isApptOpen, setIsApptOpen] = useState(false)
  const [isTxOpen, setIsTxOpen] = useState(false)
  const [isPlanOpen, setIsPlanOpen] = useState(false)

  const loadAppointments = async () => {
    if (!user) return
    try {
      const start = startOfDay(selectedDate).toISOString()
      const end = endOfDay(selectedDate).toISOString()
      const data = await getAppointmentsByDate(user.id, start, end)
      setAppointments(data)
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar agenda',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const loadTransactions = async () => {
    if (!user) return
    try {
      const now = new Date()
      const start = format(startOfMonth(now), 'yyyy-MM-dd')
      const end = format(endOfMonth(now), 'yyyy-MM-dd')
      const data = await getTransactionsByMonth(user.id, start, end)
      setTransactions(data)
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar transações',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const loadPlansAndSubs = async () => {
    if (!user) return
    try {
      const plansData = await getServicePlans(user.id)
      setPlans(plansData)
      const subsData = await getSubscriptions(user.id)
      setSubscriptions(subsData)
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar planos',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [selectedDate, user])

  useEffect(() => {
    loadTransactions()
    loadPlansAndSubs()
  }, [user])

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0,
      exp = 0
    transactions.forEach((t) => {
      if (t.type === 'income') inc += Number(t.amount)
      if (t.type === 'expense') exp += Number(t.amount)
    })
    return { totalIncome: inc, totalExpense: exp, balance: inc - exp }
  }, [transactions])

  const handleCreateAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    const formData = new FormData(e.currentTarget)
    try {
      await createAppointment({
        professional_id: user.id,
        title: formData.get('title'),
        start_time: new Date(formData.get('start_time') as string).toISOString(),
        end_time: new Date(formData.get('end_time') as string).toISOString(),
        status: 'scheduled',
      })
      toast({ title: 'Consulta agendada com sucesso!' })
      setIsApptOpen(false)
      loadAppointments()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const handleCreateTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    const formData = new FormData(e.currentTarget)
    try {
      await createTransaction({
        professional_id: user.id,
        type: formData.get('type'),
        amount: Number(formData.get('amount')),
        description: formData.get('description'),
        transaction_date: formData.get('date'),
        status: 'paid',
      })
      toast({ title: 'Transação registada!' })
      setIsTxOpen(false)
      loadTransactions()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const handleCreatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    const formData = new FormData(e.currentTarget)
    try {
      await createServicePlan({
        professional_id: user.id,
        name: formData.get('name'),
        price: Number(formData.get('price')),
        billing_cycle: formData.get('billing_cycle'),
        description: formData.get('description'),
      })
      toast({ title: 'Plano criado com sucesso!' })
      setIsPlanOpen(false)
      loadPlansAndSubs()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const handleUpdateSubscriptionStatus = async (id: string, status: string) => {
    try {
      await updateSubscriptionStatus(id, status)
      toast({ title: 'Status atualizado com sucesso!' })
      loadPlansAndSubs()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const overdueSubs = subscriptions.filter((s) => s.status === 'overdue')
  const activeSubs = subscriptions.filter((s) => s.status !== 'overdue')

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">O Meu Consultório</h1>
            <p className="text-muted-foreground mt-2">
              Faça a gestão da sua agenda e das finanças.
            </p>
          </div>
          <Briefcase className="h-10 w-10 text-primary opacity-20 md:hidden ml-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" /> Configurar Horários e PIX
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações do Consultório</DialogTitle>
              </DialogHeader>
              <div className="py-12 text-center text-muted-foreground">
                Funcionalidade em desenvolvimento (Em breve)
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => {
              if (user) {
                navigator.clipboard.writeText(window.location.origin + '/book/' + user.id)
                toast({
                  title: 'Link Copiado!',
                  description: 'Envie este link aos seus pacientes no Instagram/WhatsApp.',
                })
              }
            }}
          >
            <Link className="w-4 h-4 mr-2" /> Copiar Link de Agendamento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="calendar">Agenda</TabsTrigger>
          <TabsTrigger value="finance">Financeiro</TabsTrigger>
          <TabsTrigger value="plans">Planos e Contratos</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border bg-card"
                locale={ptBR}
              />
              <Dialog open={isApptOpen} onOpenChange={setIsApptOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Nova Consulta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agendar Consulta</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateAppointment} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Título / Paciente</Label>
                      <Input name="title" required placeholder="Ex: Consulta - Carlos" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Início</Label>
                        <Input name="start_time" type="datetime-local" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Fim</Label>
                        <Input name="end_time" type="datetime-local" required />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Consultas de {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhuma consulta agendada para este dia.
                  </p>
                ) : (
                  appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center border-r pr-4 min-w-[80px]">
                        <span className="font-bold text-lg">
                          {format(new Date(apt.start_time), 'HH:mm')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(apt.end_time), 'HH:mm')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{apt.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          Status: {apt.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                        </p>
                      </div>
                      <div
                        className={cn(
                          'h-3 w-3 rounded-full shrink-0',
                          apt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500',
                        )}
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receitas</p>
                  <h3 className="text-2xl font-bold">€ {totalIncome.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <TrendingDown className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Despesas</p>
                  <h3 className="text-2xl font-bold">€ {totalExpense.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Atual</p>
                  <h3 className="text-2xl font-bold">€ {balance.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 p-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg">Fluxo de Caixa Mensal</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground)/0.2)"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `€${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Transações do Mês</h3>
            <Dialog open={isTxOpen} onOpenChange={setIsTxOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registar Transação</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateTransaction} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select name="type" required defaultValue="income">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Receita</SelectItem>
                          <SelectItem value="expense">Despesa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        name="date"
                        type="date"
                        required
                        defaultValue={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Input name="description" required placeholder="Ex: Consulta João" />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor (€)</Label>
                    <Input
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Guardar</Button>
                  </DialogFooter>
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
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhuma transação encontrada neste mês.
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{format(new Date(tx.transaction_date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="font-medium">{tx.description}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            tx.type === 'income'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500',
                          )}
                        >
                          {tx.type === 'income' ? 'Receita' : 'Despesa'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        € {Number(tx.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Pacotes de Acompanhamento</h3>
                <Dialog open={isPlanOpen} onOpenChange={setIsPlanOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Novo Plano
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Novo Plano</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreatePlan} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome do Plano</Label>
                        <Input name="name" required placeholder="Ex: Mensal Básico" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Preço (€)</Label>
                          <Input
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ciclo de Cobrança</Label>
                          <Select name="billing_cycle" required defaultValue="monthly">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="monthly">Mensal</SelectItem>
                              <SelectItem value="quarterly">Trimestral</SelectItem>
                              <SelectItem value="yearly">Anual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Input name="description" placeholder="Ex: Inclui 1 consulta e chat" />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Guardar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {plans.length === 0 ? (
                  <p className="text-muted-foreground text-sm border rounded-lg p-8 text-center bg-card">
                    Nenhum plano registado.
                  </p>
                ) : (
                  plans.map((plan) => (
                    <Card key={plan.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{plan.name}</h4>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">€ {Number(plan.price).toFixed(2)}</p>
                          <Badge variant="secondary" className="mt-1 capitalize">
                            {plan.billing_cycle === 'monthly' ? 'Mensal' : plan.billing_cycle}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pacientes Ativos & Inadimplência</h3>

              {overdueSubs.length > 0 && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>
                    Existem {overdueSubs.length} pacientes com pagamentos em atraso!
                    <div className="mt-2 space-y-2">
                      {overdueSubs.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between bg-destructive/10 p-2 rounded-md gap-2 flex-wrap"
                        >
                          <span className="font-medium text-destructive-foreground">
                            {sub.client?.name || 'Cliente'}
                          </span>
                          <div className="flex items-center gap-2 ml-auto">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 text-xs bg-background/50 hover:bg-background/80 text-destructive-foreground"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.origin + '/pay/' + sub.id,
                                )
                                toast({
                                  title: 'Link de cobrança copiado!',
                                  description:
                                    'Link de cobrança copiado para a área de transferência! Envie para o paciente.',
                                })
                              }}
                            >
                              <QrCode className="w-3 h-3 mr-2" /> Cobrar via PIX/Link
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-destructive-foreground hover:bg-destructive/20"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleUpdateSubscriptionStatus(sub.id, 'active')}
                                >
                                  Marcar como Pago
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateSubscriptionStatus(sub.id, 'cancelled')
                                  }
                                  className="text-destructive"
                                >
                                  Cancelar Contrato
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {activeSubs.length === 0 ? (
                  <p className="text-muted-foreground text-sm border rounded-lg p-8 text-center bg-card">
                    Nenhuma assinatura ativa.
                  </p>
                ) : (
                  activeSubs.map((sub) => (
                    <Card key={sub.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary uppercase">
                            {sub.client?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h4 className="font-semibold">{sub.client?.name || 'Cliente'}</h4>
                            <p className="text-sm text-muted-foreground">{sub.plan?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Próxima Cobrança</p>
                            <p className="text-sm font-medium">
                              {format(new Date(sub.next_billing_date), 'dd/MM/yyyy')}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleUpdateSubscriptionStatus(sub.id, 'overdue')}
                              >
                                Marcar como Atrasado
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateSubscriptionStatus(sub.id, 'cancelled')}
                                className="text-destructive"
                              >
                                Cancelar Contrato
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
