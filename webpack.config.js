const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const copyPatterns = [
  { from: './src/index.html', to: 'index.html' },
  { from: './manifest.json', to: 'manifest.json' },
];

// Only include styles.css if it exists
if (fs.existsSync('./src/styles.css')) {
  copyPatterns.push({ from: './src/styles.css', to: 'styles.css' });
}

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: copyPatterns,
    }),
  ],
};