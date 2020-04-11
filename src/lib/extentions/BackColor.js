import { updateMark, markInputRule } from 'tiptap-commands'
import { Mark } from 'tiptap'

export default class BackColor extends Mark {
  // eslint-disable-next-line class-methods-use-this
  get name () {
    return 'backColor'
  }

  // eslint-disable-next-line class-methods-use-this
  get schema () {
    return {
      attrs: {
        backColor: {
          default: '#000000'
        }
      },
      parseDOM: [
        {
          style: 'background',
          getAttrs: value => ({ backColor: value })
        }
      ],
      toDOM: mark => ['span', { style: `background: ${mark.attrs.backColor}` }, 0]
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
