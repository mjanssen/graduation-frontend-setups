import React from 'react';
import AppRouter from 'components/router/Router';

const App = () => {
  const title = 'React!!';
  const path = '/components/App.js';
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
