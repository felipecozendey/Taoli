import { useEffect, useRef, useCallback } from 'react'

const playChime = (volume: number) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()

    const playNote = (freq: number, startTime: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = freq

      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.0)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 1.0)
    }

    const now = ctx.currentTime
    playNote(523.25, now) // C5
    playNote(659.25, now + 0.15) // E5

    setTimeout(() => {
      if (ctx.state === 'running') {
        ctx.close().catch(() => {})
      }
    }, 1500)
  } catch (e) {
    console.error('Audio playback failed', e)
  }
}

interface UseFocusGuardianProps {
  isEnabled: boolean
  intervalMinutes: number
  volume?: number
}

export function useFocusGuardian({
  isEnabled,
  intervalMinutes,
  volume = 0.5,
}: UseFocusGuardianProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const requestPermission = async () => {
    if (!('Notification' in window)) return false
    const perm = await Notification.requestPermission()
    return perm === 'granted'
  }

  const triggerAlert = useCallback(() => {
    playChime(volume)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Guardião de Foco', {
        body: 'Ainda está focado na sua tarefa principal?',
        icon: '/vite.svg',
      })
    }
  }, [volume])

  const testNotification = useCallback(async () => {
    const granted = await requestPermission()
    if (granted) {
      triggerAlert()
    } else {
      playChime(volume) // Play sound even if notification is denied
    }
  }, [triggerAlert])

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (isEnabled && intervalMinutes > 0) {
      timerRef.current = setInterval(
        () => {
          triggerAlert()
        },
        intervalMinutes * 60 * 1000,
      )
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isEnabled, intervalMinutes, triggerAlert])

  return { requestPermission, testNotification }
}
