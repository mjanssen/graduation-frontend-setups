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

let props = process.argv.slice(2);
let setup;
let name;
let extensions;

// Set the debug env variable
process.env.DEBUG = process.argv.includes('debug');
process.env.TESTING = process.argv.includes('testing') || process.argv.includes('skip');
process.env.SKIP = process.argv.includes('skip');

let configuration;

// This function is called after the user filled the questions from start.js
const start = (_setup = false, _extensions = []) => {
  Helpers.emptyLog();
  setup = _setup;
  extensions = _extensions;

  continueSetup();
};

// This function is called when a user calls index.js
const quickStart = () => {
  setup = props[0];
  name = props[1];
  extensions = true; // True means all extensions are used

  continueSetup();
};

const continueSetup = () => {
  // Callback => removeTempDir
  fs.stat(`./_viewlayers/${setup}`, (err, stats) => {
    if (err) {
      Helpers.exit(`Setup directory '${setup}' does not exist in _viewlayers`);
    }

    if (!stats.isDirectory()) {
      Helpers.exit('Setup directory is not a directory');
    }

    removeTempDir();
  });
};

// Remove temporary directory
const removeTempDir = () => {
  console.log('🔨  Removing temporary directory');
  // Callback => createTempDirectory
  rimraf(`./${config.tempDirectoryName}`, createTempDirectory);
};

// Create temporary directory for the application
const createTempDirectory = () => {
  console.log(`🔨  Creating directory '${config.tempDirectoryName}'`);
  // Callback => copyPackageJson
  fs.mkdir(config.tempDirectoryName, copyPackageJson);
};

// packages.js exists | Callback => installPackages
// No packages.js in setup | Callback => moveConfiguration
const copyPackageJson = () => {
  Helpers.emptyLog();
  console.log(`✨  Setting up ${setup} project`);
  Helpers.emptyLog();

  fs.stat(`./_viewlayers/${setup}/packages.js`, (err, stats) => {

    if (err) {
      console.log('No packages.js file found, skipping dependency installation');
      return moveConfiguration();
    }
    
    configuration = require(`./_viewlayers/${setup}/packages`);

    // Use function to move the package.json file. Pass installPackages as callback
    // Callback => installPackages
    Package.movePackageJson(setup, installPackages);
  });
};

const installPackages = () => {
  // Move node process to new directory
  process.chdir(config.tempDirectoryName);

  const setupPackages = Package.createPackageString(configuration);
  
  const devPackages = `${defaultPackages.dev.concat().join(' ')} ${setupPackages.dev}`;
  const mainPackages = `${defaultPackages.main.concat().join(' ')} ${setupPackages.main}`;

  // Install normal- and dev dependencies.
  // Callback => moveConfiguration
  Dependency.install(
    mainPackages,
    0,
    Dependency.install.bind(this, devPackages, 1, moveConfiguration));
};

const moveConfiguration = () => {
  Helpers.emptyLog();
  // Jump one directory up with node process
  process.chdir(`../`);

  Configuration.moveEditorConfig(moveApplicationSetup);
};

// Callback => moveBundlerConfiguration
const moveApplicationSetup = () => {
  Setup.moveViewLayerSetup(setup, moveBundlerConfiguration);
};

// Callback => moveTemplateConfiguration
const moveBundlerConfiguration = () => {
  Setup.moveBundlerSetup('webpack', moveTemplateConfiguration);
};

// Callback => moveGithooksConfiguration
const moveTemplateConfiguration = () => {
  Setup.moveTemplates(moveGithooksConfiguration);
};

// Callback => cleanup
const moveGithooksConfiguration = () => {
  if (process.env.TESTING === 'true') {
    return Setup.moveGithooks(finished);
  }
  
  Setup.moveGithooks(cleanup);
};

// Callback => moveTempFilesToRoot
const cleanup = () => {
  fs.readdir('.', (err, files) => {
    Helpers.removeFiles(files, moveTempFilesToRoot);
  });
};

// Callback => finished
const moveTempFilesToRoot = () => {
  Helpers.moveTempFiles(finished);
};

const finished = () => {
  Helpers.emptyLog();
  console.log('🎉  Completed');
}

module.exports.start = start;
module.exports.quickStart = quickStart;
