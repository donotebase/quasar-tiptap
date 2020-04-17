/**
 * Utils: alignment
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/extensions/text_align.ts
 * @todo Table
 */

const ALLOWED_NODE_TYPES = [
  'paragraph',
  'heading',
  'list_item',
  'todo_item',
]

export function setAlignment (tr, alignment) {
  const { selection, doc } = tr

  if (!selection || !doc) {
    return tr
  }

  const { from, to } = selection

  const tasks = []
  alignment = alignment || null

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      const align = node.attrs.textAlign || null
      if (align !== alignment) {
        tasks.push({
          node,
          pos,
          nodeType,
        })

        return nodeType.name !== 'list_item' && nodeType.name !== 'todo_item'
      }
    }
    return true
  })

  if (!tasks.length) {
    return tr
  }

  tasks.forEach(job => {
    const { node, pos, nodeType } = job
    let { attrs } = node
    attrs = {
      ...attrs,
      textAlign: alignment,
    }

    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks)
  })

  return tr
}
