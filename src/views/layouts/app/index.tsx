import React from 'react';

import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

export const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
};
