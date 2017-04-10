import React from 'react';
import { render } from 'react-dom';

import 'style/global';

// Define base component
import App from './components/App/App';

// Create init function to render application from
function init() {
  render(<App />, document.querySelector('#root'));
}

// While developing, enable HMR
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    // requestAnimationFrame is used to do one paint within the browser
    requestAnimationFrame(init);
  });
}

init();
