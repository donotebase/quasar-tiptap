import { updateMark, markInputRule } from 'tiptap-commands'
import { Mark } from 'tiptap'

export default class ForeColor extends Mark {
  // eslint-disable-next-line class-methods-use-this
  get name () {
    return 'foreColor'
  }

  // eslint-disable-next-line class-methods-use-this
  get schema () {
    return {
      attrs: {
        foreColor: {
          default: '#000000'
        }
      },
      parseDOM: [
        {
          style: 'color',
          getAttrs: value => ({ foreColor: value })
        }
      ],
      toDOM: mark => ['span', { style: `color: ${mark.attrs.foreColor}` }, 0]
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
