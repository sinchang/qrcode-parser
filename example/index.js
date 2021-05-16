import qrcodeParser from '../src'

const fileElement = document.getElementById('file')
fileElement.addEventListener(
  'change',
  () => {
    const file = fileElement.files[0]
    qrcodeParser(file).then(res => {
      document.getElementById('content3').innerText = res.data
    })
  },
  false
)

document.getElementById('parse-image-url').addEventListener(
  'click',
  () => {
    const url = document.getElementById('image-url').value

    if (!url) return

    qrcodeParser(url).then(res => {
      document.getElementById('content1').innerText = res.data
    })
  },
  false
)

document.getElementById('parse-image-base64').addEventListener(
  'click',
  () => {
    const url = document.getElementById('image-base64').value

    if (!url) return

    qrcodeParser(url).then(res => {
      document.getElementById('content2').innerText = res.data
    })
  },
  false
)
