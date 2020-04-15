import { TodoItem as TiptapTodoItem } from 'tiptap-extensions'
import OTodoItem from 'components/extensions/OTodoItem'

function getAttrs (dom) {
  let {
    textAlign,
    lineHeight,
  } = dom.style

  let align = dom.getAttribute('data-text-align') || textAlign || ''

  return {
    textAlign: align || null,
    lineHeight: lineHeight || null,
    done: dom.getAttribute('data-done') === 'true',
  }
}

function toDOM (node) {
  const {
    done,
    textAlign,
  } = node.attrs

  let style = ''
  const attrs = {}

  attrs['data-type'] = 'todo_item'
  attrs['data-done'] = done.toString()

  if (textAlign && textAlign !== 'left') {
    attrs['data-text-align'] = textAlign
  }

  style && (attrs.style = style)

  return [
    'li',
    attrs,
    ['span', { class: 'todo-checkbox', contenteditable: 'false' }],
    ['div', { class: 'todo-content' }, 0],
  ]
}

export default class TodoItem extends TiptapTodoItem {
  get schema () {
    return {
      attrs: {
        done: { default: false },
        textAlign: { default: null },
        lineHeight: { default: null },
      },
      draggable: true,
      content: this.options.nested ? '(paragraph|todo_list)+' : 'paragraph+',
      parseDOM: [{
        priority: 51,
        tag: `[data-type="${this.name}"]`,
        getAttrs,
      }],
      toDOM,
    }
  }

  get view () {
    return OTodoItem
  }
}
