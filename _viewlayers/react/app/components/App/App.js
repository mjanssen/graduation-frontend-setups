import React from 'react';
import Input from '../Input/Input';
import Paragraph from '../Paragraph/Paragraph';

const App = () => {
  const title = 'React TEST';
  const path = '/components/App.js';
  return (
    <div>
      <h1>{title}</h1>
      <p>This file can be found at {path}</p>
      <Input />
      <Paragraph />
    </div>
  );
};

export default App;
