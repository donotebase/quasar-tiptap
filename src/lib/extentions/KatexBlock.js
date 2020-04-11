/**
 * Extension: KatexBlock
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.03.03
 * @see katex https://github.com/KaTeX/KaTeX
 */
import { Node } from 'tiptap'
import OKatexBlock from '../components/OKatexBlock'

export default class KatexBlock extends Node {
  get name () {
    return 'katex_block'
  }

  get schema () {
    return {
      attrs: {
        src: {
          default: null
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'katex',
        getAttrs: dom => ({
          src: dom.getAttribute('src')
        })
      }],
      toDOM: node => ['katex', {
        src: node.attrs.src
      }]
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view () {
    return OKatexBlock
  }
}
