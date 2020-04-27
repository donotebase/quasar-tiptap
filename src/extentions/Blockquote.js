/**
 * Extension: blockquote
 *
 * @author Leecason
 * @license MIT, https://github.com/Leecason/element-tiptap/blob/master/LICENSE
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/extensions/blockquote.ts
 */
import { Blockquote as TiptapBlockquote } from 'tiptap-extensions'
import { ParagraphNodeSpec, getParagraphNodeAttrs, toParagraphDOM } from 'src/extentions/Paragraph'

function getAttrs (dom) {
  return getParagraphNodeAttrs(dom)
}

function toDOM (node) {
  const dom = toParagraphDOM(node)
  dom[0] = 'blockquote'

  return dom
}

export const BlockquoteNodeSpec = {
  ...ParagraphNodeSpec,
  attrs: {
    textAlign: { default: null },
    indent: { default: null },
  },
  content: 'block*',
  defining: true,
  parseDOM: [{
    tag: 'blockquote',
    getAttrs,
  }],
  toDOM,
}

export default class Blockquote extends TiptapBlockquote {
  get schema () {
    return BlockquoteNodeSpec
  }
}
