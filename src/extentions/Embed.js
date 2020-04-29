/**
 * Extension: Embed
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.04.29
 */
import { Node } from 'tiptap'
import OEmbedView from 'components/views/OEmbedView'

function getAttrs (dom) {
  const src = dom.getAttribute('src') || ''
  const height = dom.getAttribute('data-height') || 500
  const service = dom.getAttribute('data-service') || 'iframe'
  const link = decodeURIComponent(dom.getAttribute('data-link') || '')

  return {
    src,
    height,
    service,
    link
  }
}

function toDOM (node) {
  const {
    src,
    height,
    service,
    link,
  } = node.attrs

  const attrs = {}
  if (height) {
    attrs['data-height'] = height
  }
  if (service) {
    attrs['data-service'] = service
  }
  if (link) {
    attrs['data-link'] = encodeURIComponent(link)
  }

  attrs.src = src
  attrs.frameborder = 0
  attrs.allowfullscreen = true

  return ['oembed', attrs]
}

export default class Embed extends Node {
  get name () {
    return 'embed'
  }

  get schema () {
    return {
      attrs: {
        src: {
          default: null
        },
        height: {
          default: null
        },
        service: {
          default: null
        },
        link: {
          default: null
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'oembed',
        getAttrs
      }],
      toDOM
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view () {
    return OEmbedView
  }
}
