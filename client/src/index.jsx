import React from 'react';
import ReactDOM from 'react-dom';
import './theme.scss';

import App from './App.jsx';

class BasicComponent extends React.Component {
  render() {
    return (
      <App/>
    )
  }
}

ReactDOM.render(
  <BasicComponent/>,
  document.getElementById('app')
)