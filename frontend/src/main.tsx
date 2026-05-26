import React from 'react';
import ReactDom from "react-dom/client";
import {BrowserRouter} from "react-router-dom"; 

import App from './App.tsx';
import {AuthProvider} from "./context/authContext";

import './index.css';




ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

