import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  PlusCircle,
  MessageCircle,
  Clock,
  User as UserIcon,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Line, LineChart } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface AppointmentWithPatient {
  id: string
  start_time: string
  client_id: string | null
  patient_name: string
  title: string
}

interface RadarAlert {
  id: string
  patientName: string
  type: 'mood' | 'assessment'
  message: string
  level: 'warning' | 'critical'
}

interface ChartDataPoint {
  date: string
  total: number
}

const chartConfig = {
  total: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
}

export default function ProfDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [alerts, setAlerts] = useState<RadarAlert[]>([])
  const [financeChartData, setFinanceChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return

      try {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        // Fetch today's appointments
        const { data: apptsData } = await supabase
          .from('appointments')
          .select('*')
          .eq('professional_id', user.id)
          .gte('start_time', startOfDay.toISOString())
          .lte('start_time', endOfDay.toISOString())
          .order('start_time', { ascending: true })

        let mappedAppts: AppointmentWithPatient[] = []

        if (apptsData && apptsData.length > 0) {
          const clientIds = apptsData.map((a) => a.client_id).filter(Boolean) as string[]
          let profilesMap: Record<string, string> = {}

          if (clientIds.length > 0) {
            const { data: profilesData } = await supabase
              .from('profiles')
              .select('id, name')
              .in('id', clientIds)

            if (profilesData) {
              profilesMap = profilesData.reduce(
                (acc, p) => ({ ...acc, [p.id]: p.name || 'Paciente' }),
                {},
              )
            }
          }

          mappedAppts = apptsData.map((a) => ({
            id: a.id,
            start_time: a.start_time,
            client_id: a.client_id,
            title: a.title,
            patient_name: a.client_id ? profilesMap[a.client_id] || 'Paciente sem nome' : a.title,
          }))
        }

        setAppointments(mappedAppts)

        // Fetch unread messages
        const { count: msgCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('receiver_id', user.id)
          .eq('is_read', false)

        setUnreadCount(msgCount || 0)

        // Fetch Data for Patient Radar
        const { data: linksData } = await supabase
          .from('professional_client_links')
          .select('client_id')
          .eq('professional_id', user.id)
          .eq('status', 'active')

        const linkedClientIds = linksData?.map((l) => l.client_id) || []
        let radarAlerts: RadarAlert[] = []

        if (linkedClientIds.length > 0) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, name')
            .in('id', linkedClientIds)

          const profilesMap: Record<string, string> = {}
          profilesData?.forEach((p) => {
            profilesMap[p.id] = p.name || 'Paciente'
          })

          const threeDaysAgo = new Date()
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
          const { data: moodLogs } = await supabase
            .from('mood_logs')
            .select('id, client_id, mood')
            .in('client_id', linkedClientIds)
            .gte('logged_at', threeDaysAgo.toISOString())
            .order('logged_at', { ascending: false })

          const negativeMoods = [
            'estressado',
            'triste',
            'irritado',
            'ansioso',
            'péssimo',
            'mal',
            'cansado',
            'deprimido',
          ]
          const latestMoods = new Map<string, any>()
          moodLogs?.forEach((m) => {
            if (m.client_id && !latestMoods.has(m.client_id)) {
              latestMoods.set(m.client_id, m)
            }
          })

          latestMoods.forEach((m, clientId) => {
            if (m.mood && negativeMoods.includes(m.mood.toLowerCase())) {
              radarAlerts.push({
                id: `mood-${m.id}`,
                patientName: profilesMap[clientId] || 'Paciente',
                type: 'mood',
                message: `${profilesMap[clientId]?.split(' ')[0] || 'Paciente'} relatou estar ${m.mood.toLowerCase()}`,
                level: 'critical',
              })
            }
          })

          const { data: assessments } = await supabase
            .from('nutrition_assessments')
            .select('id, client_id, date')
            .in('client_id', linkedClientIds)
            .order('date', { ascending: false })

          const latestAssessments = new Map<string, any>()
          assessments?.forEach((a) => {
            if (!latestAssessments.has(a.client_id)) {
              latestAssessments.set(a.client_id, a)
            }
          })

          const fiveDaysAgo = new Date()
          fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
          fiveDaysAgo.setHours(0, 0, 0, 0)

          linkedClientIds.forEach((clientId) => {
            const latest = latestAssessments.get(clientId)
            if (!latest || new Date(latest.date) < fiveDaysAgo) {
              const days = latest
                ? Math.floor(
                    (new Date().getTime() - new Date(latest.date).getTime()) / (1000 * 3600 * 24),
                  )
                : null
              radarAlerts.push({
                id: `assessment-${clientId}`,
                patientName: profilesMap[clientId] || 'Paciente',
                type: 'assessment',
                message: days
                  ? `Sem registros de saúde há ${days} dias`
                  : `Nenhum registro de saúde`,
                level: 'warning',
              })
            }
          })
        }
        setAlerts(radarAlerts.slice(0, 5))

        // Fetch Data for Finance Sparkline
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
        sevenDaysAgo.setHours(0, 0, 0, 0)

        const offsetSevenDaysAgo = new Date(
          sevenDaysAgo.getTime() - sevenDaysAgo.getTimezoneOffset() * 60000,
        )
        const startDateStr = offsetSevenDaysAgo.toISOString().split('T')[0]

        const { data: transactions } = await supabase
          .from('financial_transactions')
          .select('transaction_date, amount')
          .eq('professional_id', user.id)
          .gte('transaction_date', startDateStr)

        const chartDataPoints: ChartDataPoint[] = []
        const currentDate = new Date(sevenDaysAgo)
        const todayLocal = new Date()
        todayLocal.setHours(0, 0, 0, 0)

        while (currentDate <= todayLocal) {
          const offsetCurrent = new Date(
            currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
          )
          const dateStr = offsetCurrent.toISOString().split('T')[0]
          const dayTx = transactions?.filter((t) => t.transaction_date === dateStr) || []
          const total = dayTx.reduce((sum, t) => sum + Number(t.amount || 0), 0)
          chartDataPoints.push({
            date: format(currentDate, 'dd/MM'),
            total,
          })
          currentDate.setDate(currentDate.getDate() + 1)
        }
        setFinanceChartData(chartDataPoints)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const firstName = user?.name?.split(' ')[0] || 'Profissional'
  const headerTitle = `${greeting}, ${firstName}!`
  const headerSubtitle = `Você tem ${appointments.length} consultas hoje e ${unreadCount} mensagens não lidas.`

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title={headerTitle}>
        <Button size="sm" className="hidden sm:flex" asChild>
          <Link to="/professional/patients">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Paciente
          </Link>
        </Button>
      </DashboardHeader>

      <PageContent>
        <div className="mb-6">
          <p className="text-muted-foreground text-lg">{headerSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {/* Ações do Dia */}
          <Card className="md:col-span-2 lg:col-span-2 rounded-xl shadow-sm flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Ações do Dia
              </CardTitle>
              <CardDescription>Suas consultas agendadas para hoje</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 rounded-xl border bg-card/50 hover:bg-accent/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <UserIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium leading-none">{appt.patient_name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Hoje, {format(parseISO(appt.start_time), 'HH:mm', { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() =>
                          appt.client_id && navigate(`/professional/patient/${appt.client_id}`)
                        }
                        disabled={!appt.client_id}
                        className="w-full sm:w-auto shrink-0"
                      >
                        Abrir Prontuário
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center text-muted-foreground">
                  <Calendar className="w-12 h-12 mb-3 text-muted/50" />
                  <p>Nenhuma consulta agendada para hoje.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Bento boxes */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 md:col-span-1">
            <Card className="rounded-xl shadow-sm flex flex-col justify-center">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-4xl font-bold text-teal-900 dark:text-teal-100">
                      {appointments.length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Agendadas para hoje</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm flex flex-col justify-center">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                      {unreadCount}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Mensagens não lidas</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Patient Radar */}
          <Card className="md:col-span-2 lg:col-span-2 rounded-xl shadow-sm flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
                Radar de Pacientes
              </CardTitle>
              <CardDescription>Pacientes que precisam da sua atenção</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                </div>
              ) : alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card/50"
                    >
                      <div className="mt-0.5">
                        {alert.level === 'critical' ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{alert.patientName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-6 text-center text-muted-foreground">
                  <AlertCircle className="w-10 h-10 mb-2 text-muted/30" />
                  <p className="text-sm">Nenhum paciente exigindo atenção imediata.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Growth & Retention Sparkline */}
          <Card className="md:col-span-1 lg:col-span-2 rounded-xl shadow-sm flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Crescimento (7 Dias)
              </CardTitle>
              <CardDescription>Receita financeira nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[160px] pb-6">
              {isLoading ? (
                <Skeleton className="h-full w-full rounded-lg" />
              ) : (
                <ChartContainer config={chartConfig} className="h-[140px] w-full">
                  <LineChart
                    data={financeChartData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'var(--color-total)' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
