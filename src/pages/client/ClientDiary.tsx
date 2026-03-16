import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dumbbell,
  Apple,
  Brain,
  BookOpen,
  Check,
  Frown,
  Meh,
  Smile,
  Laugh,
  Play,
} from 'lucide-react'

const ProfCard = ({ n, r, img, fb }: { n: string; r: string; img?: string; fb: string }) => (
  <Card className="mb-6 bg-muted/40 border-dashed shadow-sm">
    <CardContent className="p-4 flex items-center gap-4">
      <Avatar className="h-12 w-12 border">
        <AvatarImage src={img} />
        <AvatarFallback>{fb}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">{n}</p>
        <p className="text-xs text-muted-foreground">{r}</p>
      </div>
    </CardContent>
  </Card>
)

const CheckItem = ({
  id,
  label,
  border = true,
}: {
  id: string
  label: string
  border?: boolean
}) => (
  <div
    className={`flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors ${border ? 'border-b' : ''}`}
  >
    <Checkbox id={id} className="h-5 w-5" />
    <Label htmlFor={id} className="flex-1 cursor-pointer text-sm font-medium">
      {label}
    </Label>
  </div>
)

export default function ClientDiary() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Meu Diário" />
      <PageContent className="max-w-4xl mx-auto w-full">
        <Tabs defaultValue="nutricao" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
            <TabsTrigger value="nutricao" className="gap-2 h-full">
              <Apple className="h-4 w-4 hidden sm:block" />
              <span>Nutrição</span>
            </TabsTrigger>
            <TabsTrigger value="treino" className="gap-2 h-full">
              <Dumbbell className="h-4 w-4 hidden sm:block" />
              <span>Treino</span>
            </TabsTrigger>
            <TabsTrigger value="mente" className="gap-2 h-full">
              <Brain className="h-4 w-4 hidden sm:block" />
              <span>Mente</span>
            </TabsTrigger>
            <TabsTrigger value="estudos" className="gap-2 h-full">
              <BookOpen className="h-4 w-4 hidden sm:block" />
              <span>Estudos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutricao" className="space-y-4 animate-fade-in-up">
            <ProfCard
              n="Dra. Thaís"
              r="Nutricionista"
              img="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3"
              fb="TH"
            />
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Calorias Consumidas vs. Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">1.200 kcal</span>
                  <span className="text-muted-foreground">2.000 kcal</span>
                </div>
                <Progress value={60} className="h-2" />
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: 'Café da Manhã',
                  h: '08:00',
                  i: ['2 Ovos mexidos', '1 Fatia de pão integral', 'Café sem açúcar'],
                  m: [15, 12, 10],
                },
                {
                  t: 'Almoço',
                  h: '12:30',
                  i: ['150g Frango grelhado', '100g Arroz integral', 'Salada à vontade'],
                  m: [30, 45, 15],
                },
              ].map((m, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{m.t}</CardTitle>
                    <CardDescription>{m.h}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                      {m.i.map((x, j) => (
                        <li key={j}>• {x}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 text-xs font-medium mb-4 bg-muted/50 p-2 rounded-md justify-center">
                      <span className="text-blue-600 dark:text-blue-400">Carbo: {m.m[0]}g</span>
                      <span className="text-red-600 dark:text-red-400">Proteína: {m.m[1]}g</span>
                      <span className="text-amber-600 dark:text-amber-400">Gordura: {m.m[2]}g</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                    >
                      <Check className="h-4 w-4" /> Marcar como consumido
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="treino" className="space-y-4 animate-fade-in-up">
            <ProfCard
              n="Prof. Marcos"
              r="Educador Físico"
              img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4"
              fb="MA"
            />
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-lg font-semibold tracking-tight">Treino de Hipertrofia</h3>
              <span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">
                45 min
              </span>
            </div>
            <div className="space-y-3">
              {[
                { n: 'Supino Reto com Barra', s: '3x12', r: '60s' },
                { n: 'Desenvolvimento com Halteres', s: '4x10', r: '45s' },
                { n: 'Tríceps Pulley', s: '3x15', r: '45s' },
              ].map((ex, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">{ex.n}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded">Séries: {ex.s}</span>
                        <span className="bg-muted px-2 py-0.5 rounded">Descanso: {ex.r}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg">
                      <Label className="text-xs whitespace-nowrap font-medium text-muted-foreground">
                        Carga (kg):
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="w-20 h-8 text-sm bg-background"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mente" className="space-y-6 animate-fade-in-up">
            <ProfCard
              n="Dr. Roberto"
              r="Psicólogo"
              img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5"
              fb="RO"
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-center">
                  Como você está se sentindo hoje?
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center gap-2 sm:gap-6">
                <Button
                  variant="ghost"
                  className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Frown className="h-10 w-10 text-blue-400" />
                  <span className="text-xs font-medium">Triste</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Meh className="h-10 w-10 text-slate-400" />
                  <span className="text-xs font-medium">Neutro</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-green-50 hover:text-green-600"
                >
                  <Smile className="h-10 w-10 text-green-400" />
                  <span className="text-xs font-medium">Feliz</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Laugh className="h-10 w-10 text-yellow-500" />
                  <span className="text-xs font-medium">Excelente</span>
                </Button>
              </CardContent>
            </Card>
            <div>
              <h3 className="font-semibold text-lg mb-3 px-1">Hábitos Diários</h3>
              <Card>
                <CardContent className="p-0">
                  <CheckItem id="h1" label="Meditação 10 min" />
                  <CheckItem id="h2" label="Leitura (15 páginas)" />
                  <CheckItem id="h3" label="Respiração Guiada" border={false} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="estudos" className="space-y-6 animate-fade-in-up">
            <ProfCard
              n="Você"
              r="Gerenciado por você"
              img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2"
              fb="VC"
            />
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardContent className="p-8 text-center space-y-5">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Sessão de Foco</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Concentre-se em suas tarefas usando a técnica Pomodoro. 25 minutos de foco
                    profundo para estudos.
                  </p>
                </div>
                <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12">
                  <Play className="h-4 w-4 fill-current" />
                  Iniciar Sessão de Foco
                </Button>
              </CardContent>
            </Card>
            <div>
              <h3 className="font-semibold text-lg mb-3 px-1">Revisões do Dia</h3>
              <Card>
                <CardContent className="p-0">
                  <CheckItem id="e1" label="Revisar lista de ideogramas (HSK1)" />
                  <CheckItem id="e2" label="Trabalho prático da faculdade" />
                  <CheckItem id="e3" label="Leitura de artigo sobre Produtividade" border={false} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
