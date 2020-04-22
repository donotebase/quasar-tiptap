import { Extension } from 'tiptap'
import { clearMarks } from 'src/utils/format_clear'

export default class FormatClear extends Extension {
  get name () {
    return 'formatClear'
  }

  commands ({ type }) {
    return () => (state, dispatch) => {
      const tr = clearMarks(state.tr.setSelection(state.selection), state.schema, type)

      if (dispatch && tr.docChanged) {
        dispatch(tr)
        return true
      }
      return false
    }
  }
}
