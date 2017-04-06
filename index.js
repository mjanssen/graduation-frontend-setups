// Node packages
const fs = require('fs');
const rimraf = require('rimraf');

// Custom config files
const defaultPackages = require('./packages/default-packages');
const config = require('./config');

// Define custom functions
const Helpers = require('./functions/helpers');
const Dependency = require('./functions/dependency');
const Package = require('./functions/package');

const props = process.argv.slice(2);
const setup = props[0];
const name = props[1];

let configurations;

if (typeof setup === 'undefined') {
  Helpers.exit('Setup required');
}

fs.stat(`./_viewlayers/${setup}`, (err, stats) => {
  if (err) {
    Helpers.exit('Setup directory does not exist');
  }

  if (!stats.isDirectory()) {
    Helpers.exit('Setup directory is not a directory');
  }

  removeTempDir();
});

const removeTempDir = () => {
  console.log('Removing temporary directory');
  rimraf(`./${config.tempDirectoryName}`, createTempDirectory);
};

const createTempDirectory = () => {
  console.log(`Creating directory '${config.tempDirectoryName}'`);
  fs.mkdir(config.tempDirectoryName, copyPackageJson);
  console.log();
};

const copyPackageJson = () => {
  configurations = {
    react: require(`./packages/react`),
    preact: require(`./packages/preact`),
  };

  console.log(`Setting up ${setup} project`);

  // Use function to move the package.json file.
  // Pass installPackages as callback
  Package.movePackageJson(setup, installPackages);
};

const installPackages = () => {
  // Move node process to new directory
  process.chdir(config.tempDirectoryName);
  
  const devPackages = defaultPackages.dev.concat(configurations[setup].dev || []).join(' ');
  const mainPackages = defaultPackages.main.concat(configurations[setup].main || []).join(' ');
  
  // Install normal- and dev dependencies
  Dependency.install(mainPackages, 0, Dependency.install.bind(this, devPackages, 1));
};
