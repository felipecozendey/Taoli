import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { PdfLoader, PdfHighlighter, Highlight, Popup } from 'react-pdf-highlighter'
import { Loader2 } from 'lucide-react'

const WorkerSrc = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'

export default function PDFBlockComponent(props: NodeViewProps) {
  const { src, highlights = [] } = props.node.attrs

  const addHighlight = (highlight: any) => {
    props.updateAttributes({
      highlights: [{ ...highlight, id: String(Date.now()) }, ...highlights],
    })
  }

  return (
    <NodeViewWrapper>
      <div className="h-[600px] w-full border rounded-md overflow-hidden relative resize-y bg-muted/10">
        <PdfLoader
          url={src}
          beforeLoad={
            <div className="flex h-full items-center justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
            </div>
          }
          workerSrc={WorkerSrc}
        >
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={() => {}}
              scrollRef={() => {}}
              onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                <Popup
                  popupContent={
                    <button
                      className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold shadow-md hover:bg-yellow-500 cursor-pointer"
                      onClick={() => {
                        addHighlight({ position, content })
                        hideTipAndSelection()
                      }}
                    >
                      Destacar
                    </button>
                  }
                  onMouseOver={(popupContent) => {}}
                  onMouseOut={() => {}}
                  hideTipAndSelection={hideTipAndSelection}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo,
              ) => {
                return (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                )
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>
    </NodeViewWrapper>
  )
}
