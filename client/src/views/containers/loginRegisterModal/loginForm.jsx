
import React from 'react';
import TextInput from '../../components/forms/textInput.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
      },
      touched: {
        username: false,
        password: false,
      },
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // handles input blur event by updating touched state.
  handleBlur(event) {
    const name = event.target.name;
    const newState = {
      ...this.state.touched, 
      [name]: true
    }

    this.setState({
      touched: newState
    });
  }

  // generic update for all inputs by their name
  handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = {
      ...this.state.values, 
      [name]: value
    }

    this.setState({
      values: newState
    });
  }



  render() {
    const {
      toggleActive
    } = this.props;
    return (
      <div>
        <section className="modal-card-body">
          <form action="/" method="post">
            <TextInput
              type='text'
              value={this.state.values.username}
              touched={this.state.touched.username}
              error={this.state.errors.username}
              name='username'
              displayName='Username or Email'
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
          </form>
          </section>
        {/* footer */}
        <footer className="modal-card-foot">
          <button className="button is-success">Login</button> 
          <button className="button" onClick={toggleActive}>Cancel</button> 
        </footer>
      </div>
    )
  };
}

export default LoginForm;