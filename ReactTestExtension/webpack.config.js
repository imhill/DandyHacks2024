const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/popup.js', // Input file for Webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.bundle.js', // Output file for the extension
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Process .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve extensions for React files
  },
};

