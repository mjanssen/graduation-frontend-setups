// Node packages
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

// Custom config files
const config = require('../config');

const exit = (message = '') => {
  console.log(message);
  return process.exit(1);
};

module.exports.exit = exit;

module.exports.removeFiles = (files = [], callback) => {
  const fileAmount = files.length;
  let index = 0;

  const checkForCallback = (index) => {
    if (index === fileAmount) {
      callback();
    }
  }

  const removeFile = (index) => {

    const file = files[index];

    if (typeof file === 'undefined') {
      return;
    }

    if (file === config.tempDirectoryName) {
      index += 1;

      checkForCallback(index);
    }

    rimraf(file, () => {
      index += 1;

      checkForCallback(index);
    });
  };

  if (fileAmount > 0) {
    removeFile(0);
  }
};

module.exports.moveTempFiles = (callback) => {
  ncp(`./${config.tempDirectoryName}`, `.`, (err) => {
    if (err) {
      exit(err);
    }

    callback();
  });
};
