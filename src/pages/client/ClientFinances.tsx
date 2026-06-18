import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableRow, TableFooter } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Wallet, ShieldCheck, TrendingUp, TrendingDown, Eye, EyeOff, Plus } from 'lucide-react'
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalClose,
} from '@/components/ui/responsive-modal'

export default function ClientFinances() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salário',
      type: 'Receita',
      amount: 8000,
      date: '2023-10-05',
      category: 'Trabalho',
    },
    {
      id: 2,
      description: 'Aluguel',
      type: 'Despesa',
      amount: 2500,
      date: '2023-10-10',
      category: 'Moradia',
    },
    {
      id: 3,
      description: 'Mercado',
      type: 'Despesa',
      amount: 800,
      date: '2023-10-15',
      category: 'Alimentação',
    },
  ])

  const [accounts] = useState([
    { id: 1, name: 'Conta Corrente', balance: 5000 },
    { id: 2, name: 'Investimentos', balance: 15000 },
  ])

  const [settings, setSettings] = useState({ hideFinancialValues: false })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTx, setNewTx] = useState({ description: '', type: 'Despesa', amount: '', category: '' })

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0)
  const totalIncome = transactions
    .filter((t) => t.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'Despesa')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const netResult = totalIncome - totalExpense
  const monthlyExpenses = totalExpense
  const emergencyFundMonths =
    monthlyExpenses > 0 ? (totalBalance / monthlyExpenses).toFixed(1) : '∞'

  const formatCurrency = (value: number) => {
    if (settings.hideFinancialValues) return 'R$ *****'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const togglePrivacy = () => {
    setSettings((s) => ({ ...s, hideFinancialValues: !s.hideFinancialValues }))
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTx.description || !newTx.amount) return

    setTransactions((prev) => [
      {
        id: Date.now(),
        description: newTx.description,
        type: newTx.type,
        amount: Number(newTx.amount),
        date: new Date().toISOString().split('T')[0],
        category: newTx.category || 'Outros',
      },
      ...prev,
    ])
    setNewTx({ description: '', type: 'Despesa', amount: '', category: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minhas Finanças">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={togglePrivacy} title="Alternar Privacidade">
            {settings.hideFinancialValues ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
          <ResponsiveModal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <ResponsiveModalTrigger asChild>
              <Button className="h-11 px-4 gap-2 rounded-full md:rounded-md">
                <Plus className="w-5 h-5 md:mr-1" />
                <span className="hidden md:inline">Nova Transação</span>
              </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddTransaction}>
                <ResponsiveModalHeader>
                  <ResponsiveModalTitle>Nova Transação</ResponsiveModalTitle>
                  <ResponsiveModalDescription>
                    Adicione uma nova receita ou despesa.
                  </ResponsiveModalDescription>
                </ResponsiveModalHeader>
                <div className="grid gap-4 py-4 px-4 sm:px-0">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-base sm:text-sm">
                      Tipo
                    </Label>
                    <Select
                      value={newTx.type}
                      onValueChange={(v) => setNewTx({ ...newTx, type: v })}
                    >
                      <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Receita">Receita</SelectItem>
                        <SelectItem value="Despesa">Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base sm:text-sm">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      className="h-12 sm:h-10 text-base sm:text-sm"
                      placeholder="Ex: Almoço"
                      value={newTx.description}
                      onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-base sm:text-sm">
                      Valor (R$)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      className="h-12 sm:h-10 text-base sm:text-sm"
                      placeholder="0.00"
                      value={newTx.amount}
                      onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base sm:text-sm">
                      Categoria
                    </Label>
                    <Select
                      value={newTx.category}
                      onValueChange={(v) => setNewTx({ ...newTx, category: v })}
                    >
                      <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alimentação">Alimentação</SelectItem>
                        <SelectItem value="Moradia">Moradia</SelectItem>
                        <SelectItem value="Trabalho">Trabalho</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <ResponsiveModalFooter className="px-4 sm:px-0 pb-4 sm:pb-0 pt-2">
                  <ResponsiveModalClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 sm:h-10 w-full sm:w-auto"
                    >
                      Cancelar
                    </Button>
                  </ResponsiveModalClose>
                  <Button type="submit" className="h-12 sm:h-10 w-full sm:w-auto">
                    Salvar
                  </Button>
                </ResponsiveModalFooter>
              </form>
            </ResponsiveModalContent>
          </ResponsiveModal>
        </div>
      </DashboardHeader>
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/80 to-blue-800 text-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Saldo Total</CardTitle>
              <Wallet className="h-4 w-4 text-white/90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fundo de Emergência</CardTitle>
              <ShieldCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {settings.hideFinancialValues ? '*****' : `${emergencyFundMonths} meses`}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
                {formatCurrency(totalIncome)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-500">
                {formatCurrency(totalExpense)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transacoes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto p-1">
            <TabsTrigger value="transacoes" className="py-2.5 h-auto text-sm">
              Transações
            </TabsTrigger>
            <TabsTrigger value="ativos" className="py-2.5 h-auto text-sm">
              Contas
            </TabsTrigger>
            <TabsTrigger value="familia" className="py-2.5 h-auto text-sm">
              Família
            </TabsTrigger>
            <TabsTrigger value="analise" className="py-2.5 h-auto text-sm">
              Análise e DRE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transacoes" className="mt-0 animate-fade-in-up">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Histórico de Transações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${tx.type === 'Receita' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'}`}
                        >
                          {tx.type === 'Receita' ? (
                            <TrendingUp className="w-5 h-5" />
                          ) : (
                            <TrendingDown className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {tx.date} • {tx.category}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-bold ${tx.type === 'Receita' ? 'text-emerald-600' : 'text-rose-600'}`}
                      >
                        {tx.type === 'Receita' ? '+' : '-'}
                        {formatCurrency(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ativos" className="mt-0 animate-fade-in-up">
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card/50">
              Contas e Ativos em desenvolvimento...
            </div>
          </TabsContent>

          <TabsContent value="familia" className="mt-0 animate-fade-in-up">
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card/50">
              Gestão familiar em desenvolvimento...
            </div>
          </TabsContent>

          <TabsContent value="analise" className="mt-0 animate-fade-in-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Demonstrativo de Resultados (DRE)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-base py-4">
                        Receita Bruta Total
                      </TableCell>
                      <TableCell className="text-right text-emerald-600 font-bold dark:text-emerald-500 text-base">
                        {formatCurrency(totalIncome)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-base py-4">
                        (-) Despesas Totais
                      </TableCell>
                      <TableCell className="text-right text-rose-600 font-bold dark:text-rose-500 text-base">
                        {formatCurrency(totalExpense)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell className="font-semibold text-foreground text-lg py-4">
                        Resultado Líquido
                      </TableCell>
                      <TableCell
                        className={`text-right font-bold text-lg ${
                          netResult >= 0 ? 'text-primary' : 'text-destructive'
                        }`}
                      >
                        {formatCurrency(netResult)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
