import { Shield, Briefcase, User, ChevronDown } from 'lucide-react'
import { useAuth, Role } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

const roleConfig: Record<Role, { label: string; icon: React.ElementType }> = {
  admin: { label: 'Administração (Master)', icon: Shield },
  professional: { label: 'Painel Profissional', icon: Briefcase },
  client: { label: 'Uso Pessoal (Cliente)', icon: User },
}

export function RoleSwitcher() {
  const { highestRole, activeRole, switchRole } = useAuth()

  if (!highestRole || highestRole === 'client' || !activeRole) {
    return null
  }

  const ActiveIcon = roleConfig[activeRole].icon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ActiveIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Mudar Visão</span>
                <span className="truncate text-xs">{roleConfig[activeRole].label}</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Alternar Perfil
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {highestRole === 'admin' && (
              <DropdownMenuItem
                onClick={() => switchRole('admin')}
                className="gap-2 cursor-pointer"
              >
                <Shield className="size-4" />
                <span>{roleConfig.admin.label}</span>
                {activeRole === 'admin' && (
                  <span className="ml-auto text-xs text-muted-foreground">Ativo</span>
                )}
              </DropdownMenuItem>
            )}

            {(highestRole === 'admin' || highestRole === 'professional') && (
              <DropdownMenuItem
                onClick={() => switchRole('professional')}
                className="gap-2 cursor-pointer"
              >
                <Briefcase className="size-4" />
                <span>{roleConfig.professional.label}</span>
                {activeRole === 'professional' && (
                  <span className="ml-auto text-xs text-muted-foreground">Ativo</span>
                )}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={() => switchRole('client')} className="gap-2 cursor-pointer">
              <User className="size-4" />
              <span>{roleConfig.client.label}</span>
              {activeRole === 'client' && (
                <span className="ml-auto text-xs text-muted-foreground">Ativo</span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
