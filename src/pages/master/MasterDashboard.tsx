import { useState } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Users, Briefcase, User, Link as LinkIcon, TrendingUp } from 'lucide-react'

export default function MasterDashboard() {
  const [stats] = useState({
    totalUsers: { value: '156', trend: '+12% este mês' },
    professionals: { value: '24', trend: '+3 novos esta semana' },
    clients: { value: '130', trend: '+18% este mês' },
    links: { value: '112', trend: '+5% esta semana' },
  })

  const [recentUsers] = useState([
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      time: 'Entrou há 2 horas',
      initials: 'AS',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos.s@email.com',
      time: 'Entrou há 5 horas',
      initials: 'CS',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    },
    {
      id: 3,
      name: 'Dra. Beatriz Costa',
      email: 'beatriz.nutri@email.com',
      time: 'Entrou há 1 dia',
      initials: 'BC',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
    },
    {
      id: 4,
      name: 'Fernando Oliveira',
      email: 'fernando.o@email.com',
      time: 'Entrou há 2 dias',
      initials: 'FO',
      avatar: '',
    },
    {
      id: 5,
      name: 'Mariana Lima',
      email: 'mariana.l@email.com',
      time: 'Entrou há 2 dias',
      initials: 'ML',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    },
  ])

  const [specialties] = useState([
    { name: 'Nutrição', value: 50 },
    { name: 'Educação Física', value: 30 },
    { name: 'Psicologia', value: 20 },
  ])

  return (
    <div className="flex flex-col min-h-full bg-muted/20">
      <DashboardHeader title="Administração do Sistema" />
      <PageContent className="max-w-7xl mx-auto w-full space-y-8 animate-fade-in-up">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Visão Geral da Plataforma
          </h2>
          <p className="text-lg text-muted-foreground">
            Acompanhe o crescimento e as métricas em tempo real do seu sistema.
          </p>
        </div>

        {/* KPI Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total de Utilizadores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.value}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.totalUsers.trend}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Profissionais Ativos</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.professionals.value}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.professionals.trend}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Clientes (Pacientes)</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients.value}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.clients.trend}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Vínculos Estabelecidos</CardTitle>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.links.value}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.links.trend}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm border-border/50">
            <CardHeader>
              <CardTitle>Últimos Registos</CardTitle>
              <CardDescription>
                Os utilizadores mais recentes a aderir à plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border bg-muted">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="font-medium text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 overflow-hidden">
                      <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
                      {user.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50">
            <CardHeader>
              <CardTitle>Distribuição de Especialidades</CardTitle>
              <CardDescription>
                Representação visual das áreas de atuação dos profissionais ativos.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-8">
                {specialties.map((spec) => (
                  <div key={spec.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">{spec.name}</span>
                      <span className="text-muted-foreground font-medium">{spec.value}%</span>
                    </div>
                    <Progress value={spec.value} className="h-2.5 bg-muted" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </div>
  )
}
