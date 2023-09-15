import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-local-toast/dist/bundle.css'
import { LocalToastProvider } from 'react-local-toast';
const container = document.getElementById("root");
const root = createRoot(container);
const clientId='1073132327898-dil9tp3gjjj89sre3o12tdcpa6n043b1.apps.googleusercontent.com'

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <LocalToastProvider>
        <App />
        </LocalToastProvider>
      </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

