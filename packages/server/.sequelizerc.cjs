const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': path.resolve(__dirname, 'dist', 'src', 'models'),
  'seeders-path': path.resolve(__dirname, 'dist', 'src', 'seeders'),
  'migrations-path': path.resolve(__dirname, 'dist', 'src', 'migrations'),
};
