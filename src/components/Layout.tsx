import { Outlet } from 'react-router-dom'
import { ImpersonationBanner } from '@/components/shared/ImpersonationBanner'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { isImpersonating } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ImpersonationBanner />
      <main className={cn('flex flex-col flex-1', isImpersonating && 'mt-12')}>
        <Outlet />
      </main>
    </div>
  )
}
