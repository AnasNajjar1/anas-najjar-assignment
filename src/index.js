import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Poppins, sans-serif;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);