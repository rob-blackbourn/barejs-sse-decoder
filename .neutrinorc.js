module.exports = {
  options: {
    output: 'lib'
  },
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/library',
      {
        name: 'barejs-sse-decoder',
        target: 'web'
      }
    ],
    '@neutrinojs/jest'
  ]
};
