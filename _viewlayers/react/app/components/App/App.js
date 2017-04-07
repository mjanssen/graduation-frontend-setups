import React from 'react';

const App = () => {
  const title = 'React!!';
  const path = '/components/App.js';
  return (
    <div>
      <h1>{title}</h1>
      <p>This file can be found at {path}</p>
    </div>
  );
};

export default App;
