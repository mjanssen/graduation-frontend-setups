// Node packages
const fs = require('fs');
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

module.exports.moveTemplates = (implementPwa, callback) => {
  console.log('Moving templates');
  const templateDirectory = `./${config.directory.tempDirectory}/templates/`;
  const template = (implementPwa) ? 'index-pwa.html' : 'index.html';

  fs.mkdir(templateDirectory, (err) => {
    if (!err) {
      ncp(`./_templates/${template}`, `./${config.directory.tempDirectory}/templates/index.html`, callback);
    }
  });
};

module.exports.moveProgressiveWebAppConfiguration = (callback) => {
  console.log('Moving Progressive Web App configuration');
  ncp(`./_pwa/`, `./${config.directory.tempDirectory}/pwa`, callback);
};

module.exports.moveGithooks = (callback) => {
  console.log('Moving githooks');
  ncp(`./_config/.githooks/`, `./${config.directory.tempDirectory}/.githooks`, callback);
};
