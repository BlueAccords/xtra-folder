import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './state/historyConfig';

import store from './state/configureStore';
import HomePage from './views/pages/home.jsx';
import AboutPage from './views/pages/about.jsx';
import ContactPage from './views/pages/contact.jsx';
import Dashboard from './views/pages/dashboard.jsx';
import MainLayout from './views/layouts/Main/index.jsx';
import Profile from './views/pages/profile.jsx';
import Settings from './views/pages/settings.jsx';
import Login from './views/pages/Login.jsx';
import Forbidden from './views/pages/Forbidden.jsx';
import NotFound from './views/pages/NotFound.jsx';
import SearchFolders from './views/pages/SearchFolders.jsx';
import Folder from './views/pages/Folder.jsx';
import RequireRole from './views/components/RequireRole/index.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/contact" component={RequireRole(ContactPage, { requiredRole: 'admin'})}/>
            <Route path="/dashboard" component={RequireRole(Dashboard)}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/settings" component={RequireRole(Settings)}/>
            <Route exact path="/folders/:id" component={Folder}/>
            <Route exact path="/folders" component={SearchFolders}/>
            <Route path="/login" component={Login}/>
            <Route path="/forbidden" component={Forbidden}/>
            <Route exact path="/404" component={NotFound}/>
            <Redirect to="/404" component={NotFound}/>
          </Switch>
        </MainLayout>
      </ConnectedRouter>
    </Provider>
  )
}


export default App;