import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Plus, TrendingDown, TrendingUp, Minus, MoreHorizontal } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface Props {
  assessments: any[]
  onNewAssessment: () => void
  onEditAssessment: (a: any) => void
  onDeleteAssessment: (id: string) => void
}

export function PhysicalAssessmentEvolution({
  assessments,
  onNewAssessment,
  onEditAssessment,
  onDeleteAssessment,
}: Props) {
  const [visible, setVisible] = useState(5)
  const chartData = [...assessments].reverse().map((a) => ({
    date: new Intl.DateTimeFormat('pt-BR').format(new Date(a.date)),
    weight: a.weight || 0,
    body_fat: a.body_fat_percentage || 0,
    muscle_mass: a.muscle_mass_percentage || 0,
  }))

  const last = assessments[0]
  const prev = assessments[1]

  const getDelta = (curr: number, prior: number) => {
    if (!curr || !prior) return null
    const diff = curr - prior
    if (diff > 0)
      return (
        <span className="text-red-500 flex items-center text-xs">
          <TrendingUp className="w-3 h-3 mr-1" /> +{diff.toFixed(1)}
        </span>
      )
    if (diff < 0)
      return (
        <span className="text-emerald-500 flex items-center text-xs">
          <TrendingDown className="w-3 h-3 mr-1" /> {diff.toFixed(1)}
        </span>
      )
    return (
      <span className="text-muted-foreground flex items-center text-xs">
        <Minus className="w-3 h-3 mr-1" /> 0
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Avaliação Física e Composição Corporal
          </h3>
          <p className="text-sm text-muted-foreground">Métricas, dobras cutâneas e evolução.</p>
        </div>
        <Button onClick={onNewAssessment}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Peso Atual</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">
                {last?.weight ? `${last.weight} kg` : '--'}
              </span>
              {getDelta(last?.weight, prev?.weight)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">% Gordura Corporal</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">
                {last?.body_fat_percentage ? `${last.body_fat_percentage}%` : '--'}
              </span>
              {getDelta(last?.body_fat_percentage, prev?.body_fat_percentage)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Massa Muscular</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">
                {last?.muscle_mass_percentage ? `${last.muscle_mass_percentage}%` : '--'}
              </span>
              {getDelta(last?.muscle_mass_percentage, prev?.muscle_mass_percentage)}
            </div>
          </CardContent>
        </Card>
      </div>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Evolução ao Longo do Tempo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                weight: { color: 'hsl(var(--primary))', label: 'Peso (kg)' },
                body_fat: { color: 'hsl(var(--destructive))', label: '% Gordura' },
              }}
              className="h-72 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" fontSize={12} tickMargin={10} />
                  <YAxis yAxisId="left" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    name="Peso (kg)"
                    stroke="var(--color-weight)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="body_fat"
                    name="% Gordura"
                    stroke="var(--color-body_fat)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Histórico de Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6 border rounded-md border-dashed">
              Nenhuma avaliação registada.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>% Gordura</TableHead>
                    <TableHead>TMB</TableHead>
                    <TableHead>VETA</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.slice(0, visible).map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(a.date))}
                      </TableCell>
                      <TableCell>{a.weight ? `${a.weight} kg` : '--'}</TableCell>
                      <TableCell>
                        {a.body_fat_percentage ? `${a.body_fat_percentage} %` : '--'}
                      </TableCell>
                      <TableCell>{a.bmr ? `${a.bmr} kcal` : '--'}</TableCell>
                      <TableCell>{a.tdee ? `${a.tdee} kcal` : '--'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEditAssessment(a)}>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => onDeleteAssessment(a.id)}
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {assessments.length > visible && (
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" onClick={() => setVisible((p) => p + 5)}>
                    Ver Mais
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
