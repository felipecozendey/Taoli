import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-50 bg-card border border-border shadow-lg rounded-xl p-4 flex items-center justify-between gap-4 animate-fade-in-up max-w-sm">
      <div className="flex-1">
        <h3 className="font-semibold text-sm">Instalar o App</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Adicione o Taoli à tela inicial para acesso mais rápido e modo offline.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button size="sm" onClick={handleInstall} className="h-9 px-3">
          <Download className="w-4 h-4 mr-1.5" /> Instalar
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPrompt(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
