import { Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Activity, Brain, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function Index() {
  const { user } = useAuth()

  if (user) {
    const fallbackRoutes: Record<string, string> = {
      ADMIN: '/master',
      PROFESSIONAL: '/professional',
      CLIENT: '/client',
    }
    return <Navigate to={fallbackRoutes[user.role]} replace />
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="font-bold text-xl flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" />
          <span>Taoli</span>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Recursos
          </Button>
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sobre
          </Button>
          <Button asChild>
            <Link to="/login">Entrar na Plataforma</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto w-full animate-fade-in-up">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold mb-6 text-muted-foreground bg-muted/50">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          Sistema B2B2C Inteligente
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Conectando Saúde e <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
            Alta Produtividade
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
          A infraestrutura completa para administradores, profissionais de saúde e clientes
          alcançarem seus melhores resultados através de gestão unificada e dados inteligentes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="h-14 px-8 text-lg" asChild>
            <Link to="/login">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 text-slate-900">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Para Administradores</h3>
            <p className="text-muted-foreground">
              Gestão completa de acessos, faturamento e relatórios globais de utilização da
              plataforma.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4 text-teal-700">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Para Profissionais</h3>
            <p className="text-muted-foreground">
              Prontuários integrados, agenda inteligente e prescrições digitais para seus pacientes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 text-indigo-700">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Para Clientes</h3>
            <p className="text-muted-foreground">
              Acompanhamento diário, metas de saúde integradas à rotina de produtividade e
              bem-estar.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
