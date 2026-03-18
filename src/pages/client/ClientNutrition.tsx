import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Droplets,
  Flame,
  Utensils,
  ShoppingCart,
  Plus,
  Check,
  Activity,
  Target,
} from 'lucide-react'

const macros = [
  {
    id: 'cal',
    label: 'Calorias',
    icon: Flame,
    color: 'text-orange-500',
    val: 1500,
    max: 2000,
    unit: 'kcal',
  },
  {
    id: 'pro',
    label: 'Proteínas',
    icon: Activity,
    color: 'text-red-500',
    val: 110,
    max: 150,
    unit: 'g',
  },
  {
    id: 'car',
    label: 'Carboidratos',
    icon: Activity,
    color: 'text-blue-500',
    val: 180,
    max: 200,
    unit: 'g',
  },
  {
    id: 'fat',
    label: 'Gorduras',
    icon: Activity,
    color: 'text-amber-500',
    val: 45,
    max: 65,
    unit: 'g',
  },
]

const meals = [
  {
    id: 'm1',
    t: 'Café da Manhã',
    h: '08:00',
    items: ['2 Ovos mexidos', '1 Fatia de pão integral', 'Café sem açúcar'],
  },
  {
    id: 'm2',
    t: 'Almoço',
    h: '12:30',
    items: ['150g Frango grelhado', '100g Arroz integral', 'Salada verde à vontade'],
  },
  {
    id: 'm3',
    t: 'Lanche',
    h: '16:00',
    items: ['1 Iogurte natural', '30g Aveia em flocos', '1 Maçã'],
  },
]

const plan = [
  {
    t: 'Almoço e Jantar',
    i: [
      {
        main: '150g de Peito de Frango grelhado',
        sub: 'OU 150g de Patinho moído OU 150g de Tilápia',
      },
      { main: '100g de Arroz Integral', sub: 'OU 100g de Arroz Branco OU 100g de Macarrão' },
      { main: 'Salada de folhas verdes à vontade', sub: 'Temperar com limão e 1 col. de azeite' },
    ],
  },
]

const shopping = [
  'Maçã (1kg)',
  'Peito de Frango (2kg)',
  'Ovos (30 un)',
  'Arroz Integral (1kg)',
  'Iogurte Natural (500g)',
  'Aveia (500g)',
]

export default function ClientNutrition() {
  const [water, setWater] = useState(0)
  const maxWater = 2000

  const addWater = () => setWater((prev) => Math.min(prev + 250, maxWater))

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minha Nutrição" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Visão Geral</h2>
            <p className="text-muted-foreground text-sm">Acompanhe sua dieta e metas diárias.</p>
          </div>
          <Badge variant="secondary" className="w-fit px-3 py-1 text-sm font-medium">
            Nutricionista: Dra. Thaís
          </Badge>
        </div>

        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="diary" className="py-2 whitespace-normal text-xs sm:text-sm">
              Diário de Hoje
            </TabsTrigger>
            <TabsTrigger value="plan" className="py-2 whitespace-normal text-xs sm:text-sm">
              Meu Plano
            </TabsTrigger>
            <TabsTrigger value="shopping" className="py-2 whitespace-normal text-xs sm:text-sm">
              Lista de Compras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="space-y-6">
            <Card className="border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader className="pb-2 flex flex-row items-start sm:items-center justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Droplets className="h-5 w-5" /> Hidratação
                  </CardTitle>
                  <CardDescription className="text-blue-600/70 dark:text-blue-400/70">
                    Meta diária: {maxWater}ml
                  </CardDescription>
                </div>
                <Button
                  onClick={addWater}
                  size="sm"
                  variant="outline"
                  className="gap-1 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Plus className="h-4 w-4" /> 250ml
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2 font-medium text-blue-900 dark:text-blue-300">
                  <span>{water}ml consumidos</span>
                  <span>{Math.round((water / maxWater) * 100)}%</span>
                </div>
                <Progress
                  value={(water / maxWater) * 100}
                  className="h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {macros.map((m) => (
                <Card key={m.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <m.icon className={`h-5 w-5 ${m.color}`} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        {m.val}/{m.max} {m.unit}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2">{m.label}</p>
                    <Progress value={(m.val / m.max) * 100} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" /> Refeições do Dia
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {meals.map((m) => (
                  <AccordionItem key={m.id} value={m.id} className="border rounded-lg px-4 bg-card">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-base">{m.t}</span>
                        <span className="text-sm text-muted-foreground font-normal">{m.h}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <ul className="space-y-2 mb-4">
                        {m.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/50" /> {item}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                      >
                        <Check className="h-4 w-4" /> Marcar como consumido
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" /> Plano Nutricional Prescrito
                </CardTitle>
                <CardDescription>Consulte as opções e substituições da sua dieta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {plan.map((p, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="font-semibold text-base border-b pb-1">{p.t}</h4>
                    <div className="space-y-4">
                      {p.i.map((item, j) => (
                        <div key={j} className="bg-muted/40 p-3 rounded-md border">
                          <p className="font-medium text-sm text-foreground">{item.main}</p>
                          {item.sub && (
                            <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1">
                              <span className="font-semibold text-primary">Substituição:</span>{' '}
                              {item.sub}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" /> Lista de Compras
                </CardTitle>
                <CardDescription>Baseado no seu plano nutricional.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {shopping.map((item, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border"
                    >
                      <Checkbox id={`item-${i}`} />
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
