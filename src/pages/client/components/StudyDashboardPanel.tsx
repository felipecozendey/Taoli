import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, FileText, Target, Flame } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'

const barData = [
  { day: 'Seg', cards: 12 },
  { day: 'Ter', cards: 25 },
  { day: 'Qua', cards: 15 },
  { day: 'Qui', cards: 30 },
  { day: 'Sex', cards: 22 },
  { day: 'Sáb', cards: 10 },
  { day: 'Dom', cards: 45 },
]

const pieData = [
  { category: 'Fisiologia', value: 40, fill: 'hsl(var(--primary))' },
  { category: 'Anatomia', value: 30, fill: 'hsl(var(--chart-2, 173 58% 39%))' },
  { category: 'Leituras', value: 30, fill: 'hsl(var(--chart-3, 197 37% 24%))' },
]

const barChartConfig = {
  cards: {
    label: 'Revisões',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

const pieChartConfig = {
  Fisiologia: {
    label: 'Fisiologia',
    color: 'hsl(var(--primary))',
  },
  Anatomia: {
    label: 'Anatomia',
    color: 'hsl(var(--chart-2, 173 58% 39%))',
  },
  Leituras: {
    label: 'Leituras',
    color: 'hsl(var(--chart-3, 197 37% 24%))',
  },
} satisfies ChartConfig

export function StudyDashboardPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cartões para Revisar Hoje
            </CardTitle>
            <Brain className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground mt-1">5 a mais que ontem</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Notas
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Segundo cérebro crescendo</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Retenção
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">Acima da média geral</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ofensiva de Estudos
            </CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 dias</div>
            <p className="text-xs text-muted-foreground mt-1">Continue o bom trabalho!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revisões nos últimos 7 dias</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={barChartConfig} className="h-full min-h-[250px] w-full">
              <BarChart
                accessibilityLayer
                data={barData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="cards" fill="var(--color-cards)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição do Segundo Cérebro</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={pieChartConfig} className="h-full min-h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="flex-wrap justify-center mt-4"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
