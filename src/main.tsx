import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'public/fonts/pretendard/font.css';
import { BrowserRouter } from 'react-router-dom';
import ToastContainer from './components/toast/ToastContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </BrowserRouter>,
);
