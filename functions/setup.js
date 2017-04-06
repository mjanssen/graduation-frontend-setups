// Node packages
const ncp = require('ncp').ncp;

// Custom config files
const config = require('../config');

module.exports.moveViewLayerSetup = (setup, callback) => {
  console.log('Moving application setup');
  ncp(`./_viewlayers/${setup}/`, `./${config.tempDirectoryName}/`, callback);
};

module.exports.moveBundlerSetup = (bundler, callback) => {
  console.log('Moving bundler configuration');
  ncp(`./_bundlers/${bundler}/`, `./${config.tempDirectoryName}/${bundler}`, callback);
};

module.exports.moveTemplates = (callback) => {
  console.log('Moving templates');
  ncp(`./_templates/`, `./${config.tempDirectoryName}/templates`, callback);
};


module.exports.moveGithooks = (callback) => {
  console.log('Moving githooks');
  ncp(`./_config/.githooks/`, `./${config.tempDirectoryName}/.githooks`, callback);
};
