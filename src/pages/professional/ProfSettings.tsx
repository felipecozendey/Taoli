import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from 'next-themes'
import { Moon, Sun, Palette, Upload, User, BadgeCheck, Stethoscope } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfSettings() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [registration, setRegistration] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || '')
      setSpecialty(user.user_metadata?.specialty || '')
      setRegistration(user.user_metadata?.registration_number || '')
      setAvatarUrl(user.user_metadata?.avatar_url || '')
    }
  }, [user])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      const mockUrl = URL.createObjectURL(file)
      setAvatarUrl(mockUrl)

      toast({
        title: 'Avatar atualizado',
        description:
          'A sua foto de perfil foi preparada. Clique em Guardar Alterações para confirmar.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível processar a imagem.',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          name,
          specialty,
          registration_number: registration,
          avatar_url: avatarUrl,
        },
      })

      if (authError) throw authError

      if (user?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ name })
          .eq('id', user.id)

        if (profileError) {
          console.error('Erro ao atualizar profile:', profileError)
        }
      }

      toast({
        title: 'Perfil atualizado',
        description: 'As suas informações foram guardadas com sucesso.',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar o perfil.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Configurações" />
      <PageContent>
        <Tabs defaultValue="appearance" className="max-w-3xl">
          <TabsList className="mb-6">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="profile">O Meu Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tema da Interface</CardTitle>
                <CardDescription>
                  Personalize o visual da plataforma. Escolha entre claro, escuro ou o modo especial
                  Taoli.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-6 w-6" />
                  Claro
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-6 w-6" />
                  Escuro
                </Button>
                <Button
                  variant={theme === 'taoli' ? 'default' : 'outline'}
                  className="flex-1 h-24 flex flex-col gap-2"
                  onClick={() => setTheme('taoli')}
                >
                  <Palette className="h-6 w-6" />
                  Taoli
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Gira o seu perfil público e dados profissionais visíveis aos seus pacientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-secondary/30 rounded-lg border border-border">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={avatarUrl} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 text-center sm:text-left">
                    <div>
                      <h4 className="font-medium text-sm">Foto de Perfil</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recomendamos uma imagem quadrada (JPG, PNG). Máximo de 2MB.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex">
                        <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors text-sm font-medium">
                          <Upload className="h-4 w-4" />
                          <span>Selecionar Imagem</span>
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr(a). O seu nome"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        Especialidade Principal
                      </Label>
                      <Input
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        placeholder="Ex: Nutrição Esportiva"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration" className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        Número de Registo (CRN, CRP)
                      </Label>
                      <Input
                        id="registration"
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        placeholder="Ex: CRN 12345/PT"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 border-t border-border pt-6">
                <Button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="w-full sm:w-auto ml-auto"
                >
                  {loading ? 'A guardar...' : 'Guardar Alterações'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </div>
  )
}
