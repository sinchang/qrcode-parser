/* eslint-env jest */

import qrcodeParser from '../src'

test('main', () => {
  expect(typeof qrcodeParser).toBe('function')
})

test('empty params', () => {
  expect(qrcodeParser).toThrow('need File object or image url')
})
