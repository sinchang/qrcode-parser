const fs = require('fs')
const path = require('path')
const mine = require('mime')

import qrcodeParser from '../src'

function createFile(file_path) {
  const { mtimeMs: lastModified } = fs.statSync(file_path)

  return new File(
    [fs.readFileSync(file_path)],
    path.basename(file_path),
    {
      lastModified,
      type: mine.getType(file_path) || '',
    }
  )
}

test('main', () => {
  expect(typeof qrcodeParser).toBe('function')
})

test('empty params', () => {
  expect(qrcodeParser).toThrow('input must be one of File object, image url, image base64')
})

test('input is image url', async () => {
  const url = 'https://i.imgur.com/2S3N16R.png'
  const res = await qrcodeParser(url)
  expect(res.data).toBe('hello')
})

test('input is image base64', async () => {
  const base64Str = 'data:image/png;base64,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'
  const res = await qrcodeParser(base64Str)
  expect(res.data).toBe('hello')
})

test('input is file object', async () => {
  const filePath = path.resolve(__dirname, 'test.png')
  const fileObject = createFile(filePath)
  const res = await qrcodeParser(fileObject)
  expect(res.data).toBe('hello')
})
