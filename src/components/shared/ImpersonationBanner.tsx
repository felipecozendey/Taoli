import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function ImpersonationBanner() {
  const { user, isImpersonating, stopImpersonation } = useAuth()

  if (!isImpersonating) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-orange-500 text-white flex items-center justify-center px-4 text-sm font-medium z-[100] shadow-md">
      <span className="truncate">
        ⚠️ Você está a visualizar o sistema como: <strong>{user?.name}</strong>
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={stopImpersonation}
        className="ml-4 shrink-0 h-8 text-xs bg-transparent border-white text-white hover:bg-white hover:text-orange-600"
      >
        Encerrar Sessão e Voltar
      </Button>
    </div>
  )
}
