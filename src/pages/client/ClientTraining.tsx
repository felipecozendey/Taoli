import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

export default function ClientTraining() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Meu Treino" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <ProfCard
          n="Prof. Marcos"
          r="Educador Físico"
          img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4"
          fb="MA"
        />
        <div className="flex items-center justify-between mb-4 px-1">
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
                  <Input type="number" placeholder="0" className="w-20 h-8 text-sm bg-background" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </div>
  )
}
