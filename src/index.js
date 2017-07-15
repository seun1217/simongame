import React from 'react';
import { render } from 'react-dom';
import SimonGame from './containers/SimonGame';
import '../src/stylesheets/App.css';

window.React = React;

render(<SimonGame />
  , document.getElementById('react-container'));
