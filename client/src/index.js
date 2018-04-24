import React from 'react';
import ReactDOM from 'react-dom';
import './theme.scss';

class BasicComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <BasicComponent/>,
  document.getElementById('app')
)