import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import MainLayout from './views/layouts/main.jsx';

const App = ({store}) => {
  return (
    <BrowserRouter>
      <MainLayout/>
    </BrowserRouter>
  )
}


export default App;