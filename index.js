const cmd = require('node-cmd');
const defaultPackages = require('./packages/default-packages');

const props = process.argv.slice(2);
const setup = props[0];
const name = props[1];

let packages = {};

packages.react = require('./packages/react');

const setupMainPackages = packages[setup].main.join(' ');

const devPackages = defaultPackages.dev.concat(packages[setup].dev).join(' ');
const mainPackages = defaultPackages.main.concat(packages[setup].main).join(' ');

console.log(`-----${setup}-----`);
console.log(`Creating directory '${name}'`);
cmd.get(`mkdir ../${name}`);
console.log();
console.log(`Installing packages in '${name}'`);
// cmd.get(`
//   cd ./application
//   yarn add -D ${devPackages}
//   yarn add ${mainPackages}
// `, (data) => {
//   console.log('Setup completed. Application can be found in ./application');
// });
