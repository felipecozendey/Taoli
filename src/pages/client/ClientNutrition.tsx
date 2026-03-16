import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

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

export default function ClientNutrition() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Minha Nutrição" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <ProfCard
          n="Dra. Thaís"
          r="Nutricionista"
          img="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3"
          fb="TH"
        />
        <Card className="mb-6">
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
      </PageContent>
    </div>
  )
}
