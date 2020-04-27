/**
 * Utils: image
 * @author Leecason
 * @license MIT, https://github.com/Leecason/element-tiptap/blob/master/LICENSE
 * @see https://github.com/Leecason/element-tiptap/blob/master/src/utils/image.ts
 */
const IMAGE_CACHE = {}

export function resolveImg (src) {
  return new Promise((resolve, reject) => {
    const result = {
      complete: false,
      width: 0,
      height: 0,
      src,
    }

    if (!src) {
      reject(result)
      return
    }

    // cache
    if (IMAGE_CACHE[src]) {
      resolve({ ...IMAGE_CACHE[src] })
      return
    }

    const img = new Image()

    img.onload = () => {
      result.width = img.width
      result.height = img.height
      result.complete = true

      IMAGE_CACHE[src] = { ...result }
      resolve(result)
    }

    img.onerror = () => {
      reject(result)
    }

    img.src = src
  })
}
