import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Droplets, Utensils, Smile, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { addWaterLog } from '@/services/nutrition'
import { addMoodLog } from '@/services/mood'
import { getLocalTodayDate, cn } from '@/lib/utils'

export function GlobalCommandBar() {
  const [open, setOpen] = useState(false)
  const [moodOpen, setMoodOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState('')
  const [moodNotes, setMoodNotes] = useState('')

  const { user, impersonatedUser } = useAuth()
  const activeUser = impersonatedUser || user
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleWater = async () => {
    setOpen(false)
    if (!activeUser?.id) return
    const date = getLocalTodayDate()
    try {
      await addWaterLog(activeUser.id, date, 300)
      toast({ title: '💧 300ml de água registados com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro ao registrar água', variant: 'destructive' })
    }
  }

  const handleMeal = () => {
    setOpen(false)
    navigate('/client/nutrition?action=quick-meal')
  }

  const handleMood = () => {
    setOpen(false)
    setMoodOpen(true)
  }

  const saveMood = async () => {
    if (!activeUser?.id || !selectedMood) return
    try {
      await addMoodLog(activeUser.id, selectedMood, moodNotes)
      toast({ title: 'Humor registrado com sucesso! 🧠' })
      setMoodOpen(false)
      setSelectedMood('')
      setMoodNotes('')
    } catch (err) {
      toast({ title: 'Erro ao registrar humor', variant: 'destructive' })
    }
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="O que deseja fazer? (Ex: água, refeição, humor)..." />
        <CommandList>
          <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
          <CommandGroup heading="Ações Rápidas">
            <CommandItem onSelect={handleWater} className="cursor-pointer">
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              <span>Registrar +300ml de Água</span>
            </CommandItem>
            <CommandItem onSelect={handleMeal} className="cursor-pointer">
              <Utensils className="mr-2 h-4 w-4 text-orange-500" />
              <span>Adicionar Refeição (IA)</span>
            </CommandItem>
            <CommandItem onSelect={handleMood} className="cursor-pointer">
              <Smile className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Registrar Humor</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Mobile FAB */}
      <Button
        size="icon"
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] z-50 bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        <Zap className="h-6 w-6" />
      </Button>

      {/* Mood Dialog */}
      <Dialog open={moodOpen} onOpenChange={setMoodOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Como você está se sentindo?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-between py-6 px-2">
            {['😭', '😢', '😐', '🙂', '😁', '🤩'].map((emoji) => (
              <button
                key={emoji}
                className={cn(
                  'text-4xl hover:scale-125 hover:-translate-y-2 transition-all duration-200',
                  selectedMood === emoji
                    ? 'scale-125 -translate-y-2 drop-shadow-md bg-secondary/50 rounded-full p-1'
                    : 'grayscale-[0.5] opacity-70 hover:grayscale-0 hover:opacity-100',
                )}
                onClick={() => setSelectedMood(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <Label htmlFor="moodNotes" className="text-sm text-muted-foreground mb-2 block">
              Notas (opcional)
            </Label>
            <textarea
              id="moodNotes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="O que te fez sentir assim?"
              value={moodNotes}
              onChange={(e) => setMoodNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoodOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveMood} disabled={!selectedMood}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
