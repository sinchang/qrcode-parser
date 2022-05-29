import jsQR from 'jsqr'

export const blob2text = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(blob)
    image.addEventListener('load', () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')

        if (!context)
          return reject(new Error('decode failed'))

        context.imageSmoothingEnabled = false
        context.drawImage(image, 0, 0)
        const imageData = context.getImageData(0, 0, image.width, image.height)

        const code = jsQR(imageData.data, image.width, image.height)
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
