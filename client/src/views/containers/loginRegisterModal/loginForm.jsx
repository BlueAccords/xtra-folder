
import React from 'react';
import Yup from 'yup';
import TextInput from '../../components/forms/textInput.jsx';

const schema = {
  username: Yup.string().min(3).max(40).required(),
  password: Yup.string().min(6).max(100).required(),
}

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
    this.validateField = this.validateField.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
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

    // validate fields on blur
    this.validateField(name, this.state.values[name]);
  }

  // generic update for all inputs by their name
  handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newValues = {
      ...this.state.values, 
      [name]: value
    }

    this.setState({
      values: newValues
    });

    this.validateField(name, value);
  }

  // validate field for given name and set error
  validateField(name, value) {
    let newErrors;
    schema[name].validate(value).then((validValue) => {
      newErrors = {
        ...this.state.errors, 
        [name]: ''
      }
      this.setState({
        errors: newErrors
      });
    }).catch((err) => {
      newErrors = {
        ...this.state.errors, 
        [name]: err.message
      }
      this.setState({
        errors: newErrors
      });
    })
  }

  // Checks if every field is touched and has no errors
  canSubmit() {
    const hasNoErrors = Object.keys(this.state.errors).every(k => !this.state.errors[k]);
    const allFieldsTouched = Object.keys(this.state.touched).every(k => this.state.touched[k]);

    return (allFieldsTouched && hasNoErrors);
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
          <button 
            className="button is-primary" 
            disabled={!this.canSubmit()}>
              Login
            </button> 
          <button className="button" onClick={toggleActive}>Cancel</button> 
        </footer>
      </div>
    )
  };
}

export default LoginForm;