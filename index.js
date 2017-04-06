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
const Configuration = require('./functions/configuration');
const Setup = require('./functions/setup');

const props = process.argv.slice(2);
const setup = props[0];
const name = props[1];

let configurations;

if (typeof setup === 'undefined') {
  Helpers.exit('Setup required');
}

// Callback => removeTempDir
fs.stat(`./_viewlayers/${setup}`, (err, stats) => {
  if (err) {
    Helpers.exit('Setup directory does not exist');
  }

  if (!stats.isDirectory()) {
    Helpers.exit('Setup directory is not a directory');
  }
  
  removeTempDir();
});

// Remove temporary directory
const removeTempDir = () => {
  console.log('Removing temporary directory');
  // Callback => createTempDirectory
  rimraf(`./${config.tempDirectoryName}`, createTempDirectory);
};

// Create temporary directory for the application
const createTempDirectory = () => {
  console.log(`Creating directory '${config.tempDirectoryName}'`);
  // Callback => copyPackageJson
  fs.mkdir(config.tempDirectoryName, copyPackageJson);
};

const copyPackageJson = () => {
  configurations = {
    react: require(`./packages/react`),
    preact: require(`./packages/preact`),
  };

  console.log(`Setting up ${setup} project`);

  // Use function to move the package.json file. Pass installPackages as callback
  // Callback => installPackages
  Package.movePackageJson(setup, installPackages);
};

const installPackages = () => {
  // Move node process to new directory
  process.chdir(config.tempDirectoryName);
  
  const devPackages = defaultPackages.dev.concat(configurations[setup].dev || []).join(' ');
  const mainPackages = defaultPackages.main.concat(configurations[setup].main || []).join(' ');
  
  // Install normal- and dev dependencies.
  // Callback => moveConfiguration
  Dependency.install(
    mainPackages,
    0,
    Dependency.install.bind(this, devPackages, 1, moveConfiguration));
};

const moveConfiguration = () => {
  // Jump one directory up with node process
  process.chdir(`../`);

  Configuration.moveEditorConfig(moveApplicationSetup);
};

const moveApplicationSetup = () => {
  Setup.moveViewLayerSetup(setup, moveBundlerConfiguration);
};

const moveBundlerConfiguration = () => {
  Setup.moveBundlerSetup('webpack', moveTemplateConfiguration);
};

const moveTemplateConfiguration = () => {
  Setup.moveTemplates(finished);
};

const cleanup = () => {
  fs.readdir('.', (err, files) => {
    Helpers.removeFiles(files, moveTempFilesToRoot);
  });
};

const moveTempFilesToRoot = () => {
  Helpers.moveTempFiles(finished);
};

const finished = () => {
  console.log('Completed :)');
}
