import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { getMyPatients } from '@/services/patients'
import { getMessages, sendMessage, markMessagesAsRead } from '@/services/messages'
import { getProfessionalTips } from '@/services/tips'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Send, BookOpen, User, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PatientChat() {
  const { user } = useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [activePatient, setActivePatient] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [tips, setTips] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) return
    getMyPatients(user.id).then((data) => setPatients(data.map((d) => d.client)))
    getProfessionalTips(user.id).then(setTips)
  }, [user])

  useEffect(() => {
    if (!user || !activePatient) return
    getMessages(user.id, activePatient.id).then(setMessages)
    markMessagesAsRead(activePatient.id, user.id)

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const msg = payload.new
          if (
            (msg.sender_id === user.id && msg.receiver_id === activePatient.id) ||
            (msg.sender_id === activePatient.id && msg.receiver_id === user.id)
          ) {
            setMessages((prev) => [...prev, msg])
            if (msg.sender_id === activePatient.id) {
              markMessagesAsRead(activePatient.id, user.id)
            }
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, activePatient])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !activePatient) return
    const content = newMessage
    setNewMessage('')
    await sendMessage(user.id, activePatient.id, content)
  }

  const sendTip = async (tipContent: string) => {
    if (!user || !activePatient) return
    await sendMessage(user.id, activePatient.id, tipContent)
  }

  return (
    <div className="flex h-full border rounded-xl overflow-hidden bg-background">
      <div className="w-80 border-r flex flex-col bg-muted/20">
        <div className="p-4 border-b font-semibold bg-background">Pacientes</div>
        <ScrollArea className="flex-1">
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePatient(p)}
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left hover:bg-muted transition-colors border-b last:border-0',
                activePatient?.id === p.id && 'bg-muted',
              )}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{p.name || 'Sem nome'}</p>
                <p className="text-xs text-muted-foreground truncate">{p.email}</p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-background relative">
        {activePatient ? (
          <>
            <div className="p-4 border-b font-semibold flex items-center gap-3 bg-card z-10 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              {activePatient.name || 'Sem nome'}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
              {messages.map((msg) => {
                const isMe = msg.sender_id === user?.id
                return (
                  <div key={msg.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-3 shadow-sm',
                        isMe
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted rounded-tl-sm border',
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <span className="text-[10px] opacity-70 mt-1 block text-right">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                )
              })}
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-20">
                  Nenhuma mensagem. Envie uma orientação ou inicie a conversa!
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center gap-2 bg-card">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" title="Orientações Rápidas">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar orientação..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma orientação encontrada.</CommandEmpty>
                      <CommandGroup>
                        {tips.map((tip) => (
                          <CommandItem
                            key={tip.id}
                            onSelect={() => sendTip(tip.content)}
                            className="cursor-pointer"
                          >
                            <div className="py-1">
                              <p className="font-medium text-sm text-primary">{tip.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {tip.content}
                              </p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground bg-muted/10">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg text-foreground">Central de Mensagens</h3>
              <p>Selecione um paciente ao lado para iniciar a conversa.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
