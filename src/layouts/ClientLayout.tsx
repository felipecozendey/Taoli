import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookHeart, Zap, LineChart, Leaf } from 'lucide-react'
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

export default function ClientLayout() {
  const location = useLocation()

  const navItems = [
    { title: 'Início', icon: LayoutDashboard, path: '/client' },
    { title: 'Meu Diário', icon: BookHeart, path: '/client/diary' },
    { title: 'Produtividade', icon: Zap, path: '/client/productivity' },
    { title: 'Progresso', icon: LineChart, path: '/client/progress' },
  ]

  return (
    <div className="theme-client w-full bg-background font-sans">
      <SidebarProvider>
        <Sidebar variant="floating">
          <SidebarHeader className="py-4 px-4">
            <div className="flex items-center gap-2 font-bold text-lg text-primary">
              <Leaf className="h-6 w-6" />
              <span>VitalApp</span>
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
                    className="rounded-lg h-10"
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
