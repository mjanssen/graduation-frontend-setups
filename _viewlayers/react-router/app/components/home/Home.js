import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Hey from Home route 🔥</h2>
    <p>This page represents the home page of the application</p>

    <Link to="/about">About</Link>
  </div>
);

export default Home;
