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
  files.forEach((file) => {
    if (file === config.tempDirectoryName) {
      return;
    }

    rimraf(file, () => {});
  });

  callback();
};

module.exports.moveTempFiles = (callback) => {
  npc(`./${config.tempDirectoryName}`, `.`, (err) => {
    if (err) {
      exit(err);
    }

    callback();
  });
};
