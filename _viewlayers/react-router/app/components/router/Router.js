import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import * as Routes from './Routes';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Routes.Home} />
      <Route path="/about" component={Routes.About} />
    </Switch>
  </Router>
);

export default AppRouter;
