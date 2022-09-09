import React from 'react';
import { Header } from './components/Header/Header';
import { AppRouting } from './components/Router/Router';
import './App.less';

function App() {
  return (
    <div className='App'>
      <Header />
      <AppRouting />
    </div>
  );
}

export default App;
