# Templates
This directory contains a default template for the application. The `index.html` file is compiled by the `html-webpack-plugin` 
and stored within the `static/` directory, which is generated uppon running `npm run dev` / `yarn run dev`, from where the application is served. **note** The `static/` directory is virtually created and used by webpack and not stored on your system.

Since the application requires a `<div id="root"></div>` to render the React components in, it is necessary to define it within the template. 

[Click here](https://github.com/jantimon/html-webpack-plugin) to read the full docs of the `html-webpack-plugin` package
