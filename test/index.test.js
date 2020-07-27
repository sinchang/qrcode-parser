/* eslint-env jest */
/* global File */
import qrcodeParser from '../src'
const fs = require('fs')
const path = require('path')
const mine = require('mime')

function createFile (filePath) {
  const { mtimeMs: lastModified } = fs.statSync(filePath)

  return new File(
    [fs.readFileSync(filePath)],
    path.basename(filePath),
    {
      lastModified,
      type: mine.getType(filePath) || ''
    }
  )
}

const testImagePath = path.resolve(__dirname, 'test.png')

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
  const base64Str = fs.readFileSync(testImagePath, { encoding: 'base64' })
  const res = await qrcodeParser(base64Str)
  expect(res.data).toBe('hello')
})

test('input is file object', async () => {
  const fileObject = createFile(testImagePath)
  const res = await qrcodeParser(fileObject)
  expect(res.data).toBe('hello')
})
