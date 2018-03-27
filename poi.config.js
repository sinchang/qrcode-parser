module.exports = {
  entry: 'example/index.js',
  dist: 'example/dist',
  homepage: '/',
  sourceMap: false,
  presets: [
    require('poi-preset-babel-minify')()
  ]
}