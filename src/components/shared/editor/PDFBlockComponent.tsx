import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { FileText } from 'lucide-react'

export default function PDFBlockComponent(props: NodeViewProps) {
  const { src } = props.node.attrs

  return (
    <NodeViewWrapper>
      <div className="flex flex-col h-[600px] w-full border rounded-md overflow-hidden relative resize-y bg-muted/10">
        <div className="bg-muted p-2 flex items-center gap-2 border-b shrink-0">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Documento PDF</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-primary hover:underline"
          >
            Abrir num novo separador
          </a>
        </div>
        <iframe src={`${src}#toolbar=0`} className="w-full flex-1 border-0" title="PDF Viewer" />
      </div>
    </NodeViewWrapper>
  )
}
