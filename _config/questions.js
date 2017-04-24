const config = require('./config');

const checkIfGitSetup = (setup) => {
  return (answers) => {
    return answers.setup === setup;
  };
};

const getQuestions = setupChoices => (
  [
    {
      type: 'list',
      name: 'setup',
      message: 'Select your desired setup',
      choices: setupChoices,
    },
    {
      type: 'input',
      name: 'gitUrl',
      message: 'Enter your git url',
      when: checkIfGitSetup(config.questions.requestGitUrl),
      validate: (value) => {
        // Regex to verify if the given value is a git repository
        const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
        return regex.test(value);
      }
    },
    {
      type: 'checkbox',
      name: 'extensions',
      message: 'Select the options you want to use in your application (space to select / deselect)',
      choices: [
        {
          name: 'eslint',
          checked: true,
        },
        {
          name: 'editorconfig',
          checked: true,
        },
        {
          name: 'githooks',
          checked: true,
        },
      ]
    }
  ]
);

module.exports.getQuestions = getQuestions;
