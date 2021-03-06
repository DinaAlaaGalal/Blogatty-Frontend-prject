import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { render } from 'react-dom';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter><App /></BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
