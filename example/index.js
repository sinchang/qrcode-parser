import qrcodeParser from '../src'

const imageUrl = 'https://i.imgur.com/2S3N16R.png'

qrcodeParser(imageUrl).then(res => {
  document.getElementById('content').innerText = res.data
})

const fileElement = document.getElementById('file')
fileElement.addEventListener('change', () => {
  const file = fileElement.files[0]
  qrcodeParser(file).then(res => {
    document.getElementById('content').innerText = res.data
  })
}, false)
