import { useState, useEffect, useMemo } from 'react'
import { format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Briefcase,
  Plus,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  Link as LinkIcon,
  Settings,
  UserCheck,
  MessageCircle,
  Calendar as CalendarIcon,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  getServicePlans,
  createServicePlan,
  deleteServicePlan,
  getDashboardMetrics,
  getTransactions,
  createTransaction,
  updateTransactionStatus,
} from '@/services/clinic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
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

const chartConfig = {
  income: {
    label: 'Receitas',
    color: 'hsl(var(--primary))',
  },
}

export default function ProfClinic() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [plans, setPlans] = useState<any[]>([])
  const [metrics, setMetrics] = useState({
    monthlyRevenue: 0,
    activePatientsCount: 0,
    delinquency: 0,
    mrr: 0,
    chartTx: [] as any[],
  })

  const [isPlanOpen, setIsPlanOpen] = useState(false)
  const [isTxOpen, setIsTxOpen] = useState(false)

  const loadData = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const [dashMetrics, txData, plansData] = await Promise.all([
        getDashboardMetrics(user.id),
        getTransactions(user.id),
        getServicePlans(user.id),
      ])
      setMetrics(dashMetrics)
      setTransactions(txData ?? [])
      setPlans(plansData ?? [])
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar dados',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user])

  const chartData = useMemo(() => {
    const dataMap: Record<string, number> = {}
    for (let i = 5; i >= 0; i--) {
      const m = subMonths(new Date(), i)
      const label = format(m, 'MMM', { locale: ptBR })
      dataMap[label] = 0
    }
    const safeChartTx = metrics.chartTx ?? []
    safeChartTx.forEach((tx) => {
      const d = new Date(tx.transaction_date)
      const offset = d.getTimezoneOffset() * 60000
      const localD = new Date(d.getTime() + offset)
      const label = format(localD, 'MMM', { locale: ptBR })
      if (dataMap[label] !== undefined) {
        dataMap[label] =
          (Math.round(dataMap[label] * 100) + Math.round(Number(tx.amount) * 100)) / 100
      }
    })
    return Object.keys(dataMap).map((key) => ({ name: key, income: dataMap[key] }))
  }, [metrics.chartTx])

  const formatCurrencyBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const handleDeletePlan = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pacote?')) {
      try {
        await deleteServicePlan(id)
        toast({ title: 'Pacote excluído.' })
        loadData()
      } catch (e: any) {
        toast({ title: 'Erro', description: 'O pacote pode estar em uso.', variant: 'destructive' })
      }
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
      toast({ title: 'Pacote criado com sucesso!' })
      setIsPlanOpen(false)
      loadData()
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
        type: 'income',
        amount: Number(formData.get('amount')),
        description: formData.get('description'),
        transaction_date: formData.get('date'),
        status: formData.get('status'),
      })
      toast({ title: 'Recebimento registrado!' })
      setIsTxOpen(false)
      loadData()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const handleUpdateTxStatus = async (id: string, status: string) => {
    try {
      await updateTransactionStatus(id, status)
      toast({ title: 'Status atualizado com sucesso!' })
      loadData()
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    }
  }

  const handleWhatsAppReminder = (patientName: string, amount: number, description: string) => {
    const text = `Olá${patientName ? ` ${patientName}` : ''}, tudo bem? Estou passando para lembrar sobre o pagamento pendente do plano "${description}" no valor de ${formatCurrencyBRL(amount)}. Qualquer dúvida, estou à disposição!`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500 hover:bg-green-600">Pago</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-yellow-950">Pendente</Badge>
      case 'overdue':
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM Financeiro</h1>
            <p className="text-muted-foreground mt-2">
              Gestão financeira, pacotes e controle de recebimentos.
            </p>
          </div>
          <Briefcase className="h-10 w-10 text-primary opacity-20 md:hidden ml-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" /> Configurações
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações Financeiras</DialogTitle>
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
            <LinkIcon className="w-4 h-4 mr-2" /> Link de Agendamento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-3xl">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="packages">Serviços e Pacotes</TabsTrigger>
          <TabsTrigger value="receivables">Controle de Recebimentos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="h-24" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Faturamento Mensal</p>
                    <h3 className="text-2xl font-bold">
                      {formatCurrencyBRL(metrics.monthlyRevenue)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Inadimplência (A Receber)
                    </p>
                    <h3 className="text-2xl font-bold text-yellow-600">
                      {formatCurrencyBRL(metrics.delinquency)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pacientes Ativos</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {metrics.activePatientsCount}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="mb-6 p-4">
            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Fluxo de Caixa (Últimos 6 Meses)</CardTitle>
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
                    tickFormatter={(value) =>
                      value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      })
                    }
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Gerenciar Serviços</h3>
            <Dialog open={isPlanOpen} onOpenChange={setIsPlanOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Novo Pacote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Pacote de Serviço</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreatePlan} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome do Pacote</Label>
                    <Input name="name" required placeholder="Ex: Mensal Básico" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preço (R$)</Label>
                      <Input name="price" type="number" step="0.01" required placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Ciclo de Cobrança</Label>
                      <Select name="billing_cycle" required defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-off">Consulta Única</SelectItem>
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
                    <Input
                      name="description"
                      placeholder="Ex: Inclui 1 consulta e acompanhamento"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-32 animate-pulse" />
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center p-12 border rounded-lg bg-card text-muted-foreground flex flex-col items-center">
              <Briefcase className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhum pacote de serviço cadastrado.</p>
              <p className="text-sm mt-1">Crie seu primeiro pacote para oferecer aos pacientes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/80" />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">
                          {plan.description || 'Sem descrição'}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="-mr-3 -mt-3 text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeletePlan(plan.id)}
                          >
                            Excluir Pacote
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <p className="font-bold text-xl text-primary">
                        {formatCurrencyBRL(Number(plan.price))}
                      </p>
                      <Badge variant="secondary" className="capitalize font-normal">
                        {plan.billing_cycle === 'monthly'
                          ? 'Mensal'
                          : plan.billing_cycle === 'quarterly'
                            ? 'Trimestral'
                            : plan.billing_cycle === 'yearly'
                              ? 'Anual'
                              : plan.billing_cycle === 'one-off'
                                ? 'Avulso'
                                : plan.billing_cycle}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="receivables" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Lançamentos Financeiros</h3>
            <Dialog open={isTxOpen} onOpenChange={setIsTxOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Novo Recebimento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Recebimento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateTransaction} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Descrição / Referência</Label>
                    <Input name="description" required placeholder="Ex: Mensalidade - João" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Valor (R$)</Label>
                      <Input
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Vencimento</Label>
                      <Input
                        name="date"
                        type="date"
                        required
                        defaultValue={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select name="status" required defaultValue="paid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="overdue">Atrasado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Descrição / Pacote</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Carregando transações...
                    </TableCell>
                  </TableRow>
                ) : transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      <CalendarIcon className="h-10 w-10 mx-auto mb-4 opacity-20" />
                      Nenhum recebimento cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {tx.client?.name || 'Cliente Avulso'}
                      </TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell>{format(new Date(tx.transaction_date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrencyBRL(Number(tx.amount))}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(tx.status || 'unknown')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {tx.status === 'overdue' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-green-200 text-green-700 hover:bg-green-50"
                              onClick={() =>
                                handleWhatsAppReminder(
                                  tx.client?.name || '',
                                  Number(tx.amount),
                                  tx.description,
                                )
                              }
                              title="Lembrar via WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" /> Lembrar
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUpdateTxStatus(tx.id, 'paid')}>
                                Marcar como Pago
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateTxStatus(tx.id, 'pending')}
                              >
                                Marcar como Pendente
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateTxStatus(tx.id, 'overdue')}
                              >
                                Marcar como Atrasado
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
