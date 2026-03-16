import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContentProps {
  children: ReactNode
  className?: string
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <main className={cn('flex flex-1 flex-col gap-4 p-4 pt-4 md:p-6 lg:p-8', className)}>
      {children}
    </main>
  )
}
