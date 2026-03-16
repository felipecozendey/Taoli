import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { BookOpen, Play } from 'lucide-react'

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

export default function ClientStudy() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Estudos & Foco" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <ProfCard
          n="Você"
          r="Gerenciado por você"
          img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2"
          fb="VC"
        />
        <Card className="border-primary/20 bg-primary/5 shadow-sm mb-6">
          <CardContent className="p-8 text-center space-y-5">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Sessão de Foco</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Concentre-se em suas tarefas usando a técnica Pomodoro. 25 minutos de foco profundo
                para estudos.
              </p>
            </div>
            <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12">
              <Play className="h-4 w-4 fill-current" />
              Iniciar Sessão de Foco
            </Button>
          </CardContent>
        </Card>
        <div>
          <h3 className="font-semibold text-lg mb-3 px-1">Revisões e Tarefas do Dia</h3>
          <Card>
            <CardContent className="p-0">
              <CheckItem id="e1" label="Revisar lista de ideogramas (HSK1)" />
              <CheckItem id="e2" label="Trabalho prático da faculdade" />
              <CheckItem id="e3" label="Leitura de artigo sobre Produtividade" border={false} />
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
