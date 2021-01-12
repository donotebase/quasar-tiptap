import { Node } from 'tiptap'

import { DOMParser } from 'prosemirror-model'

export default class Generic extends Node {
  get name () {
    return 'html'
  }

  get schema () {
    return {
      inline: false,
      attrs: {},
      group: 'block',
      draggable: true,
      parseDOM: []
    }
  }

  commands ({ type }) {
    return {
      insertHTML: value =>
        (state, dispatch) => {
          const { selection } = state
          const element = document.createElement('div')
          element.innerHTML = value.trim()
          const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
          const transaction = state.tr.insert(selection.anchor, slice.content)
          dispatch(transaction)
        }
    }
  }
}
