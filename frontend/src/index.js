import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';
import { SearchContextProvider } from './context/SearchContext.js';
// import { IsLoginContextProvider } from './context/IsLoginContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        {/* <IsLoginContextProvider> */}
        <App />
        {/* </IsLoginContextProvider> */}
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
