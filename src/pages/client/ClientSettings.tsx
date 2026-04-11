import { useTheme } from '@/components/ThemeProvider'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sun, Moon, Sparkles, Monitor, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { uploadAvatar, updateUserProfile } from '@/services/profile'

export default function ClientSettings() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '')
  const [targetWeight, setTargetWeight] = useState(user?.user_metadata?.target_weight || '')
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    try {
      setIsUploading(true)
      toast({ title: 'Fazendo upload...', description: 'A sua foto está a ser enviada.' })
      const url = await uploadAvatar(user.id, file)
      setAvatarUrl(url)
      await updateUserProfile({ avatar_url: url })
      toast({ title: 'Sucesso!', description: 'Foto de perfil atualizada.' })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a foto.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true)
      await updateUserProfile({ name, phone, target_weight: targetWeight })
      toast({ title: 'Sucesso!', description: 'O seu perfil foi atualizado.' })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível guardar as alterações.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as preferências da sua conta e aparência do sistema.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
            <TabsTrigger
              value="profile"
              className="w-full justify-start px-4 py-2 text-left data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              O Meu Perfil
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="w-full justify-start px-4 py-2 text-left data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Aparência
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 space-y-6">
          <TabsContent value="profile" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize a sua foto e os seus dados de contacto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="avatar-upload"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Mudar Foto
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Telemóvel / WhatsApp</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Peso Alvo (kg)</Label>
                    <Input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
                    Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Tema do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'light',
                      name: 'Claro',
                      desc: 'Fundo branco clássico',
                      icon: Sun,
                      color: 'text-orange-500',
                      bg: 'bg-background',
                    },
                    {
                      id: 'dark',
                      name: 'Modern Dark',
                      desc: 'Contraste OLED profundo',
                      icon: Moon,
                      color: 'text-slate-400',
                      bg: 'bg-slate-900 border-slate-800',
                    },
                    {
                      id: 'taoli',
                      name: 'Taoli Mode',
                      desc: 'Experiência imersiva da marca',
                      icon: Sparkles,
                      color: 'text-[#A855F7]',
                      bg: 'bg-[#1C0F26] border-[#3D1E5A]',
                    },
                    {
                      id: 'system',
                      name: 'Sistema',
                      desc: 'Segue a preferência do seu SO',
                      icon: Monitor,
                      color: 'text-foreground',
                      bg: 'bg-muted',
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
                        theme === t.id ? 'border-primary bg-muted/20' : 'border-border',
                      )}
                    >
                      <div className={cn('p-2 rounded-full shadow-sm border', t.bg)}>
                        <t.icon className={cn('h-6 w-6', t.color)} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
