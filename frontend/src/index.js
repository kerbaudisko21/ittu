import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';
import { SearchContextProvider } from './context/SearchContext.js';
import { IsLoginContextProvider } from './context/IsLoginContext';
import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import { Provider } from 'react-redux';
import { Store } from './App/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <IsLoginContextProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </IsLoginContextProvider>
    </SearchContextProvider>
  </AuthContextProvider>
);
