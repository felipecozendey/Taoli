import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarDays, FileText, Sparkles } from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { RoleSwitcher } from '@/components/shared/RoleSwitcher'

export default function ProfessionalLayout() {
  const location = useLocation()

  const navItems = [
    { title: 'Painel', icon: LayoutDashboard, path: '/professional' },
    { title: 'Pacientes', icon: Users, path: '/professional/patients' },
    { title: 'Agenda', icon: CalendarDays, path: '/professional/calendar' },
    { title: 'Prescrições', icon: FileText, path: '/professional/prescriptions' },
  ]

  return (
    <div className="theme-professional w-full bg-background font-sans">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader className="py-4 px-4">
            <div className="flex items-center gap-2 font-bold text-lg text-primary">
              <Sparkles className="h-6 w-6" />
              <span>Taoli</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <RoleSwitcher />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
