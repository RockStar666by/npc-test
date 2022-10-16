import React from 'react';
import { Header } from './components/Header/Header';
import { PageContainer } from './components/Router/Router';
import './App.less';
import { Footer } from 'antd/lib/layout/layout';

function App() {
  return (
    <div className='App'>
      <Header />
      <PageContainer />
      <Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>© Artsiom Sauchuk</p>
        <a href='https://github.com/RockStar666by'>Github: RockStar666by</a>
      </Footer>
    </div>
  );
}

export default App;
