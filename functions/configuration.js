// Node packages
const ncp = require('ncp').ncp;

// Custom config files
const config = require('../config');

// Move .editorconfig from the _config directory
module.exports.moveEditorConfig = (callback) => {
  console.log(`Moving .editorconfig to ${config.tempDirectoryName}`);
  ncp(`./_config/.editorconfig`, `./${config.tempDirectoryName}/.editorconfig`, callback);
};
