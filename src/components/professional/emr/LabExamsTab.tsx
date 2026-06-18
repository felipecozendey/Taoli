import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, TestTube } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getLabExams, createLabExam, deleteLabExam } from '@/services/emr'

export function LabExamsTab({ clientId }: { clientId: string }) {
  const { toast } = useToast()
  const [exams, setExams] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    marker_name: '',
    value: '',
    unit: '',
    min_ref: '',
    max_ref: '',
  })

  const fetchExams = async () => {
    const { data } = await getLabExams(clientId)
    setExams(data)
  }

  useEffect(() => {
    fetchExams()
  }, [clientId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.marker_name || !form.value) return
    setLoading(true)
    const { error } = await createLabExam({
      client_id: clientId,
      date: form.date,
      marker_name: form.marker_name,
      value: parseFloat(form.value),
      unit: form.unit || '-',
      min_ref: form.min_ref ? parseFloat(form.min_ref) : null,
      max_ref: form.max_ref ? parseFloat(form.max_ref) : null,
    })
    setLoading(false)
    if (error) {
      toast({ title: 'Erro ao salvar exame', variant: 'destructive' })
    } else {
      toast({ title: 'Exame salvo!' })
      setForm({ ...form, marker_name: '', value: '', unit: '', min_ref: '', max_ref: '' })
      fetchExams()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir?')) return
    await deleteLabExam(id)
    fetchExams()
  }

  const getStatusBadge = (val: number, min: number | null, max: number | null) => {
    if (min !== null && val < min)
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Baixo
        </Badge>
      )
    if (max !== null && val > max)
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          Alto
        </Badge>
      )
    if (min !== null && max !== null)
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Normal
        </Badge>
      )
    return <Badge variant="secondary">--</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" /> Exames Laboratoriais
          </h3>
          <p className="text-sm text-muted-foreground">
            Registe os marcadores bioquímicos do paciente.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
            <div className="space-y-2 sm:col-span-1">
              <Label>Data</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Marcador (ex: Glicemia)</Label>
              <Input
                value={form.marker_name}
                onChange={(e) => setForm({ ...form, marker_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-1">
              <Label>Valor</Label>
              <Input
                type="number"
                step="0.01"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-1">
              <Label>Unidade</Label>
              <Input
                placeholder="mg/dL"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-1">
              <Label>Ref. Min / Máx</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  step="0.01"
                  value={form.min_ref}
                  onChange={(e) => setForm({ ...form, min_ref: e.target.value })}
                />
                <Input
                  placeholder="Máx"
                  type="number"
                  step="0.01"
                  value={form.max_ref}
                  onChange={(e) => setForm({ ...form, max_ref: e.target.value })}
                />
              </div>
            </div>
            <div className="sm:col-span-6 flex justify-end mt-2">
              <Button type="submit" disabled={loading}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Exame
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Data</TableHead>
                <TableHead>Marcador</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhum exame registado.
                  </TableCell>
                </TableRow>
              ) : (
                exams.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      {new Intl.DateTimeFormat('pt-BR').format(new Date(e.date))}
                    </TableCell>
                    <TableCell className="font-medium">{e.marker_name}</TableCell>
                    <TableCell>
                      {e.value} <span className="text-xs text-muted-foreground">{e.unit}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {e.min_ref !== null && e.max_ref !== null
                        ? `${e.min_ref} - ${e.max_ref}`
                        : '--'}
                    </TableCell>
                    <TableCell>{getStatusBadge(Number(e.value), e.min_ref, e.max_ref)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(e.id)}
                        className="text-destructive h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
