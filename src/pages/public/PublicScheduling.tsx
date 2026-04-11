import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar as CalendarIcon, Clock, User, CheckCircle2 } from 'lucide-react'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function PublicScheduling() {
  const { profId } = useParams()
  const { toast } = useToast()

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Em um cenário real, isto viria do backend baseado nas configurações do profissional (profId)
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time) return

    setIsSubmitted(true)
    toast({
      title: 'Consulta agendada com sucesso!',
      description: 'O profissional entrará em contacto para confirmar.',
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center py-12 animate-fade-in-up">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <CardTitle className="text-2xl mb-2">Agendamento Solicitado</CardTitle>
          <CardDescription className="text-base px-4">
            Os seus dados foram enviados. Em breve receberá a confirmação da sua consulta no e-mail
            ou WhatsApp.
          </CardDescription>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Agendar Consulta</h1>
          <p className="text-muted-foreground">
            Selecione o melhor dia e horário para o seu atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="w-5 h-5 text-primary" />
                1. Escolha a Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto bg-card"
                locale={ptBR}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </CardContent>
          </Card>

          <Card className={cn('transition-opacity', !date && 'opacity-50 pointer-events-none')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                2. Escolha o Horário
              </CardTitle>
              <CardDescription>
                {date
                  ? format(date, "dd 'de' MMMM", { locale: ptBR })
                  : 'Selecione uma data primeiro'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={time === slot ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card
          className={cn('transition-opacity', (!date || !time) && 'opacity-50 pointer-events-none')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              3. Os Seus Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input required placeholder="Ex: João Silva" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input type="email" required placeholder="joao@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label>Telemóvel (WhatsApp)</Label>
                  <Input type="tel" required placeholder="912 345 678" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4" size="lg">
                Confirmar Agendamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
