const path = require('path')

module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/quasar-tiptap/'
    : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
        'quasar-tiptap': path.resolve(__dirname, 'src/index.js')
      }
    }
  },
};
