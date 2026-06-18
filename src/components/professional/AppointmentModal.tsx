import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { getMyPatients } from '@/services/patients'
import {
  createAppointment,
  createAppointments,
  updateAppointment,
  deleteAppointment,
} from '@/services/clinic'
import { addWeeks, addMonths, format, parseISO } from 'date-fns'
import { toast } from 'sonner'

export function AppointmentModal({
  isOpen,
  onClose,
  initialStart,
  editingAppointment,
  onSaved,
}: any) {
  const { user } = useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(false)

  const [title, setTitle] = useState('')
  const [clientId, setClientId] = useState('none')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [status, setStatus] = useState('scheduled')
  const [recurrence, setRecurrence] = useState('none')
  const [occurrences, setOccurrences] = useState(1)

  useEffect(() => {
    let isMounted = true

    if (user) {
      setIsLoadingPatients(true)
      getMyPatients(user.id)
        .then((data) => {
          if (isMounted && Array.isArray(data)) {
            const validPatients = data
              .map((d: any) => d.client)
              .filter((client: any) => client !== null && client !== undefined && client.id)
            setPatients(validPatients)
          }
        })
        .catch((error) => console.error('Error fetching patients:', error))
        .finally(() => {
          if (isMounted) setIsLoadingPatients(false)
        })
    }

    return () => {
      isMounted = false
    }
  }, [user])

  useEffect(() => {
    if (isOpen) {
      if (editingAppointment) {
        setTitle(editingAppointment.title)
        setClientId(editingAppointment.client_id || 'none')
        const start = parseISO(editingAppointment.start_time)
        const end = parseISO(editingAppointment.end_time)
        setDate(format(start, 'yyyy-MM-dd'))
        setStartTime(format(start, 'HH:mm'))
        setEndTime(format(end, 'HH:mm'))
        setStatus(editingAppointment.status || 'scheduled')
        setRecurrence('none')
        setOccurrences(1)
      } else {
        setTitle('')
        setClientId('none')
        setDate(format(initialStart, 'yyyy-MM-dd'))
        setStartTime('09:00')
        setEndTime('10:00')
        setStatus('scheduled')
        setRecurrence('none')
        setOccurrences(1)
      }
    }
  }, [isOpen, initialStart, editingAppointment])

  const handleSave = async () => {
    if (!title || !date || !startTime || !endTime)
      return toast.error('Preencha os campos obrigatórios')

    const startIso = new Date(`${date}T${startTime}:00`).toISOString()
    const endIso = new Date(`${date}T${endTime}:00`).toISOString()

    const baseData = {
      professional_id: user?.id,
      client_id: clientId === 'none' ? null : clientId,
      title,
      status,
      appointment_type: 'consultation',
    }

    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, {
          ...baseData,
          start_time: startIso,
          end_time: endIso,
        })
      } else {
        if (recurrence === 'none' || occurrences <= 1) {
          await createAppointment({ ...baseData, start_time: startIso, end_time: endIso })
        } else {
          const bulk = []
          for (let i = 0; i < occurrences; i++) {
            let start = new Date(`${date}T${startTime}:00`)
            let end = new Date(`${date}T${endTime}:00`)
            if (recurrence === 'weekly') {
              start = addWeeks(start, i)
              end = addWeeks(end, i)
            } else if (recurrence === 'monthly') {
              start = addMonths(start, i)
              end = addMonths(end, i)
            }
            bulk.push({
              ...baseData,
              start_time: start.toISOString(),
              end_time: end.toISOString(),
              recurrence_rule: recurrence,
            })
          }
          await createAppointments(bulk)
        }
      }
      toast.success('Agendamento salvo')
      onSaved()
      onClose()
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const handleDelete = async () => {
    if (!editingAppointment) return
    try {
      await deleteAppointment(editingAppointment.id)
      toast.success('Agendamento excluído')
      onSaved()
      onClose()
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Consulta de Rotina"
            />
          </div>
          <div className="space-y-2">
            <Label>Paciente (Opcional)</Label>
            <Select value={clientId} onValueChange={setClientId} disabled={isLoadingPatients}>
              <SelectTrigger>
                <SelectValue
                  placeholder={isLoadingPatients ? 'Carregando pacientes...' : 'Selecione...'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                {patients.length === 0 && !isLoadingPatients && (
                  <SelectItem value="empty" disabled>
                    Nenhum paciente encontrado
                  </SelectItem>
                )}
                {patients.map((p) =>
                  p?.id ? (
                    <SelectItem key={p?.id} value={p?.id}>
                      {p?.name || p?.email || 'Sem nome'}
                    </SelectItem>
                  ) : null,
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Início</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fim</Label>
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Agendado (Azul)</SelectItem>
                  <SelectItem value="confirmed">Confirmado (Verde)</SelectItem>
                  <SelectItem value="canceled">Cancelado (Vermelho)</SelectItem>
                  <SelectItem value="completed">Concluído (Cinza)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!editingAppointment && (
              <div className="space-y-2">
                <Label>Repetição</Label>
                <Select value={recurrence} onValueChange={setRecurrence}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {!editingAppointment && recurrence !== 'none' && (
            <div className="space-y-2">
              <Label>Ocorrências</Label>
              <Input
                type="number"
                min={2}
                max={24}
                value={occurrences}
                onChange={(e) => setOccurrences(Number(e.target.value))}
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          {editingAppointment ? (
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          ) : (
            <div></div>
          )}
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
