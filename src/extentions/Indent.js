import { Extension } from 'tiptap'
import { createIndentCommand } from '../utils/indent'

export default class Indent extends Extension {
  get name () {
    return 'indent'
  }

  get defaultOptions () {
    return {
      minIndent: 0,
      maxIndent: 7,
    }
  }

  commands () {
    return {
      indent: () => createIndentCommand(1),
      outdent: () => createIndentCommand(-1),
    }
  }

  keys () {
    return {
      Tab: createIndentCommand(1),
      'Shift-Tab': createIndentCommand(-1),
    }
  }
}
