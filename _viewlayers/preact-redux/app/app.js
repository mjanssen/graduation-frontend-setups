import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import 'style/global';

import store from './store';
import App from './components/App/App';

let root;
const init = () => {
  root = render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.body, root);
};

// While developing, enable HMR
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    // requestAnimationFrame is used to do one paint within the browser
    requestAnimationFrame(init);
  });
}

init();
