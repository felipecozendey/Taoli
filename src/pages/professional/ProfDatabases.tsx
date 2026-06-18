import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { PageContent } from '@/components/shared/PageContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  Trash2,
  Database as DatabaseIcon,
  ChefHat,
  FileText,
  Apple,
  Grid,
  Edit,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { getFoodItems, getProfessionalRecipes } from '@/services/nutrition'
import { getProfessionalTips, createProfessionalTip, deleteProfessionalTip } from '@/services/tips'
import { RecipeBuilderModal } from '@/components/professional/RecipeBuilderModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

export default function ProfDatabases() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState('alimentos')

  // Foods
  const [foods, setFoods] = useState<any[]>([])
  const [foodSearch, setFoodSearch] = useState('')
  const [foodPage, setFoodPage] = useState(1)
  const [foodCount, setFoodCount] = useState(0)

  // Recipes
  const [recipes, setRecipes] = useState<any[]>([])
  const [recipeSearch, setRecipeSearch] = useState('')
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)

  // Tips
  const [tips, setTips] = useState<any[]>([])
  const [tipSearch, setTipSearch] = useState('')
  const [isTipModalOpen, setIsTipModalOpen] = useState(false)
  const [newTip, setNewTip] = useState({ title: '', category: '', content: '' })

  const loadFoods = async (search = '', page = 1) => {
    try {
      const { data, count } = await getFoodItems(page, 20, search)
      setFoods(data || [])
      if (count !== null) setFoodCount(count)
    } catch (e) {
      console.error(e)
    }
  }

  const loadRecipes = async () => {
    if (!user?.id) return
    try {
      const data = await getProfessionalRecipes(user.id)
      setRecipes(data || [])
    } catch (e) {
      console.error(e)
    }
  }

  const loadTips = async () => {
    if (!user?.id) return
    try {
      const data = await getProfessionalTips(user.id)
      setTips(data || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadFoods(foodSearch, foodPage)
  }, [foodSearch, foodPage])

  useEffect(() => {
    if (user?.id) {
      loadRecipes()
      loadTips()
    }
  }, [user?.id])

  const handleSaveTip = async () => {
    if (!user?.id || !newTip.title || !newTip.content) return
    try {
      await createProfessionalTip({
        professional_id: user.id,
        title: newTip.title,
        category: newTip.category || 'Geral',
        content: newTip.content,
      })
      toast({ title: 'Orientação salva com sucesso!' })
      setIsTipModalOpen(false)
      setNewTip({ title: '', category: '', content: '' })
      loadTips()
    } catch (e) {
      toast({ title: 'Erro ao salvar orientação', variant: 'destructive' })
    }
  }

  const handleDeleteTip = async (id: string) => {
    if (!confirm('Excluir esta orientação?')) return
    try {
      await deleteProfessionalTip(id)
      toast({ title: 'Orientação excluída' })
      loadTips()
    } catch (e) {
      toast({ title: 'Erro ao excluir', variant: 'destructive' })
    }
  }

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(recipeSearch.toLowerCase()),
  )
  const filteredTips = tips.filter((t) => t.title.toLowerCase().includes(tipSearch.toLowerCase()))

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader title="Bases de Dados" />
      <PageContent className="max-w-6xl mx-auto w-full animate-fade-in-up">
        <div className="flex items-center gap-2 mb-6">
          <DatabaseIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Gestão de Bibliotecas</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap w-full h-auto p-1 bg-muted/50 rounded-lg justify-start">
            <TabsTrigger value="alimentos" className="py-2.5 px-4 rounded-md gap-2">
              <Apple className="h-4 w-4" /> Alimentos
            </TabsTrigger>
            <TabsTrigger value="receitas" className="py-2.5 px-4 rounded-md gap-2">
              <ChefHat className="h-4 w-4" /> Receitas
            </TabsTrigger>
            <TabsTrigger value="grupos" className="py-2.5 px-4 rounded-md gap-2">
              <Grid className="h-4 w-4" /> Grupos Alimentares
            </TabsTrigger>
            <TabsTrigger value="orientacoes" className="py-2.5 px-4 rounded-md gap-2">
              <FileText className="h-4 w-4" /> Orientações/Dicas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alimentos" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Catálogo de Alimentos</CardTitle>
                <CardDescription>
                  Consulte os alimentos disponíveis para prescrição.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar alimento..."
                      className="pl-9"
                      value={foodSearch}
                      onChange={(e) => {
                        setFoodSearch(e.target.value)
                        setFoodPage(1)
                      }}
                    />
                  </div>
                </div>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Fonte</TableHead>
                        <TableHead>Kcal</TableHead>
                        <TableHead>Proteína (g)</TableHead>
                        <TableHead>Carb (g)</TableHead>
                        <TableHead>Gordura (g)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foods.map((food) => (
                        <TableRow key={food.id}>
                          <TableCell className="font-medium">{food.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{food.source || 'Outro'}</Badge>
                          </TableCell>
                          <TableCell>{food.energy_kcal}</TableCell>
                          <TableCell>{food.protein_g}</TableCell>
                          <TableCell>{food.carbs_g}</TableCell>
                          <TableCell>{food.fats_g}</TableCell>
                        </TableRow>
                      ))}
                      {foods.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            Nenhum alimento encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Mostrando {foods.length} de {foodCount} resultados
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFoodPage((p) => Math.max(1, p - 1))}
                      disabled={foodPage === 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFoodPage((p) => p + 1)}
                      disabled={foods.length < 20}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receitas" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Minhas Receitas</CardTitle>
                    <CardDescription>
                      Crie receitas dinâmicas para adicionar aos planos alimentares.
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsRecipeModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Receita
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar receita..."
                    className="pl-9"
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                  />
                </div>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome da Receita</TableHead>
                        <TableHead>Calorias</TableHead>
                        <TableHead>Macros</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecipes.map((recipe) => (
                        <TableRow key={recipe.id}>
                          <TableCell className="font-medium">{recipe.name}</TableCell>
                          <TableCell>{recipe.total_calories} kcal</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            P: {recipe.total_protein}g | C: {recipe.total_carbs}g | G:{' '}
                            {recipe.total_fats}g
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" disabled>
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredRecipes.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                            Nenhuma receita encontrada. Crie sua primeira receita!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grupos" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Grupos Alimentares</CardTitle>
                <CardDescription>
                  Categorias de alimentos para organização (Apenas visualização).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Cereais, Pães e Tubérculos',
                    'Verduras e Legumes',
                    'Frutas',
                    'Leite e Derivados',
                    'Carnes e Ovos',
                    'Leguminosas',
                    'Óleos e Gorduras',
                    'Açúcares e Doces',
                  ].map((group, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg bg-muted/20 flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">{group}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orientacoes" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Orientações e Dicas Clínicas</CardTitle>
                    <CardDescription>
                      Textos pré-definidos para anexar rapidamente aos planos dos pacientes.
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsTipModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Orientação
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar orientações..."
                    className="pl-9"
                    value={tipSearch}
                    onChange={(e) => setTipSearch(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTips.map((tip) => (
                    <Card key={tip.id} className="shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{tip.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1 font-normal">
                              {tip.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTip(tip.id)}
                            className="h-8 w-8 text-destructive -mt-2 -mr-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                          {tip.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredTips.length === 0 && (
                    <div className="col-span-1 md:col-span-2 text-center py-10 border border-dashed rounded-lg text-muted-foreground">
                      Nenhuma orientação encontrada.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>

      <RecipeBuilderModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        professionalId={user?.id || ''}
        onSuccess={loadRecipes}
      />

      <Dialog open={isTipModalOpen} onOpenChange={setIsTipModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Orientação/Dica</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                placeholder="Ex: Hidratação Diária"
                value={newTip.title}
                onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input
                placeholder="Ex: Nutrição, Hábitos..."
                value={newTip.category}
                onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Conteúdo da Orientação</Label>
              <Textarea
                placeholder="Escreva a orientação que será repassada ao paciente..."
                className="min-h-[120px]"
                value={newTip.content}
                onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTipModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTip} disabled={!newTip.title || !newTip.content}>
              Salvar Orientação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
