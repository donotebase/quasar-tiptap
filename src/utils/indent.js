/**
 * Utils: indent
 * @author Leecason
 * @license MIT, https://github.com/Leecason/element-tiptap/blob/master/LICENSE
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/extensions/indent.ts
 */
import { TextSelection, AllSelection } from 'prosemirror-state'
import { isListNode } from './list'
import { clamp } from './shared'

function setNodeIndentMarkup (tr, pos, delta) {
  if (!tr.doc) {
    return tr
  }

  const node = tr.doc.nodeAt(pos)
  if (!node) {
    return tr
  }

  const minIndent = 0
  const maxIndent = 7

  const indent = clamp(
    (node.attrs.indent || 0) + delta,
    minIndent,
    maxIndent,
  )

  if (indent === node.attrs.indent) {
    return tr
  }

  const nodeAttrs = {
    ...node.attrs,
    indent,
  }

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
}

function updateIndentLevel (tr, delta) {
  const { doc, selection } = tr

  if (!doc || !selection) {
    return tr
  }

  if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
    return tr
  }

  const { from, to } = selection

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type

    if (
      nodeType.name === 'paragraph' ||
      nodeType.name === 'heading' ||
      nodeType.name === 'blockquote'
    ) {
      tr = setNodeIndentMarkup(tr, pos, delta)
      return false
    } else if (isListNode(node)) {
      return false
    }
    return true
  })

  return tr
}

export function createIndentCommand (delta) {
  return (state, dispatch) => {
    const { selection } = state
    let { tr } = state
    tr = tr.setSelection(selection)
    tr = updateIndentLevel(tr, delta)

    if (tr.docChanged) {
      dispatch && dispatch(tr)
      return true
    }

    return false
  }
}

export function cleanIndent (tr) {
  const { doc, selection } = tr

  if (!doc || !selection) {
    return tr
  }

  if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
    return tr
  }

  const { from, to } = selection

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type

    if (
      nodeType.name === 'paragraph' ||
      nodeType.name === 'heading' ||
      nodeType.name === 'blockquote'
    ) {
      const nodeAttrs = {
        ...node.attrs,
        indent: 0,
      }
      return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
    } else if (isListNode(node)) {
      return false
    }
    return true
  })

  return tr
}
