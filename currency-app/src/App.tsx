import React from 'react';
import { Header } from './components/Header/Header';
import { PageContainer } from './components/Router/Router';
import './App.less';

function App() {
  return (
    <div className='App'>
      <Header />
      <PageContainer />
    </div>
  );
}

export default App;
