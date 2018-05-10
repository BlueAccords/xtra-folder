import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './state/historyConfig';

import HomePage from './views/pages/home.jsx';
import AboutPage from './views/pages/about.jsx';
import ContactPage from './views/pages/contact.jsx';
import Dashboard from './views/pages/dashboard.jsx';
import MainLayout from './views/layouts/main.jsx';
import Profile from './views/pages/profile.jsx';
import Settings from './views/pages/settings.jsx';
import store from './state/configureStore';



const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <MainLayout/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}


export default App;