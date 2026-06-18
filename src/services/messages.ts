import { supabase } from '@/lib/supabase/client'

export const getMessages = async (userId1: string, userId2: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`,
    )
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

export const sendMessage = async (sender_id: string, receiver_id: string, content: string) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id, receiver_id, content }])
    .select()
    .single()

  if (error) throw error
  return data
}

export const markMessagesAsRead = async (sender_id: string, receiver_id: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('sender_id', sender_id)
    .eq('receiver_id', receiver_id)
    .eq('is_read', false)

  if (error) throw error
}

export const subscribeToMessages = (userId: string, onNewMessage: (msg: any) => void) => {
  const channel = supabase
    .channel(`messages_${userId}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      onNewMessage(payload.new)
    })
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
