import { useRef, useState } from 'react'
import { ReactSketchCanvas, type ReactSketchCanvasRef } from 'react-sketch-canvas'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pen, Eraser, Save, Undo, Loader2 } from 'lucide-react'
import { uploadStudyMedia } from '@/lib/supabase/storage'
import { toast } from '@/hooks/use-toast'

interface ImageAnnotatorDialogProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSave: (newUrl: string) => void
}

export function ImageAnnotatorDialog({
  isOpen,
  onClose,
  imageUrl,
  onSave,
}: ImageAnnotatorDialogProps) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [strokeColor, setStrokeColor] = useState('#ff0000')
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [isEraser, setIsEraser] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!canvasRef.current) return
    setIsSaving(true)
    try {
      const base64 = await canvasRef.current.exportImage('png')
      const res = await fetch(base64)
      const blob = await res.blob()

      const newUrl = await uploadStudyMedia(blob)
      if (newUrl) {
        onSave(newUrl)
        onClose()
      } else {
        toast({ title: 'Erro ao salvar imagem', variant: 'destructive' })
      }
    } catch (error) {
      console.error('Failed to save annotation:', error)
      toast({ title: 'Erro ao processar imagem', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-4 gap-4 overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>Anotar Imagem</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md shrink-0 flex-wrap">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
            disabled={isEraser}
          />
          <div className="flex items-center gap-2 px-2 border-r border-border h-8">
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              Tamanho:
            </span>
            <input
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-20 sm:w-24"
            />
          </div>
          <Button
            variant={!isEraser ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsEraser(false)
              canvasRef.current?.eraseMode(false)
            }}
            className="gap-2 h-8"
          >
            <Pen className="w-4 h-4" />
            <span className="hidden sm:inline">Caneta</span>
          </Button>
          <Button
            variant={isEraser ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsEraser(true)
              canvasRef.current?.eraseMode(true)
            }}
            className="gap-2 h-8"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Borracha</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleUndo} className="gap-2 ml-auto h-8">
            <Undo className="w-4 h-4" />
            <span className="hidden sm:inline">Desfazer</span>
          </Button>
          <Button onClick={handleSave} size="sm" className="gap-2 h-8" disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">Salvar</span>
          </Button>
        </div>

        <div className="flex-1 bg-muted/10 border rounded-md overflow-hidden relative">
          {isOpen && imageUrl && (
            <ReactSketchCanvas
              ref={canvasRef}
              backgroundImage={imageUrl}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              eraserWidth={strokeWidth * 2}
              preserveBackgroundImageAspectRatio
              className="w-full h-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
