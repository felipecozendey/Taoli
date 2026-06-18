import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getAppointmentsByDate } from '@/services/clinic'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  parseISO,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppointmentModal } from '@/components/professional/AppointmentModal'

export default function ProfCalendar() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [appointments, setAppointments] = useState<any[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [editingAppointment, setEditingAppointment] = useState<any>(null)

  const fetchAppointments = async () => {
    if (!user) return
    const start = startOfMonth(subMonths(currentDate, 1)).toISOString()
    const end = endOfMonth(addMonths(currentDate, 1)).toISOString()
    try {
      const data = await getAppointmentsByDate(user.id, start, end)
      setAppointments(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [user, currentDate])

  const handleNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1))
    if (view === 'week') setCurrentDate(addWeeks(currentDate, 1))
    if (view === 'day') setCurrentDate(addDays(currentDate, 1))
  }

  const handlePrev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1))
    if (view === 'week') setCurrentDate(subWeeks(currentDate, 1))
    if (view === 'day') setCurrentDate(subDays(currentDate, 1))
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setEditingAppointment(null)
    setModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const renderMonth = () => {
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentDate)),
      end: endOfWeek(endOfMonth(currentDate)),
    })
    return (
      <div className="grid grid-cols-7 gap-px bg-border flex-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
          <div key={d} className="bg-muted p-2 text-center text-sm font-semibold">
            {d}
          </div>
        ))}
        {days.map((day) => {
          const dayAppts = appointments.filter((a) => isSameDay(parseISO(a.start_time), day))
          return (
            <div
              key={day.toISOString()}
              className={cn(
                'bg-background min-h-[100px] p-2 hover:bg-muted/50 transition-colors cursor-pointer',
                !isSameMonth(day, currentDate) && 'opacity-50',
              )}
              onClick={() => handleDayClick(day)}
            >
              <div
                className={cn(
                  'text-sm mb-1 font-medium',
                  isSameDay(day, new Date()) &&
                    'bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center rounded-full',
                )}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayAppts.slice(0, 3).map((appt) => (
                  <div
                    key={appt.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingAppointment(appt)
                      setModalOpen(true)
                    }}
                    className={cn(
                      'text-xs p-1 rounded border truncate',
                      getStatusColor(appt.status),
                    )}
                  >
                    {format(parseISO(appt.start_time), 'HH:mm')} - {appt.title}
                  </div>
                ))}
                {dayAppts.length > 3 && (
                  <div className="text-xs text-muted-foreground">+ {dayAppts.length - 3} mais</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Agenda" />
      <PageContent className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Hoje
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="text-lg font-semibold capitalize min-w-[150px]">
              {view === 'month' && format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              {view === 'week' && `Semana de ${format(startOfWeek(currentDate), 'dd/MM')}`}
              {view === 'day' && format(currentDate, 'dd/MM/yyyy')}
            </h2>
          </div>
          <div className="flex gap-1 bg-muted p-1 rounded-md">
            <Button
              variant={view === 'day' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('day')}
            >
              Dia
            </Button>
            <Button
              variant={view === 'week' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('week')}
            >
              Semana
            </Button>
            <Button
              variant={view === 'month' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('month')}
            >
              Mês
            </Button>
          </div>
        </div>

        <div className="flex-1 border rounded-xl overflow-hidden flex flex-col">
          {view === 'month' && renderMonth()}
          {view === 'week' && (
            <div className="flex flex-1 overflow-x-auto bg-border gap-px">
              {eachDayOfInterval({
                start: startOfWeek(currentDate),
                end: endOfWeek(currentDate),
              }).map((day) => (
                <div
                  key={day.toISOString()}
                  className="flex-1 min-w-[150px] bg-background flex flex-col"
                  onClick={() => handleDayClick(day)}
                >
                  <div className="bg-muted p-2 text-center text-sm font-semibold border-b">
                    {format(day, 'EEEE', { locale: ptBR })} <br /> {format(day, 'd/MMM')}
                  </div>
                  <div className="p-2 space-y-2 flex-1">
                    {appointments
                      .filter((a) => isSameDay(parseISO(a.start_time), day))
                      .map((appt) => (
                        <div
                          key={appt.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingAppointment(appt)
                            setModalOpen(true)
                          }}
                          className={cn(
                            'text-xs p-2 rounded border cursor-pointer',
                            getStatusColor(appt.status),
                          )}
                        >
                          <div className="font-semibold">
                            {format(parseISO(appt.start_time), 'HH:mm')}
                          </div>
                          <div className="truncate">{appt.title}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {view === 'day' && (
            <div className="flex-1 p-6 bg-background overflow-y-auto space-y-3">
              {appointments
                .filter((a) => isSameDay(parseISO(a.start_time), currentDate))
                .map((appt) => (
                  <div
                    key={appt.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingAppointment(appt)
                      setModalOpen(true)
                    }}
                    className={cn(
                      'p-4 rounded-lg border cursor-pointer flex gap-4 items-center',
                      getStatusColor(appt.status),
                    )}
                  >
                    <div className="font-bold whitespace-nowrap">
                      {format(parseISO(appt.start_time), 'HH:mm')} -{' '}
                      {format(parseISO(appt.end_time), 'HH:mm')}
                    </div>
                    <div className="flex-1 font-semibold">{appt.title}</div>
                    <div className="text-sm capitalize px-2 py-1 bg-white/50 rounded">
                      {appt.status}
                    </div>
                  </div>
                ))}
              {appointments.filter((a) => isSameDay(parseISO(a.start_time), currentDate)).length ===
                0 && (
                <div
                  className="text-muted-foreground p-4 text-center cursor-pointer"
                  onClick={() => handleDayClick(currentDate)}
                >
                  Nenhum agendamento para este dia. Clique para adicionar.
                </div>
              )}
            </div>
          )}
        </div>
      </PageContent>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialStart={selectedDate}
        editingAppointment={editingAppointment}
        onSaved={fetchAppointments}
      />
    </div>
  )
}
