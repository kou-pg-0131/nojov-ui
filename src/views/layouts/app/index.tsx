import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

export const App: React.FC = () => {
  return (
    <div>
      <CssBaseline/>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
};
