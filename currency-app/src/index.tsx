import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Normalize } from 'styled-normalize';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Normalize />
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
