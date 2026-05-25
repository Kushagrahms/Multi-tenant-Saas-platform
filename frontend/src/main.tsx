import './index.css';
import App from './App.tsx';

import React from 'react';
import ReactDom from "react-dom/client";
import {AuthProvider} from "./context/authContext";
import {BrowserRouter} from "react-router-dom"; 


ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

