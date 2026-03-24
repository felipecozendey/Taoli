import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BrainCircuit, FileText, Library, Activity } from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { studyService, type StudyNote, type StudyFolder } from '@/services/study'

export function StudyDashboardPanel() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [folders, setFolders] = useState<StudyFolder[]>([])
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const [notesRes, foldersRes, flashcardsRes] = await Promise.all([
        studyService.getNotes(),
        studyService.getFolders(),
        studyService.getAllUserFlashcards(),
      ])

      if (notesRes.data) setNotes(notesRes.data)
      if (foldersRes.data) setFolders(foldersRes.data)
      if (flashcardsRes.data) setFlashcards(flashcardsRes.data)

      setIsLoading(false)
    }

    loadData()
  }, [])

  const mediaData = useMemo(() => {
    let text = 0
    let pdf = 0
    let visual = 0

    notes.forEach((note) => {
      const content = note.content || ''
      if (content.includes('data-type="pdf-block"')) {
        pdf++
      } else if (content.includes('<img')) {
        visual++
      } else {
        text++
      }
    })

    return [
      { name: 'Texto Puro', value: text, color: '#3b82f6' },
      { name: 'PDFs Lidos', value: pdf, color: '#ef4444' },
      { name: 'Notas Visuais', value: visual, color: '#10b981' },
    ].filter((item) => item.value > 0)
  }, [notes])

  const folderData = useMemo(() => {
    const folderCounts: Record<string, number> = {}
    let unorganized = 0

    notes.forEach((note) => {
      if (note.folder_id) {
        folderCounts[note.folder_id] = (folderCounts[note.folder_id] || 0) + 1
      } else {
        unorganized++
      }
    })

    const data = folders
      .map((folder) => ({
        name: folder.name,
        notas: folderCounts[folder.id] || 0,
      }))
      .filter((f) => f.notas > 0)

    if (unorganized > 0) {
      data.push({ name: 'Sem Pasta', notas: unorganized })
    }

    return data.sort((a, b) => b.notas - a.notas).slice(0, 10)
  }, [notes, folders])

  const srsStats = useMemo(() => {
    const now = new Date().toISOString()
    let dueCount = 0
    let totalEfactor = 0

    flashcards.forEach((card) => {
      if (!card.next_review || card.next_review <= now) {
        dueCount++
      }
      totalEfactor += card.efactor || card.ease_factor || 2.5
    })

    const avgEfactor = flashcards.length > 0 ? totalEfactor / flashcards.length : 0

    return {
      dueCount,
      avgEfactor: avgEfactor.toFixed(1),
    }
  }, [flashcards])

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[104px] rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[320px] rounded-xl" />
          <Skeleton className="h-[320px] rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Segundo Cérebro
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total de notas criadas</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estruturas</CardTitle>
            <Library className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Pastas organizadoras</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revisões Pendentes
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${srsStats.dueCount > 0 ? 'text-red-500' : ''}`}>
              {srsStats.dueCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cartas a revisar hoje</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Força da Memória
            </CardTitle>
            <BrainCircuit className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{srsStats.avgEfactor}x</div>
            <p className="text-xs text-muted-foreground mt-1">Multiplicador médio (e-factor)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/10 bg-primary/5 shadow-sm flex flex-col">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold">Tipos de Mídia</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 min-h-[250px] w-full flex flex-col">
            {mediaData.length > 0 ? (
              <>
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid hsl(var(--border))',
                          backgroundColor: 'hsl(var(--background))',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Pie
                        data={mediaData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        strokeWidth={2}
                        stroke="hsl(var(--background))"
                        paddingAngle={5}
                      >
                        {mediaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ChartLegendCustom data={mediaData} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Sem dados de mídia para exibir
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-6 border-primary/10 bg-primary/5 shadow-sm flex flex-col">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold">Volume por Assunto</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 min-h-[250px] w-full">
            {folderData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={folderData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={12}
                    tick={{ fill: 'currentColor' }}
                    opacity={0.7}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
                    tick={{ fill: 'currentColor' }}
                    opacity={0.7}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--primary))', opacity: 0.1 }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid hsl(var(--border))',
                      backgroundColor: 'hsl(var(--background))',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="notas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Sem dados de pastas para exibir
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ChartLegendCustom({ data }: { data: any[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-muted-foreground">{entry.name}</span>
        </div>
      ))}
    </div>
  )
}
