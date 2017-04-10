import { h, render } from 'preact';

import 'style/global';
// Define base component
import App from './components/App/App';

// Create init function to render application from
let root;
function init() {
  root = render((
    <App />
  ), document.body, root);
}

// While developing, enable HMR
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    // requestAnimationFrame is used to do one paint within the browser
    requestAnimationFrame(init);
  });
}

init();
