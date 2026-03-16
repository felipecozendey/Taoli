import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function MasterUsers() {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Gestão de Usuários">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar usuários..." className="pl-8 bg-muted/50" />
        </div>
      </DashboardHeader>
      <PageContent>
        <div className="rounded-md border">
          <div className="p-4 border-b bg-muted/20 text-sm text-muted-foreground font-medium flex justify-between">
            <span>Nome</span>
            <span>Função</span>
            <span>Status</span>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-muted/10 transition-colors"
            >
              <div className="font-medium">Usuário Simulado {i}</div>
              <div className="text-sm text-muted-foreground">Profissional</div>
              <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Ativo
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </div>
  )
}
