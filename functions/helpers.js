// Node packages
const ncp = require('ncp').ncp;

// Custom config files
const config = require('../config');

module.exports.exit = (message = '') => {
  console.log(message);
  return process.exit(1);
};

module.exports.removeFiles = (files = [], callback) => {
  files.forEach((file) => {
    if (file === config.tempDirectoryName) {
      return;
    }

    rimraf(file, () => {});
  });

  callback();
};
