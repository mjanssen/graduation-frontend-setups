# What's this?

This repository allows developers to create a complete front-end setup with all the tools a developer needs (check [included tools](#included-tools)). It even removes itself when it's done!

## Available setups

The application has the following setups implemented:

- `preact` :atom_symbol:
- `react`
- `react-router`
- `vue` :leaves:

## All right, how can I use it?

The only requirement is having node.js installed [check it out here](https://nodejs.org/en/). If you want to use yarn ([an awesome npm alternative](https://yarnpkg.com/en/)), no problem, got you covered!

- Clone this git repo: `git clone https://github.com/mjanssen/graduation-frontend-setups.git`
- Enter the directory and run `npm install` / `yarn install`
- Run `node index.js __setup__` (see [available setups](#available-setups))
- Let the node application handle everything
- Profit!

Run `npm run dev` / `yarn run dev` to start the application!

**Or**, if you're an astronaut during the weekends :rocket:, run `npm run dashboard` / `yarn run dashboard` for a cool dashboard.

Happy coding :heart:

### Brotip :+1:

If you do not have `yarn` installed, you should consider installing it ([Installation page of Yarn](https://yarnpkg.com/lang/en/docs/install/)). Using `yarn` will speed up the 
installation of your dependencies. Check out their [stats vs npm](https://yarnpkg.com/lang/en/compare/). Or if you want
a less biased test, check out [this git repo](https://github.com/appleboy/npm-vs-yarn).

Don't worry, the script will fall back to `npm` if `yarn` is not installed :)

## Included tools

Included:

- basic implementation of view-layer (see [available setups](#available-setups))
- webpack
  - dev server
  - HMR (for a great developer experience)
  - Access it from other devices (`http://your-ip:port` (by default the port will be 9000))
  - Babel compiling for the ES6 fans :fire:
- eslint
- githooks to prevent the messy git commits ;)

## How is this different than the other tools?

This tool is used to create a small project of the latest and greatest view-layers. The implementation is so small,
developers can easily customize the setup (if they want to). The 'setup tool' will even remove itself when completed,
so no unnecessary files are left. No other global packages than `node` and `npm` (or `yarn`) are needed.

## Help! It broke!

Don't hesitate to create an issue. I'm ready to help you out.
