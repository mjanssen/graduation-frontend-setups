module.exports.exit = (message = '') => {
  console.log(message);
  return process.exit(1);
};
