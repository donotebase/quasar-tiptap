import { updateMark, markInputRule } from 'tiptap-commands'
import { Mark } from 'tiptap'

export default class Align extends Mark {
  // eslint-disable-next-line class-methods-use-this
  get name () {
    return 'align'
  }

  // eslint-disable-next-line class-methods-use-this
  get schema () {
    return {
      attrs: {
        textAlign: {
          default: 'left'
        }
      },
      parseDOM: [
        {
          style: 'text-align',
          getAttrs: value => ({ textAlign: value })
        }
      ],
      toDOM: mark => ['span', { style: `text-align: ${mark.attrs.textAlign}; display: block` }, 0]
    }
  }

  // eslint-disable-next-line class-methods-use-this
  commands ({ type }) {
    return attrs => updateMark(type, attrs)
  }

  // eslint-disable-next-line class-methods-use-this
  inputRules ({ type }) {
    return [
      markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)
    ]
  }
}
