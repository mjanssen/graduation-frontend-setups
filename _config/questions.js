const getQuestions = setupChoices => (
  [
    {
      type: 'list',
      name: 'setup',
      message: 'Select your desired setup',
      choices: setupChoices,
    },
    {
      type: 'checkbox',
      name: 'extensions',
      message: 'Select the options you want to use in your application (space to select / deselect)',
      choices: [
        {
          name: 'webpack',
          checked: true,
        },
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
