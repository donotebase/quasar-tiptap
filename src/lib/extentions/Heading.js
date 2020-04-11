import { Node } from 'tiptap'
import { setBlockType, textblockTypeInputRule, toggleBlockType } from 'tiptap-commands'

export default class Heading extends Node {
  get name () {
    return 'heading'
  }

  get defaultOptions () {
    return {
      levels: [1, 2, 3, 4, 5, 6],
    }
  }

  get schema () {
    return {
      attrs: {
        level: {
          default: 1,
        },
        id: {
          default: ''
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: this.options.levels
        .map(level => ({
          tag: `h${level}`,
          attrs: { level },
        })),
      toDOM: (node) => {
        const id = node.attrs.id || getUuid()
        const dom = ['h'.concat(node.attrs.level), {
          id: id,
          level: node.attrs.level
        }, 0]
        node.attrs.id = id
        return dom
      },
    }
  }

  commands ({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }

  keys ({ type }) {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Shift-Ctrl-${level}`]: setBlockType(type, { level }),
      },
    }), {})
  }

  inputRules ({ type }) {
    return this.options.levels.map(level => textblockTypeInputRule(
      new RegExp(`^(#{1,${level}})\\s$`),
      type,
      () => ({ level }),
    ))
  }
}

function getUuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '' // -

  return s.join('').substr(0, 6)
}
