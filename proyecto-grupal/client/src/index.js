import React from 'react';
import ReactDOM from 'react-dom/client';  
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import {store} from './redux/store';

// Configuracion Auth0
console.log(
  process.env.REACT_APP_AUTH0_DOMAIN,
  process.env.REACT_APP_AUTH0_CLIENT_ID
)
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const postLoginLocal = 'http://localhost:3000/postlogin';
const postLoginDeploy = 'https://proyecto-grupal3.vercel.app/postLogin';


const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider domain={domain} clientId={clientID} redirectUri={ postLoginDeploy } >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
