import { useState, useEffect, useRef, useCallback } from 'react'
import { productivityService, FocusSettings } from '@/services/productivity'
import { toast } from '@/hooks/use-toast'

export function useFocusGuardian() {
  const [settings, setSettings] = useState<FocusSettings | null>(null)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const loadSettings = useCallback(async () => {
    const { data } = await productivityService.getFocusSettings()
    if (data) {
      setSettings(data)
    }
  }, [])

  const checkPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: 'Erro',
        description: 'Notificações não suportadas neste navegador.',
        variant: 'destructive',
      })
      return false
    }
    const perm = await Notification.requestPermission()
    setPermission(perm)
    return perm === 'granted'
  }

  const playSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
      audio.volume = settings?.sound_volume || 0.5
      audio.play().catch(() => {})
    } catch (e) {
      // Ignore audio errors
    }
  }

  useEffect(() => {
    loadSettings()
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [loadSettings])

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (settings?.is_enabled && settings.reminder_interval && permission === 'granted') {
      timerRef.current = setInterval(
        () => {
          new Notification('Guardião de Foco', {
            body: 'Você ainda está focado no que deveria?',
            icon: '/vite.svg',
          })
          playSound()
        },
        settings.reminder_interval * 60 * 1000,
      )
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [settings, permission])

  const toggleGuardian = async (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      const granted = await checkPermission()
      if (!granted) {
        toast({
          title: 'Permissão Negada',
          description: 'Por favor, permita notificações no navegador para ativar o Guardião.',
          variant: 'destructive',
        })
        return
      }
    }
    setSettings((prev) => (prev ? { ...prev, is_enabled: enabled } : null))
    await productivityService.updateFocusSettings({ is_enabled: enabled })
  }

  const updateInterval = async (interval: number) => {
    setSettings((prev) => (prev ? { ...prev, reminder_interval: interval } : null))
    await productivityService.updateFocusSettings({ reminder_interval: interval })
  }

  return {
    settings,
    checkPermission,
    toggleGuardian,
    updateInterval,
    permission,
  }
}
