/**
 * Utils: clear formats
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/utils/format_clear.ts
 */
import { setAlignment } from './alignment'
import { setLineHeight } from './line_height'
import { cleanIndent } from './indent'

const FORMAT_MARK_NAMES = [
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'foreColor',
  'backColor',
  'fontFamily',
  'indent',
]

export function clearMarks (tr, schema) {
  const { doc, selection } = tr
  if (!selection || !doc) {
    return tr
  }

  const { from, to, empty } = selection
  if (empty) {
    return tr
  }

  const markTypesToRemove = new Set(
    FORMAT_MARK_NAMES.map(n => schema.marks[n]).filter(Boolean)
  )

  if (!markTypesToRemove.size) {
    return tr
  }

  const tasks = []
  doc.nodesBetween(from, to, (node, pos) => {
    if (node.marks && node.marks.length) {
      node.marks.some(mark => {
        if (markTypesToRemove.has(mark.type)) {
          tasks.push({ node, pos, mark })
        }
      })
      return true
    }
    return true
  })

  tasks.forEach(job => {
    const { node, mark, pos } = job
    tr = tr.removeMark(pos, pos + node.nodeSize, mark.type)
  })

  tr = setAlignment(tr, null)
  tr = setLineHeight(tr, null)
  tr = cleanIndent(tr)

  return tr
}
