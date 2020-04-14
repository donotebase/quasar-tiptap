import { markInputRule } from 'tiptap-commands'
import { Mark } from 'tiptap'
import { applyMark } from '../utils/mark'

export default class FontFamily extends Mark {
  get name () {
    return 'fontFamily'
  }

  get schema () {
    return {
      attrs: {
        fontFamily: {
          default: ''
        }
      },
      parseDOM: [
        {
          style: 'font-family',
          getAttrs: value => ({ fontFamily: value })
        },
      ],
      toDOM: mark => ['span', { style: `font-family: ${mark.attrs.fontFamily}` }, 0]
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      let { tr } = state
      tr = applyMark(state.tr.setSelection(state.selection), type, attrs)
      if (tr.docChanged || tr.storedMarksSet) {
        dispatch && dispatch(tr)
        return true
      }
    }
  }

  inputRules ({ type }) {
    return [
      markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)
    ]
  }
}
