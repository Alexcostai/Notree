import React from 'react';

import Router from './src/Router.js';
import store from './src/Redux/Store.js';
import { Provider as StoreProvider } from 'react-redux';

export default function App() {

  return (
    <StoreProvider store={store}>
      <Router />
    </StoreProvider>
  )
}