import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, Building2 } from 'lucide-react'
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

export default function MasterLayout() {
  const location = useLocation()

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/master' },
    { title: 'Usuários', icon: Users, path: '/master/users' },
    { title: 'Configurações Globais', icon: Settings, path: '/master/settings' },
  ]

  return (
    <div className="theme-master w-full bg-background font-sans">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader className="py-4 px-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Building2 className="h-6 w-6 text-primary" />
              <span>HealthSaaS Admin</span>
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
