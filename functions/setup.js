// Node packages
const ncp = require('ncp').ncp;

// Custom config files
const config = require('../_config/config');

module.exports.moveViewLayerSetup = (setup, callback) => {
  console.log('Moving application setup');
  ncp(`./_viewlayers/${setup}/`, `./${config.directory.tempDirectory}/`, callback);
};

module.exports.moveBundlerSetup = (bundler, callback) => {
  console.log('Moving bundler configuration');
  ncp(`./_bundlers/${bundler}/`, `./${config.directory.tempDirectory}/${bundler}`, callback);
};

module.exports.moveTemplates = (callback) => {
  console.log('Moving templates');
  ncp(`./_templates/`, `./${config.directory.tempDirectory}/templates`, callback);
};


module.exports.moveGithooks = (callback) => {
  console.log('Moving githooks');
  ncp(`./_config/.githooks/`, `./${config.directory.tempDirectory}/.githooks`, callback);
};
