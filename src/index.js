import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticationContext from './Context/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>

      <AuthenticationContext>

        <App />

      </AuthenticationContext>

    </Router>

  </React.StrictMode>
);
