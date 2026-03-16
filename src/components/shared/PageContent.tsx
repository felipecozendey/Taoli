import { ReactNode } from 'react'

export function PageContent({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`flex-1 p-4 md:p-6 lg:p-8 animate-fade-in ${className}`}>{children}</div>
}
