import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import PDFBlockComponent from './PDFBlockComponent'

export const PDFExtension = Node.create({
  name: 'pdfBlock',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      highlights: { default: [] },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="pdf-block"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'pdf-block' })]
  },
  addNodeView() {
    return ReactNodeViewRenderer(PDFBlockComponent)
  },
})
