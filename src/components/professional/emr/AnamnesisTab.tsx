import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileText, Plus, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  getAnamnesisTemplates,
  createAnamnesisTemplate,
  getAnamnesisResponses,
  createAnamnesisResponse,
} from '@/services/emr'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function AnamnesisTab({
  clientId,
  professionalId,
}: {
  clientId: string
  professionalId: string
}) {
  const { toast } = useToast()
  const [templates, setTemplates] = useState<any[]>([])
  const [responses, setResponses] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [tplName, setTplName] = useState('')
  const [fields, setFields] = useState<any[]>([])

  const loadData = async () => {
    const [tpl, res] = await Promise.all([
      getAnamnesisTemplates(professionalId),
      getAnamnesisResponses(clientId),
    ])
    setTemplates(tpl.data)
    setResponses(res.data)
  }

  useEffect(() => {
    loadData()
  }, [clientId, professionalId])

  const addField = (type: string) => {
    setFields([
      ...fields,
      { id: crypto.randomUUID(), label: `Pergunta ${fields.length + 1}`, type },
    ])
  }

  const saveTemplate = async () => {
    if (!tplName || fields.length === 0) return
    await createAnamnesisTemplate(professionalId, tplName, fields)
    toast({ title: 'Template salvo!' })
    setIsBuilderOpen(false)
    setTplName('')
    setFields([])
    loadData()
  }

  const submitAnamnesis = async () => {
    if (!selectedTemplate) return
    await createAnamnesisResponse(clientId, professionalId, selectedTemplate.id, answers)
    toast({ title: 'Anamnese salva com sucesso!' })
    setSelectedTemplate(null)
    setAnswers({})
    loadData()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Anamnese Dinâmica
          </h3>
          <p className="text-sm text-muted-foreground">
            Preencha formulários personalizados de anamnese.
          </p>
        </div>

        <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Criar Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Construtor de Template de Anamnese</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Template</Label>
                <Input
                  value={tplName}
                  onChange={(e) => setTplName(e.target.value)}
                  placeholder="Ex: Primeira Consulta Nutricional"
                />
              </div>
              <div className="space-y-3">
                <Label>Campos do Formulário</Label>
                {fields.map((f, i) => (
                  <div
                    key={f.id}
                    className="flex gap-2 items-center bg-muted/30 p-2 rounded border"
                  >
                    <Input
                      value={f.label}
                      onChange={(e) => {
                        const newF = [...fields]
                        newF[i].label = e.target.value
                        setFields(newF)
                      }}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                      {f.type}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFields(fields.filter((x) => x.id !== f.id))}
                      className="text-destructive h-8 w-8 p-0"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addField('text')}
                  >
                    + Texto Curto
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addField('textarea')}
                  >
                    + Texto Longo
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addField('date')}
                  >
                    + Data
                  </Button>
                </div>
              </div>
              <Button onClick={saveTemplate} className="w-full mt-4">
                <Save className="h-4 w-4 mr-2" /> Salvar Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preencher Anamnese</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(val) => {
                  const t = templates.find((x) => x.id === val)
                  setSelectedTemplate(t)
                  setAnswers({})
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Histórico</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Accordion type="single" collapsible className="w-full">
                {responses.map((r) => (
                  <AccordionItem key={r.id} value={r.id}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 text-sm">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">
                          {r.template?.name || 'Template Removido'}
                        </span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {new Intl.DateTimeFormat('pt-BR').format(new Date(r.created_at))}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-3 pt-2 bg-muted/10 border-t">
                      {Object.entries(r.responses).map(([question, answer]) => (
                        <div key={question}>
                          <p className="text-xs font-semibold text-muted-foreground">{question}</p>
                          <p className="text-sm whitespace-pre-wrap">{String(answer) || '-'}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {responses.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground p-4">Nenhuma resposta.</p>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedTemplate ? (
            <Card className="border-primary/20 shadow-sm">
              <CardHeader className="border-b bg-muted/20 pb-4">
                <CardTitle>{selectedTemplate.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {selectedTemplate.fields.map((f: any) => (
                  <div key={f.id} className="space-y-2">
                    <Label className="text-base font-medium">{f.label}</Label>
                    {f.type === 'text' && (
                      <Input
                        value={answers[f.label] || ''}
                        onChange={(e) => setAnswers({ ...answers, [f.label]: e.target.value })}
                      />
                    )}
                    {f.type === 'textarea' && (
                      <Textarea
                        className="min-h-[100px]"
                        value={answers[f.label] || ''}
                        onChange={(e) => setAnswers({ ...answers, [f.label]: e.target.value })}
                      />
                    )}
                    {f.type === 'date' && (
                      <Input
                        type="date"
                        value={answers[f.label] || ''}
                        onChange={(e) => setAnswers({ ...answers, [f.label]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t flex justify-end">
                  <Button onClick={submitAnamnesis} className="h-10 px-8">
                    <Save className="h-4 w-4 mr-2" /> Salvar Respostas
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center border-dashed bg-muted/10 min-h-[300px]">
              <div className="text-center text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>Selecione um template ao lado para começar.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
