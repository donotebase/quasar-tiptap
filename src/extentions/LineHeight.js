import { Extension } from 'tiptap'
import { setLineHeight } from 'src/utils/line_height'

export default class LineHeight extends Extension {
  get name () {
    return 'lineHeight'
  }

  commands () {
    return attrs => (state, dispatch) => {
      let { selection } = state
      const tr = setLineHeight(
        state.tr.setSelection(selection),
        attrs.lineHeight,
      )

      if (tr.docChanged) {
        dispatch && dispatch(tr)
        return true
      } else {
        return false
      }
    }
  }
}
