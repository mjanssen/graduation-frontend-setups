// Node packages
const cmd = require('node-cmd');
const commandExists = require('command-exists').sync;

// Custom config files
const config = require('../_config/config');

// Define custom functions
const Helpers = require('./helpers');

module.exports.install = (dependencies, dev, callback = false) => {

  const type = `${dev ? 'dev' : 'main'} dependencies`;

  if (process.env.SKIP === 'true') {
    console.log(`⏭  ${type} skipped`);

    if (callback) {
      callback();
    }
    return;
  }

  const message = `Installing ${type}, this may take a while...`;
  console.log(message);
  
  let save = (dev) ? '--save-dev' : '--save';
  let command = `npm install ${save} ${dependencies}`;

  if (commandExists('yarn')) {
    save = (dev) ? '-D ' : '';
    command = `yarn add ${save}${dependencies}`;
  }

  Helpers.debug(`Running ${command}`);

  cmd.get(`${command}`, (data) => {
    console.log(`${type} installed`);

    if (callback) {
      callback();
    }
  });
};
