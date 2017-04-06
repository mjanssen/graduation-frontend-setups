#!/usr/bin/env node
const path = require('path');
const colors = require('colors');
const CLIEngine = require("eslint").CLIEngine;

const dir = path.resolve(`${__dirname}/..`);
const cli = new CLIEngine({
    useEslintrc: true,
    rules: {
        semi: 2
    }
});

const isEmptyObject = (obj) => {
  return !Object.keys(obj).length;
}

let ESLintMessages = false;
const report = cli.executeOnFiles([`${dir}/app/`]);
const results = report.results;

report.results.map((result) => {
  const messages = result.messages;
  if (isEmptyObject(messages) === false) {
    messages.map((message) => {
      if (message.severity > 1) {
        ESLintMessages = true;
        console.log();
        console.log(`${result.filePath}`.underline.yellow);
        console.log(`[${message.ruleId}] - ${message.message}`.yellow);
        console.log(`Line: ${message.line} Column ${message.column}`.yellow);
        console.log(`${message.source}`.yellow);
        console.log();
      }
    });
  }
});

if (ESLintMessages) {
  return process.exit(1);
}

return process.exit(0);
