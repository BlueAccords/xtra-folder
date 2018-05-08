// This modal will have a tab view for both login AND register

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterForm from './registerForm.jsx';
import LoginForm from './loginForm.jsx';
import { actions as authActions } from '../../../state/authentication'

class LoginRegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'loginForm'
    };

    this.setActiveTab = this.setActiveTab.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // sets active tab by string
  setActiveTab = param => e => {
    this.setState({
      activeTab: param
    })
  }

  handleRegister(params) {
    this.props.actions.userRegisterRequest(params);
  }

  // chooses which form to render
  getForm() {
    const activeTab = this.state.activeTab;
    switch (activeTab) {
      case 'loginForm':
        return (
          <LoginForm 
          handleLogin={(values) => {console.log('handle login')}}
          toggleActive={this.props.toggleActive} 
          />
        );
        break;
      case 'registerForm':
        return (
          <RegisterForm 
            toggleActive={this.props.toggleActive} 
            handleRegister={this.handleRegister}
          />
        );
      default:
        return (
          <div>Invalid Form Tab</div>
        )
        break;
    }
  }

  render() {
    const { toggleActive } = this.props;
    return (
      <div className={'modal is-active'}>
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


const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
        userRegisterRequest: authActions.userRegisterRequest
      }, dispatch)
  }
}

export default connect(null,  mapDispatchToProps)(LoginRegisterModal);