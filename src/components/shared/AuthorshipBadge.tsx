import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { ShieldCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthorshipBadgeProps {
  createdBy?: string | null
  patientId?: string | null
  authorName?: string
  className?: string
}

export function AuthorshipBadge({
  createdBy,
  patientId,
  authorName,
  className,
}: AuthorshipBadgeProps) {
  const { user } = useAuth()

  if (!createdBy || !patientId) return null

  const isSelfManaged = createdBy === patientId
  const isCurrentUser = user?.id === createdBy
  const isViewerPatient = user?.id === patientId

  if (isSelfManaged) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          'flex w-fit items-center gap-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50',
          className,
        )}
      >
        <User className="h-3.5 w-3.5" />
        {isCurrentUser ? 'Criado por Você' : 'Criado pelo Paciente'}
      </Badge>
    )
  }

  return (
    <Badge variant="default" className={cn('flex w-fit items-center gap-1.5', className)}>
      <ShieldCheck className="h-3.5 w-3.5" />
      {isViewerPatient ? 'Prescrito pelo seu Profissional' : 'Prescrito por Profissional'}
    </Badge>
  )
}
