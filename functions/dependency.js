const cmd = require('node-cmd');
const commandExists = require('command-exists').sync;
const config = require('../config');

module.exports.install = (dependencies, dev, callback = false) => {

  const type = `${dev ? 'dev ' : ''}dependencies`;
  const message = `Installing ${type}`;
  console.log(message);
  
  const save = (dev) ? 'save-dev' : 'save';
  let command = `npm install --${save} ${dependencies}`;

  if (commandExists('yarn')) {
    command = `yarn add ${dependencies} --${save}`;
  }

  cmd.get(`${command}`, (data) => {
    console.log(`-========================${dev}==============================-`);
    console.log('data', data);
    console.log(`-========================${dev}==============================-`);
    console.log(`${type} installed`);

    if (callback) {
      callback();
    }
  });
};
