import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Book, Target, TrendingUp, Sparkles } from 'lucide-react'
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
    { title: 'Dashboard', icon: LayoutDashboard, path: '/client' },
    { title: 'Meu Diário', icon: Book, path: '/client/diary' },
    { title: 'Produtividade', icon: Target, path: '/client/productivity' },
    { title: 'Meu Progresso', icon: TrendingUp, path: '/client/progress' },
  ]

  return (
    <div className="theme-client w-full bg-background font-sans">
      <SidebarProvider>
        <Sidebar variant="inset" className="border-r-0">
          <SidebarHeader className="py-6 px-6">
            <div className="flex items-center gap-2 font-bold text-2xl text-primary">
              <Sparkles className="h-6 w-6" />
              <span>Taoli</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-4 gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                    className="rounded-lg h-11 transition-all duration-200"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
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
