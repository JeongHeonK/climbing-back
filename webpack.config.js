const path = require('path');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
