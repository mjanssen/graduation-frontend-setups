import Vue from 'vue';
import App from 'components/app/App.vue';

import 'style/global';

// Create init function to render application from
let root;
function init() {
  root = new Vue({
    el: '#root',
    render: h => h(App),
  });
}

// While developing, enable HMR
if (module.hot) {
  module.hot.accept('./components/app/App.vue', () => {
    // requestAnimationFrame is used to do one paint within the browser
    requestAnimationFrame(init);
  });
}

init();
