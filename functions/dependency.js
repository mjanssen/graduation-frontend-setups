const cmd = require('node-cmd');
const commandExists = require('command-exists').sync;
const config = require('../config');

module.exports.install = (dependencies, dev, callback = false) => {

  const type = `${dev ? 'dev ' : ''}dependencies`;
  const message = `Installing ${type}`;
  console.log(message);
  
  let save = (dev) ? '--save-dev' : '--save';
  let command = `npm install ${save} ${dependencies}`;

  if (commandExists('yarn')) {
    save = (dev) ? '--save-dev' : '';
    command = `yarn add ${save} ${dependencies}`;
  }

  cmd.get(`${command}`, (data) => {
    console.log(`${type} installed`);

    if (callback) {
      callback();
    }
  });
};
