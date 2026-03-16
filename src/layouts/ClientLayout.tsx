import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Book,
  Target,
  TrendingUp,
  Sparkles,
  LogOut,
  User as UserIcon,
} from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ClientLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/client' },
    { title: 'Meu Diário', icon: Book, path: '/client/diary' },
    { title: 'Produtividade', icon: Target, path: '/client/productivity' },
    { title: 'Meu Progresso', icon: TrendingUp, path: '/client/progress' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-2" />
              <h1 className="text-lg font-semibold tracking-tight hidden md:block">
                Área do Cliente
              </h1>

              <div className="flex items-center gap-2 font-bold text-lg text-primary md:hidden">
                <Sparkles className="h-5 w-5" />
                <span>Taoli</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Meu Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 pt-4 md:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
