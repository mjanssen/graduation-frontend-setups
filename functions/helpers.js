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
  
  const checkForCallback = (index) => {
    if (index + 1 === fileAmount) {
      callback();
    }
  }

  files.forEach((file, index) => {
    if (file === config.tempDirectoryName) {
      checkForCallback(index);
      return;
    }

    rimraf(file, () => {
      checkForCallback(index);
    });
  });
};

module.exports.moveTempFiles = (callback) => {
  npc(`./${config.tempDirectoryName}`, `.`, (err) => {
    if (err) {
      exit(err);
    }

    callback();
  });
};
