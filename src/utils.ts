import jsQR from 'jsqr'
import UPNG from 'upng-js'

export const blob2text = async (blob: Blob): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const myReader: FileReader = new FileReader()
    myReader.readAsArrayBuffer(blob)
    myReader.addEventListener('loadend', () => {
      const buffer = myReader.result
      try {
        const img = UPNG.decode(buffer as ArrayBuffer)
        const rgba = UPNG.toRGBA8(img)[0]
        const code = jsQR(new Uint8ClampedArray(rgba), img.width, img.height)
        if (code !== null)
          return resolve(code.data)
        else
          return reject(new Error('decode failed'))
      }
      catch (err) {
        if (typeof err === 'string')
          return reject(new Error(err))

        if (err instanceof Error)
          return reject(new Error(err.message))
      }
    })
  })
}

export const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str
  }
  catch (err) {
    return false
  }
}

// Copy from https://github.com/sindresorhus/is-url-superb
export const isUrl = (string: string): boolean => {
  if (typeof string !== 'string')
    throw new TypeError('Expected a string')

  string = string.trim()
  if (string.includes(' '))
    return false

  try {
    new URL(string) // eslint-disable-line no-new
    return true
  }
  catch {
    return false
  }
}