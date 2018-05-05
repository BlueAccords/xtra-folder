import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import MainLayout from './views/layouts/main.jsx';
import store from './state/configureStore';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout/>
      </BrowserRouter>
    </Provider>
  )
}


export default App;