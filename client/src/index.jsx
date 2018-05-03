import React from 'react';
import ReactDOM from 'react-dom';
import './theme.scss';

import store from './store/index';
import App from './App.jsx';

class BasicComponent extends React.Component {
  render() {
    return (
      <div>
        <App store={store}/>
      </div>
    )
  }
}

ReactDOM.render(
  <BasicComponent/>,
  document.getElementById('app')
)