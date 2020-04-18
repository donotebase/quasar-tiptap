import { Extension } from 'tiptap'
import { setAlignment } from 'src/utils/alignment'

export default class Alignment extends Extension {
  constructor (options = {}) {
    super(options)

    this._alignment = options.alignment || 'left'
  }

  get name () {
    return 'alignment'
  }

  get defaultOptions () {
    return {
      alignments: [
        'left',
        'center',
        'right',
        'justify',
      ]
    }
  }

  commands ({ type }) {
    return attrs => setAlignment(type, attrs)
  }
}
