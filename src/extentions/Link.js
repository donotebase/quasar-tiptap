/**
 * Extension: link
 *
 * @author Leecason
 * @license MIT, https://github.com/Leecason/element-tiptap/blob/master/LICENSE
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/extensions/link.ts
 */
import { Plugin, TextSelection } from 'prosemirror-state'
import { Link as TiptapLink } from 'tiptap-extensions'
import { getMarkRange } from 'tiptap-utils'

function getAttrs (dom) {
  return {
    href: dom.getAttribute('href'),
    openInNewTab: dom.getAttribute('target') === '_blank',
  }
}

function toDOM (node) {
  const {
    href,
    openInNewTab,
  } = node.attrs

  const attrs = {}
  attrs.href = href

  let ref = 'nofollow'

  if (openInNewTab) {
    attrs.target = '_blank'
    ref += ' noopener noreferrer'
  }

  attrs.ref = ref.trim()

  return ['a', attrs, 0]
}

export default class Link extends TiptapLink {
  get schema () {
    return {
      attrs: {
        href: {
          default: null,
        },
        openInNewTab: {
          default: true,
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs,
        },
      ],
      toDOM,
    }
  }

  get plugins () {
    return [
      new Plugin({
        props: {
          handleClick (view, pos) {
            const { schema, doc, tr } = view.state
            const range = getMarkRange(doc.resolve(pos), schema.marks.link)

            if (!range) return false

            const $start = doc.resolve(range.from)
            const $end = doc.resolve(range.to)
            const transaction = tr.setSelection(new TextSelection($start, $end))
            view.dispatch(transaction)

            return true
          },
        },
      }),
    ]
  }
}
