import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { getAuditLogs, type AuditLog } from '@/services/master'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function MasterLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 10
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true
    const fetchLogs = async () => {
      setIsLoading(true)
      try {
        const { data, count } = await getAuditLogs(currentPage, pageSize)
        if (mounted) {
          setLogs(data)
          setTotalCount(count)
        }
      } catch (error: any) {
        if (mounted) {
          toast({
            title: 'Erro ao carregar logs',
            description: error.message || 'Não foi possível carregar os registos de auditoria.',
            variant: 'destructive',
          })
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    fetchLogs()

    return () => {
      mounted = false
    }
  }, [currentPage, toast])

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  const renderActionBadge = (action: string) => {
    if (action === 'IMPERSONATE_START') {
      return (
        <Badge
          variant="outline"
          className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
        >
          Acesso de Conta
        </Badge>
      )
    }
    return <Badge variant="outline">{action}</Badge>
  }

  const totalPages = Math.ceil(totalCount / pageSize)
  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Logs de Auditoria" />
      <PageContent>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Histórico de ações administrativas e acessos ao sistema.
          </p>
        </div>

        <div className="rounded-md border bg-card shadow-sm overflow-hidden flex-1 flex flex-col">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Data / Hora</TableHead>
                <TableHead>Administrador</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Utilizador Afetado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: Math.min(pageSize, 6) }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[100px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="text-sm font-medium whitespace-nowrap">
                      {formatDate(log.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{log.admin?.name || 'Desconhecido'}</span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {log.admin?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{renderActionBadge(log.action)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{log.target_user?.name || 'Desconhecido'}</span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {log.target_user?.email}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum registo de auditoria encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            A mostrar {startRecord} a {endRecord} de {totalCount} registos.
          </div>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage((p) => p - 1)
                  }}
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage((p) => p + 1)
                  }}
                  className={
                    currentPage === totalPages || totalPages === 0
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </PageContent>
    </div>
  )
}
