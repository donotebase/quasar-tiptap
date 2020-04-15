import { Extension } from 'tiptap'
import { setAlignment } from '../utils/alignment'

export default class Alignment extends Extension {
  get name () {
    return 'alignment'
  }

  get defaultOptions () {
    return {
      alignments: [
        'left',
        'center',
        'right',
        'justify',
      ]
    }
  }

  commands () {
    return this.options.alignments.reduce((commands, alignment) => {
      return {
        ...commands,
        [`align_${alignment}`]: () => (state, dispatch) => {
          const { selection } = state
          const tr = setAlignment(
            state.tr.setSelection(selection),
            alignment === 'left' ? null : alignment,
          )

          if (tr.docChanged) {
            dispatch && dispatch(tr)
            return true
          } else {
            return false
          }
        },
      }
    }, {})
  }
}
