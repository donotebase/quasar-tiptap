/**
 * Extension: Diagram
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.03.02
 * @see mermaid https://github.com/mermaid-js/mermaid
 */
import { Node } from 'tiptap'
import ODiagramView from 'src/components/views/ODiagramView'

export default class Diagram extends Node {
  get name () {
    return 'diagram'
  }

  get schema () {
    return {
      attrs: {
        src: {
          default: null
        },
        height: {
          default: null
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'diagram',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
          height: dom.getAttribute('height')
        })
      }],
      toDOM: node => ['diagram', {
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
    return ODiagramView
  }
}
