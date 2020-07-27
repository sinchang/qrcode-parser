module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist',
    html: {
      template: './index.ejs'
    }
  },
}
