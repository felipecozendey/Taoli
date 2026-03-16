import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarDays, FileText, Stethoscope } from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

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
              <Stethoscope className="h-6 w-6" />
              <span>Portal Pro</span>
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
        </Sidebar>
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
