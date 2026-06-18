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
import { Dumbbell, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getStrengthTests, createStrengthTest, deleteStrengthTest } from '@/services/emr'

export function StrengthTestTab({ clientId }: { clientId: string }) {
  const { toast } = useToast()
  const [tests, setTests] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    exercise: '',
    weight: '',
    reps: '',
  })

  const fetchTests = async () => {
    const { data } = await getStrengthTests(clientId)
    setTests(data)
  }

  useEffect(() => {
    fetchTests()
  }, [clientId])

  const calculate1RM = (w: number, r: number) => {
    if (r === 1) return w
    // Epley Formula
    return w * (1 + r / 30)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.exercise || !form.weight || !form.reps) return
    setLoading(true)
    const w = parseFloat(form.weight)
    const r = parseInt(form.reps)
    const rm = calculate1RM(w, r)

    const { error } = await createStrengthTest({
      client_id: clientId,
      date: form.date,
      exercise_name: form.exercise,
      weight_kg: w,
      reps: r,
      estimated_1rm: rm,
    })
    setLoading(false)
    if (error) toast({ title: 'Erro', variant: 'destructive' })
    else {
      toast({ title: 'Teste de força salvo!' })
      setForm({ ...form, exercise: '', weight: '', reps: '' })
      fetchTests()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir?')) return
    await deleteStrengthTest(id)
    fetchTests()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" /> Testes de Força (1RM)
          </h3>
          <p className="text-sm text-muted-foreground">
            Calcule e acompanhe as estimativas de 1RM (Fórmula de Epley).
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Exercício (ex: Supino Reto)</Label>
              <Input
                value={form.exercise}
                onChange={(e) => setForm({ ...form, exercise: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Carga (kg)</Label>
              <Input
                type="number"
                step="0.5"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Repetições</Label>
              <Input
                type="number"
                value={form.reps}
                onChange={(e) => setForm({ ...form, reps: e.target.value })}
                required
              />
            </div>
            <div className="sm:col-span-5 flex justify-end mt-2">
              <Button type="submit" disabled={loading}>
                <Plus className="h-4 w-4 mr-2" /> Calcular e Salvar
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
                <TableHead>Data</TableHead>
                <TableHead>Exercício</TableHead>
                <TableHead>Carga Utilizada</TableHead>
                <TableHead>1RM Estimado</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nenhum teste registado.
                  </TableCell>
                </TableRow>
              ) : (
                tests.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      {new Intl.DateTimeFormat('pt-BR').format(new Date(t.date))}
                    </TableCell>
                    <TableCell className="font-medium">{t.exercise_name}</TableCell>
                    <TableCell>
                      {t.weight_kg} kg x {t.reps} reps
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      {Number(t.estimated_1rm).toFixed(1)} kg
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(t.id)}
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
