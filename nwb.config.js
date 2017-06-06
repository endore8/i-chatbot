module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'i-chatbot',
      externals: {
        react: 'React'
      }
    }
  }
}
