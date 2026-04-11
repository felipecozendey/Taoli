import { useTheme } from '@/components/ThemeProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sun, Moon, Sparkles, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ClientSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as preferências da sua conta e aparência do sistema.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
            <TabsTrigger
              value="appearance"
              className="w-full justify-start px-4 py-2 text-left data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Aparência
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1">
          <TabsContent value="appearance" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Tema do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
                      theme === 'light' ? 'border-primary bg-muted/20' : 'border-border',
                    )}
                  >
                    <div className="p-2 bg-background rounded-full shadow-sm">
                      <Sun className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Claro</div>
                      <div className="text-sm text-muted-foreground">Fundo branco clássico</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
                      theme === 'dark' ? 'border-primary bg-muted/20' : 'border-border',
                    )}
                  >
                    <div className="p-2 bg-slate-900 rounded-full shadow-sm border border-slate-800">
                      <Moon className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Modern Dark</div>
                      <div className="text-sm text-muted-foreground">Contraste OLED profundo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme('taoli')}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
                      theme === 'taoli' ? 'border-primary bg-muted/20' : 'border-border',
                    )}
                  >
                    <div className="p-2 bg-[#1C0F26] rounded-full shadow-sm border border-[#3D1E5A]">
                      <Sparkles className="h-6 w-6 text-[#A855F7]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Taoli Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Experiência imersiva da marca
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme('system')}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
                      theme === 'system' ? 'border-primary bg-muted/20' : 'border-border',
                    )}
                  >
                    <div className="p-2 bg-muted rounded-full shadow-sm">
                      <Monitor className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Sistema</div>
                      <div className="text-sm text-muted-foreground">
                        Segue a preferência do seu SO
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
