/* eslint-env jest */

import decodeQrcode from '../src'

const imageUrl = 'https://i.loli.net/2018/03/27/5aba1f615633c.png'

test('main', () => {
  expect(typeof decodeQrcode).toBe('function')
})

test('empty params', () => {
  decodeQrcode().catch(e => expect(e))
})

test('should ok', () => {
  decodeQrcode(imageUrl).then(result => {
    expect(result.data).toEqual('1111')
  })
})
