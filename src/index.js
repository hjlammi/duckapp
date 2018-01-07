import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, withRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// When AppWithRouter component is rendered, it renders my App component
// and withRouter passes history, match and location properties to my App component for me to use.
const AppWithRouter = withRouter(App);

ReactDOM.render(
  <HashRouter>
    <AppWithRouter />
  </HashRouter>,
  document.getElementById('root'));
registerServiceWorker();
