# What's this?

This repository allows developers to create a complete front-end setup with all the tools a developer needs (check [included tools](#included-tools)). It even removes itself when it's done! You can even use your own application setup, without the hassle of configuring a module bundler like Webpack :crystal_ball:

---

## Available setups

The application has the following setups implemented:

- `preact` :atom_symbol:
- `preact-redux` :rocket:
- `react` :atom_symbol:
- `react-router` :atom_symbol:
- `vue` :leaves:
- `plain` *Bootstraps a setup without a view-layer, just the webpack config, cool for prototyping*

## Available setups using a git repo
*These setups can be installed during `node start.js`.*

- DPDK's front-end setup: [show me](https://github.com/mjanssen/graduation-dpdk-setup) |  https://github.com/mjanssen/graduation-dpdk-setup.git

---

## All right, how can I use it?

The only requirement is having node.js installed [check it out here](https://nodejs.org/en/). If you want to use yarn ([an awesome npm alternative](https://yarnpkg.com/en/)), no problem, got you covered!

### One liner
**yarn**

`git clone https://github.com/mjanssen/graduation-frontend-setups.git ./frontend-setup && cd ./frontend-setup && yarn install && node start.js`

**npm**

`git clone https://github.com/mjanssen/graduation-frontend-setups.git ./frontend-setup && cd ./frontend-setup && node start.js`

### Classic way

- Clone this git repo: `git clone https://github.com/mjanssen/graduation-frontend-setups.git`
- Enter the directory and run `npm install` / `yarn install`

You got two options now, use the configurator to enable / disable some extensions (ESLint, githooks, editorconfig) OR just install the complete setup without configuration;

#### Use configuration
- Run `node start.js`
- Follow instructions
- Profit!

#### Fast process (this process does not allow custom git setups (yet :smirk:))
- Run `node index.js __setup__` (see [available setups](#available-setups))
- Let the node application handle everything
- Profit!

Run `npm run dev` / `yarn dev` to start the application!

**Or**, if you're an astronaut during the weekends :rocket:, run `npm run dashboard` / `yarn dashboard` for a cool dashboard.

#### Building your application
**Regular build**
- Run `npm run build` / `yarn build`
- A `dist` directory will be created, containing an `index.html` and your `main.bundle.js`.

**Build with stats (JS bundle size)**
- Run `npm run stats` / `yarn stats`
- A `dist` directory will be created, containing an `index.html`, your `main.bundle.js` and a `bundle-analytics.html` file.
- Check some cool statistics and remove those crazy-sized bundles from your application #maketheworldabetterplace :boom:

Happy coding :heart:

### Brotip :+1:

If you do not have `yarn` installed, you should consider installing it ([Installation page of Yarn](https://yarnpkg.com/lang/en/docs/install/)). Using `yarn` will speed up the 
installation of your dependencies. Check out their [stats vs npm](https://yarnpkg.com/lang/en/compare/). Or if you want
a less biased test, check out [this git repo](https://github.com/appleboy/npm-vs-yarn).

Don't worry, the script will use `npm` instead if it cannot use `yarn` :)

---

## Requirements

- Having Node 6+ installed ([Upgrade steps](https://nodecasts.io/update-node-js/))

---

## Included tools

Included:

- basic implementation of view-layer (see [available setups](#available-setups))
- webpack
  - dev server
  - HMR (for a great developer experience)
  - Access it from other devices (`http://your-ip:port` (by default the port will be 9000))
  - Babel compiling for the ES6 fans :fire:
- eslint *
- githooks * to prevent the messy git commits ;)
- editorconfig *

*Items with an * are optional while using the configuration process*

---

## How is this different than the other tools?

This tool is used to create a small project of the latest and greatest view-layers. The implementation is so small,
developers can easily customize the setup (if they want to). The 'setup tool' will even remove itself when completed,
so no unnecessary files are left. No other global packages than `node` and `npm` (or `yarn`) are needed.

This repository was created after researching the following tools: Vue-CLI, create-react-app, Yeoman and Kyt.
They're all great tools, but they all had something which maked the usage less convenient. Installing global dependencies, being limited to one setup, having to many setups available, not able to implement your own setup e.g.

---

## I want to use my own setup, dawg :dog:

That's cool! This can be done by creating your own git repository. `app/app.js` is the only thing that is required within
this git repo.

Wait, You want to include packages? Just create a file named `packages.js` next to the `app` directory. Within this file, make
sure you: `module.exports.main = {}` and `module.exports.dev = {}` (check the [packages.js example](#packagesjs-example)).
These packages are automatically included in your setup :smile:

But wait, there's more! Fancy an own webpack setup? Just create a directory named `webpack` next to the `app` directory. Create
a `webpack.config.js` file for development and a `webpack.production.config.js` for production purposes.

**Note**, Everything within your git repo (`.babelrc`, `.eslint` e.g.) is imported in your project.

Having a hard time creating your own setup? Let me know :smile:

#### packages.js example
```
module.exports.dev = {
  'babel-preset-stage-0': 'latest',
  'uglifyjs-webpack-plugin': '^0.4.3'
};

module.exports.main = {
  'preact': 'latest'
};
```

---

## Help! Something is not working!

Don't hesitate to create an issue. I'm ready to help you out.

---

## Contributors

Colin van Eenige [GitHub](https://github.com/vaneenige)

---

## Licence

MIT &copy; Marnix Janssen
