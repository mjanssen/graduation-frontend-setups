const fs = require('fs');
const readline = require('readline');
const inquirer = require('inquirer');

// Require questions
const questions = require('./_config/questions');

// Require the setup tool
const tool = require('./setup');

let setups = [];

// Start application by checking which setups are available
fs.readdir('./_viewlayers', (err, files) => {
  files.forEach((file) => {
    if (!file.match(/^\s*?\..*$/)) {
      setups.push(file);
    };
  });

  const finalQuestions = questions.getQuestions(setups);
  askQuestions(finalQuestions);
});

// Callback => handleAnswers
const askQuestions = (finalQuestions) => {
  inquirer.prompt(finalQuestions).then(handleAnswers);
};

const handleAnswers = (answers) => {
  tool.start(answers.setup, answers.extensions);
};
