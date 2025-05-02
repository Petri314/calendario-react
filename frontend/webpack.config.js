const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const tailwindcss_postcss = require('@tailwindcss/postcss');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  tailwindcss,
                  autoprefixer,
                  tailwindcss_postcss,
                ],
              },
            },
          },
        ],
      },
    ],
  },
};