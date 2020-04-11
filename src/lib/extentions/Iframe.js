/**
 * Extension: Iframe
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.03.02
 */
import { Node } from 'tiptap'
import IFrame from '../components/extensions/IFrame'

export default class Iframe extends Node {
  get name () {
    return 'iframe'
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
        tag: 'iframe',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
          height: dom.getAttribute('height')
        })
      }],
      toDOM: node => ['iframe', {
        src: node.attrs.src,
        frameborder: 0,
        allowfullscreen: 'true'
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

  // get view () {
  //   return {
  //     props: ['node', 'updateAttrs', 'view'],
  //     computed: {
  //       src: {
  //         get () {
  //           return this.node.attrs.src
  //         },
  //         set (src) {
  //           this.updateAttrs({
  //             src
  //           })
  //         }
  //       }
  //     },
  //     template: `
  //       <div class="iframe">
  //         <iframe class="iframe__embed" :src="src"></iframe>
  //         <input class="iframe__input" @paste.stop type="text" v-model="src" v-if="view.editable" />
  //       </div>
  //     `
  //   }
  // }

  get view () {
    return IFrame
  }
}
