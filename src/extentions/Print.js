import { Extension } from 'tiptap'
import { printHtml } from 'src/utils/print'

export default class Print extends Extension {
  get name () {
    return 'print'
  }

  commands () {
    return () => (_state, _dispatch, view) => {
      const editorContent = view.dom.closest('.editor__content')
      if (editorContent) {
        printHtml(editorContent)
        return true
      }
      return false
    }
  }

  keys ({ view }) {
    return {
      'Mod-p': function (_state, _dispatch, view) {
        const editorContent = view.dom.closest('.editor__content')
        if (editorContent) {
          printHtml(editorContent)
          return true
        }
        return false
      }
    }
  }
}
