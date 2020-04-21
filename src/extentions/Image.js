import { Image as TiptapImage } from 'tiptap-extensions'
import OImageView from 'src/components/views/OImageView'

function getAttrs (dom) {
  let {
    width,
    height,
  } = dom.style

  width = width || dom.getAttribute('width') || null
  height = height || dom.getAttribute('height') || null

  return {
    src: dom.getAttribute('src') || '',
    caption: dom.getAttribute('caption') || '',
    ref: dom.getAttribute('ref') || '',
    width: width == null ? null : parseInt(width, 10),
    height: height == null ? null : parseInt(height, 10),
  }
}

function toDOM (node) {
  const {
    src,
    caption,
    ref,
    width,
    height,
  } = node.attrs

  const attrs = {
    src,
    caption,
    ref,
    width,
    height,
  }

  return [
    'img',
    attrs
  ]
}

export default class Image extends TiptapImage {
  get schema () {
    return {
      attrs: {
        src: { default: '' },
        caption: { default: '' },
        ref: { default: '' },
        width: { default: null },
        height: { default: null },
      },
      inline: 'true',
      group: 'inline',
      draggable: true,
      parseDOM: [{
        tag: 'img[src]',
        getAttrs,
      }],
      toDOM,
    }
  }

  get view () {
    return OImageView
  }
}
