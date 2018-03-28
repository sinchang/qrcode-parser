/* eslint-env jest */

import qrcodeParser from '../src'

const imageUrl = 'https://i.loli.net/2018/03/27/5aba1f615633c.png'

test('main', () => {
  expect(typeof qrcodeParser).toBe('function')
})

test('empty params', () => {
  expect(qrcodeParser).toThrow('need File object or image url')
})

test('should ok', () => {
  qrcodeParser(imageUrl).then(result => {
    expect(result.data).toEqual('1111')
  })
})
