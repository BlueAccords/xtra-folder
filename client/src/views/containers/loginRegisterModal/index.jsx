// This modal will have a tab view for both login AND register

import React from 'react';
import TextInput from '../../components/forms/textInput.jsx';
import RegisterForm from './registerForm.jsx';
import LoginForm from './loginForm.jsx';

class LoginRegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'loginForm'
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  // handles input blur event by updating touched state.
  handleBlur(event) {
    const name = event.target.name;
    const currentForm = this.state.activeTab
    const newState = {
      ...this.state[currentForm], 
      touched: {...this.state[currentForm].touched, [name]: true},
      values: this.state[currentForm].values,
      errors: this.state[currentForm].errors,
    }

    this.setState({
      ...this.state,
      [currentForm]: newState
    });
  }

  // generic update for all inputs by their name
  handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const currentForm = this.state.activeTab
    const newState = {
      ...this.state[currentForm], 
      values: {...this.state[currentForm].values, [name]: value},
      touched: this.state[currentForm].touched,
      errors: this.state[currentForm].errors,
    }

    this.setState({
      ...this.state,
      [currentForm]: newState
    });
  }

  // sets active tab by string
  setActiveTab = param => e => {
    this.setState({
      activeTab: param
    })
  }

  // chooses which form to render
  getForm() {
    const activeTab = this.state.activeTab;
    switch (activeTab) {
      case 'loginForm':
        return (
          <LoginForm toggleActive={this.props.toggleActive} />
        );
        break;
      case 'registerForm':
        return (
          <RegisterForm toggleActive={this.props.toggleActive} />
        );
      default:
        return (
          <div>Invalid Form Tab</div>
        )
        break;
    }
  }

  render() {
    const { isActive, toggleActive } = this.props;
    const isActiveClassName = isActive ? 'is-active' : '';
    return (
      <div className={`modal ${isActive ? 'is-active' : null}`}>
        <div onClick={toggleActive} className="modal-background"></div>
        <div className="modal-card has-background-white">
          <header className="modal-card-head">
            {/* login/register tabs */}
            <div className="modal-card-title">
              <div className="tabs is-toggle is-medium is-centered">
                <ul>
                  <li 
                    className={this.state.activeTab == 'loginForm' ? 'is-active' : null}
                    onClick={this.setActiveTab('loginForm')} 
                    >
                    <a>Login</a> 
                  </li>
                  <li
                    className={this.state.activeTab == 'registerForm' ? 'is-active' : null}
                    onClick={this.setActiveTab('registerForm')} 
                    >
                    <a>Register</a> 
                  </li>
                </ul> 
              </div>
            </div>
          </header>
          {/* body */}
          {this.getForm()}

        </div>
        <button 
          className="modal-close is-large" 
          aria-label="close"
          onClick={toggleActive}>
        </button>
      </div>
    )
  }
}

export default LoginRegisterModal;