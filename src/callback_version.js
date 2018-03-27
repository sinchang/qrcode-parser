import jsQR from 'jsqr'
import UPNG from 'upng-js'

export default (input, cb) => {
  if (!input) {
    throw new Error('needed File Object or image url')
  }

  let blob = null

  if (Object.prototype.toString.call(input) === '[object File]') {
    blob = input.slice()
    blob2text(blob, code => cb && cb(code))
  } else {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', input)
    xhr.responseType = 'blob' // force the HTTP response, response-type header to be blob
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        blob = xhr.response // xhr.response is now a blob object
        blob2text(blob, code => cb && cb(code))
      } else {
        cb && cb(null, xhr.statusText)
      }
    }
    xhr.onerror = () => cb && cb(null, xhr.statusText)
    xhr.send()
  }
}

function blob2text (blob, cb) {
  const myReader = new FileReader()
  myReader.readAsArrayBuffer(blob)
  myReader.addEventListener('loadend', e => {
    const buffer = e.srcElement.result // arraybuffer object
    const img = UPNG.decode(buffer) // put ArrayBuffer of the PNG file into UPNG.decode
    const rgba = UPNG.toRGBA8(img)[0] // UPNG.toRGBA8 returns array of frames, size: width * height * 4 bytes.
    const code = jsQR(new Uint8ClampedArray(rgba), img.width, img.height)
    if (code) {
      cb && cb(code)
    } else {
      throw new Error('decode failure')
    }
  })
}
