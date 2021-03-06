import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './global'
import Header from './Components/Header';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
