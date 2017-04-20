// Node packages
const ncp = require('ncp').ncp;
const replace = require('stream-replace');

// Custom config files
const config = require('../_config/config');

// Define custom functions
const Helpers = require('../functions/helpers');

const packageTypes = ['dev', 'main'];

module.exports.createPackageString = (dependencies) => {
  let packages = {
    dev: '',
    main: '',
  };

  for (packageType in packageTypes) {
    const type = packageTypes[packageType];
  
    // If dependencies are an array
    if (Array.isArray(dependencies[type])) {
      packages[type] = dependencies[type].concat().join(' ');
    } else if (typeof dependencies[type] === 'object') { // If dependencies are an object
      Object.keys(dependencies[type]).forEach((key, val) => {
        const version = dependencies[type][key];
        packages[type] += `${key}@${version} `;
      });
    }

    // Trim the trailing space
    packages[type] = packages[type].trim();
  }

  return packages;
};

module.exports.movePackageJson = (setup, callback) => {
  // Copy the package.json file and update the content (name, description, setup)
  ncp(`./_config/package.json`, `./${config.directory.tempDirectoryName}/package.json`, {
    transform: (read, write, file) => {
      read
      .pipe(replace('_NAME_', config.defaultApplicationName))
      .pipe(replace('_DESCRIPTION_', config.defaultApplicationDescription))
      .pipe(replace('_VERSION_', config.version))
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
