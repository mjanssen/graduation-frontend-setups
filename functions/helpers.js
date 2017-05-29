// Node packages
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

// Custom config files
const config = require('../_config/config');

const exit = (message = '') => {
    console.log(message);
    return process.exit(1);
};

const debug = (message) => {
    if (process.env.DEBUG === 'true') {
        console.log(`DEBUG - ${message}`);
    }
};

const emptyLog = () => {
    console.log('');
};

module.exports.exit = exit;
module.exports.debug = debug;
module.exports.emptyLog = emptyLog;

module.exports.removeTempDirectories = (callback) => {
    console.log('🔨  Removing temporary git directory');
    rimraf(`./${config.directory.gitTempDirectoryName}`, () => {
        console.log('🔨  Removing temporary app directory');
        rimraf(`./${config.directory.tempDirectoryName}`, callback);
    });
};

module.exports.removeFiles = (files = [], callback) => {
    console.log('Cleaning up...')
    const fileAmount = files.length;
    let index = 0;
    let file = files[index];

    const nextFile = () => {

        index += 1;

        if (index !== fileAmount) {
            file = files[index];
            removeFile(file);
        } else {
            callback();
        }
    };

    const removeFile = (file) => {
        if (typeof file === 'undefined') {
            return;
        }

        if (file !== config.directory.tempDirectory) {
            rimraf(file, () => {
                debug(`${file} removed`);
                nextFile();
            });
        } else {
            nextFile();
        }
    };

    removeFile(file);
};

module.exports.moveTempFiles = (callback) => {
    ncp(`./${config.directory.tempDirectory}`, `.`, (err) => {
        if (err) {
            exit(err);
        }

        debug(`${config.directory.tempDirectory} content copied`);

        rimraf(config.directory.tempDirectory, () => {
            debug(`${config.directory.tempDirectory} removed`);
            callback();
        });
    });
};
