import fs from 'fs'
import path from 'path'
import mine from 'mime'
import qrcodeParser from '../src'

function createFile(filePath: string): File {
  const { mtimeMs: lastModified } = fs.statSync(filePath)

  return new File([fs.readFileSync(filePath)], path.basename(filePath), {
    lastModified,
    type: mine.getType(filePath) || '',
  })
}

const testImagePath = path.resolve(__dirname, 'test.png')

test('main', () => {
  expect(typeof qrcodeParser).toBe('function')
})

test('input is image url', async() => {
  const url = 'https://i.imgur.com/2S3N16R.png'
  const res = await qrcodeParser(url)
  expect(res).toBe('hello')
})

test('input is image base64', async() => {
  const base64Str = fs.readFileSync(testImagePath, { encoding: 'base64' })
  const res = await qrcodeParser(base64Str)
  expect(res).toBe('hello')
})

test('input is file object', async() => {
  const fileObject = createFile(testImagePath)
  const res = await qrcodeParser(fileObject)
  expect(res).toBe('hello')
})
