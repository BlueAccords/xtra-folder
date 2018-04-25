import React from 'react';
import TextInput from '../../components/forms/textInput.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: 'initial username',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      touched: {
        username: false,
        email: false,
        password: false,
        password_confirmation: false
      }
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // handles input blur event by updating touched state.
  handleBlur(event) {
    const name = event.target.name;
    const newState = {...this.state.touched}
    newState[name] = true;
    this.setState({
      touched: newState
    });
  }

  // generic update for all inputs by their name
  handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = {...this.state.values}
    newState[name] = value;
    this.setState({
      values: newState
    });
  }



  render() {
    const { isActive, toggleActive } = this.props;
    const isActiveClassName = isActive ? 'is-active' : '';
    return (
      <div className={`modal ${isActive ? 'is-active' : null}`}>
        <div onClick={toggleActive} className="modal-background"></div>
        <div className="modal-content has-background-white">
          <div className="container">
          <form action="/" method="post">
            <TextInput
              type='text'
              value={this.state.values.username}
              touched={this.state.touched.username}
              error={this.state.errors.username}
              name='username'
              displayName='Username'
              placeholder='e.g. virusbuster001'
              handleBlur={this.handleBlur}
              handleOnChange={this.handleOnChange}
            />
            <TextInput
              type='text'
              value={this.state.values.email}
              touched={this.state.touched.email}
              error={this.state.errors.email}
              name='email'
              displayName='Email'
              placeholder='e.g. virusbuster001@gmail.com'
              handleBlur={this.handleBlur}
              handleOnChange={this.handleOnChange}
            />
            <TextInput
              type='password'
              value={this.state.values.password}
              touched={this.state.touched.password}
              error={this.state.errors.password}
              name='password'
              displayName='Password'
              handleBlur={this.handleBlur}
              handleOnChange={this.handleOnChange}
            />
            <TextInput
              type='password'
              value={this.state.values.password_confirmation}
              touched={this.state.touched.password_confirmation}
              error={this.state.errors.password_confirmation}
              name='password_confirmation'
              displayName='Password Confirmation'
              handleBlur={this.handleBlur}
              handleOnChange={this.handleOnChange}
            />
          </form>
          </div>
          <button 
          className="modal-close is-large" 
          aria-label="close"
          onClick={toggleActive} 
          ></button>
        </div>
      </div>
    )
  }
}

export default LoginForm;