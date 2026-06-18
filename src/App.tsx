import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from './contexts/AuthContext'
import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AppRoutes } from './routes/AppRoutes'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'

const App = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('ServiceWorker registration failed: ', error)
      })
    }
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="taoli-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
          <InstallPrompt />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
