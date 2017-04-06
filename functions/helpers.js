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
  let file = files[index];

  const nextFile = () => {
    
    index += 1;

    if (index != fileAmount) {
      file = files[index];
      removeFile(file);
    } else {
      // console.log('callback');
      callback();
    }
  };

  const removeFile = (file) => {
    if (typeof file === 'undefined') {
      return;
    }

    if (file != config.tempDirectoryName) {
      rimraf(file, () => {
        console.log(`remove ${file}`);
        nextFile();
      });
    } else {
      nextFile();
    }
  };

  removeFile(file);
};

module.exports.moveTempFiles = (callback) => {
  ncp(`./${config.tempDirectoryName}`, `.`, (err) => {
    if (err) {
      exit(err);
    }

    callback();
  });
};
