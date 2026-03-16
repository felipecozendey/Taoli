import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableRow, TableFooter } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Wallet, ShieldCheck, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react'

export default function ClientFinances() {
  const [transactions] = useState([
    { id: 1, description: 'Salário', type: 'Receita', amount: 8000, date: '2023-10-05' },
    { id: 2, description: 'Aluguel', type: 'Despesa', amount: 2500, date: '2023-10-10' },
    { id: 3, description: 'Mercado', type: 'Despesa', amount: 800, date: '2023-10-15' },
  ])

  const [accounts] = useState([
    { id: 1, name: 'Conta Corrente', balance: 5000 },
    { id: 2, name: 'Investimentos', balance: 15000 },
  ])

  const [settings, setSettings] = useState({ hideFinancialValues: false })

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

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minhas Finanças">
        <Button variant="ghost" size="icon" onClick={togglePrivacy} title="Alternar Privacidade">
          {settings.hideFinancialValues ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </Button>
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

        <Tabs defaultValue="analise" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto p-1">
            <TabsTrigger value="transacoes" className="py-2">
              Transações
            </TabsTrigger>
            <TabsTrigger value="ativos" className="py-2">
              Contas e Ativos
            </TabsTrigger>
            <TabsTrigger value="familia" className="py-2">
              Família
            </TabsTrigger>
            <TabsTrigger value="analise" className="py-2">
              Análise e DRE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transacoes" className="mt-0 animate-fade-in-up">
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card/50">
              Em desenvolvimento...
            </div>
          </TabsContent>

          <TabsContent value="ativos" className="mt-0 animate-fade-in-up">
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card/50">
              Em desenvolvimento...
            </div>
          </TabsContent>

          <TabsContent value="familia" className="mt-0 animate-fade-in-up">
            <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card/50">
              Em desenvolvimento...
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
                      <TableCell className="font-medium">Receita Bruta Total</TableCell>
                      <TableCell className="text-right text-emerald-600 font-bold dark:text-emerald-500">
                        {formatCurrency(totalIncome)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">(-) Despesas Totais</TableCell>
                      <TableCell className="text-right text-rose-600 font-bold dark:text-rose-500">
                        {formatCurrency(totalExpense)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell className="font-semibold text-foreground">
                        Resultado Líquido
                      </TableCell>
                      <TableCell
                        className={`text-right font-bold ${
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
