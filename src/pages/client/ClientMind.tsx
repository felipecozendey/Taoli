import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Frown, Meh, Smile, Laugh } from 'lucide-react'

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

export default function ClientMind() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Saúde Mental" />
      <PageContent className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <ProfCard
          n="Dr. Roberto"
          r="Psicólogo"
          img="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5"
          fb="RO"
        />
        <Card className="mb-6">
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
          <h3 className="font-semibold text-lg mb-3 px-1">Hábitos de Bem-estar</h3>
          <Card>
            <CardContent className="p-0">
              <CheckItem id="h1" label="Meditação 10 min" />
              <CheckItem id="h2" label="Respiração Guiada" border={false} />
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
