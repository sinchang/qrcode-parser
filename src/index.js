import jsQR from 'jsqr'
import UPNG from 'upng-js'
import b64toBlob from './b64toBlob'

export default input => {
  if (!input) {
    throw new Error('need File object or image url')
  }

  let blob = null

  if (Object.prototype.toString.call(input) === '[object File]') {
    blob = input.slice()
    return blob2text(blob)
  } else if (isBase64(input)) {
    blob = b64toBlob(input)
    return blob2text(blob)
  } else {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', input)
      xhr.responseType = 'blob' // force the HTTP response, response-type header to be blob
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          blob = xhr.response // xhr.response is now a blob object
          blob2text(blob).then(ret => resolve(ret)).catch(e => reject(e))
        } else {
          reject(xhr.statusText)
        }
      }
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send()
    })
  }
}

function blob2text (blob) {
  return new Promise((resolve, reject) => {
    const myReader = new FileReader()
    myReader.readAsArrayBuffer(blob)
    myReader.addEventListener('loadend', e => {
      const buffer = e.srcElement.result // arraybuffer object
      const img = UPNG.decode(buffer) // put ArrayBuffer of the PNG file into UPNG.decode
      const rgba = UPNG.toRGBA8(img)[0] // UPNG.toRGBA8 returns array of frames, size: width * height * 4 bytes.
      const code = jsQR(new Uint8ClampedArray(rgba), img.width, img.height)
      if (code) {
        resolve(code)
      } else {
        reject(new Error('decode failed'))
      }
    })
  })
}

function isBase64(str) {
  try {
      return btoa(atob(str)) == str;
  } catch (err) {
      return false;
  }
}
