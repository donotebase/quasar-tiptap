/**
 * Utils: alignment
 * @author Leecason
 * @license MIT, https://github.com/Leecason/element-tiptap/blob/master/LICENSE
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/extensions/line_height.ts
 * @todo Table
 */

const ALLOWED_NODE_TYPES = [
  'paragraph',
  'heading',
  'list_item',
  'todo_item',
]

export function setLineHeight (tr, lineHeight) {
  const { selection, doc } = tr

  if (!selection || !doc) {
    return tr
  }

  const { from, to } = selection

  const tasks = []
  lineHeight = lineHeight || null

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    if (ALLOWED_NODE_TYPES.includes(nodeType.name)) {
      const height = node.attrs.lineHeight || null
      if (height !== lineHeight) {
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
      lineHeight,
    }

    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks)
  })

  return tr
}
