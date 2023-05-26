import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';
import { SearchContextProvider } from './context/SearchContext.js';
import { IsLoginContextProvider } from './context/IsLoginContext';
import './index.css';

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
