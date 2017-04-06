// Node packages
const ncp = require('ncp').ncp;
const replace = require('stream-replace');

// Custom config files
const config = require('../config');

// Define custom functions
const Helpers = require('../functions/helpers');

module.exports.movePackageJson = (setup, callback) => {
  // Copy the package.json file and update the content (name, description, setup)
  ncp(`./_config/package.json`, `./${config.tempDirectoryName}/package.json`, {
    transform: (read, write, file) => {
      read
      .pipe(replace('_NAME_', config.defaultApplicationName))
      .pipe(replace('_DESCRIPTION_', config.defaultApplicationDescription))
      .pipe(replace('_SETUP_', setup))
      .pipe(write);
    }
  }, (err) => {
    if (err) {
      Helpers.exit(err);
    }

    callback();
  });
}
