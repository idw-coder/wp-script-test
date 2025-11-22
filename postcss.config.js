const prefixwrap = require('postcss-prefixwrap');

module.exports = {
  plugins: [
    require('tailwindcss'),
    prefixwrap('#react-root', {
      ignoredSelectors: [':root', 'html', 'body'],
    }),
    require('autoprefixer'),
  ],
}
