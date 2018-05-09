
import React, { Fragment } from 'react';
import Yup from 'yup';
import { Form, Formik } from 'formik';

class LoginForm extends React.Component {

  getSubmitBtnClasses(isSubmitting, isValid) {
    let names = ['button', 'is-primary'];
      if(isSubmitting) {
        names.push('is-loading');
      } else if(isValid) {
        names.push('is-primary');
      }
      return names.join(' ');
  }
  render() {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(3).max(40).required(),
          email: Yup.string()
            .email().min(5).max(255).required(),
          password: Yup.string()
            .min(6).max(100).required(),
          password_confirmation: Yup.string()
          .test('match', 'Passwords do not match', function (password_confirmation) {
            return password_confirmation === this.parent.password
          })
          .required(),
        })}
        initialValues={{
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values));
          this.props.handleRegister(values)
          .then((response) => {
            console.log('success?');
            console.log(response);
          })
          .catch((err) => {
            console.log('failure?');
            console.log(err);
            actions.setSubmitting(false);
            actions.setStatus('Username is already taken');
          })
        }}
        render={({
          values,
          errors,
          touched,
          status,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid
        }) => (
          <Fragment>
            <section className="modal-card-body">
            {status && 
              <article className="message is-danger">
                <div className="message-header">
                  <p>Error</p> 
                </div> 
                <div className="message-body">
                {status} 
                </div>
              </article>
            }
            <form onSubmit={handleSubmit}>
              {/* form body */}
                <div className="field">
                  <label htmlFor="username">Username</label> 
                  <div className="control">
                    <input 
                      className={`input`}
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />      
                  </div>
                  {touched.username && errors.username && <div className="help is-danger">{errors.username}</div> }
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label> 
                  <div className="control">
                    <input 
                      className={`input`}
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />      
                  </div>
                  {touched.email && errors.email && <div className="help is-danger">{errors.email}</div> }
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label> 
                  <div className="control">
                    <input 
                      className={`input`}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />      
                  </div>
                  {touched.password && errors.password && <div className="help is-danger">{errors.password}</div> }
                </div>
                <div className="field">
                  <label htmlFor="password_confirmation">Password Confirmation</label> 
                  <div className="control">
                    <input 
                      className={`input`}
                      type="password"
                      name="password_confirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                    />      
                  </div>
                  {touched.password_confirmation && errors.password_confirmation && <div className="help is-danger">{errors.password_confirmation}</div> }
                </div>
                <input type="submit"
                  style = {
                    {display: 'none'} // invisible input, so we can submit form by hitting enter
                  }/>
            </form>
              </section>
            {/* footer */}
            <footer className="modal-card-foot">
              <button 
                onClick={handleSubmit}
                type="button"
                className={this.getSubmitBtnClasses(isSubmitting, isValid)}
                disabled={!isValid || isSubmitting}>
                Register
              </button> 
              <button className="button" onClick={(e) => {
                e.preventDefault();
                this.props.toggleActive();}
                }>
                Cancel
                </button> 
            </footer>
          </Fragment>
        )}
      />
    )
  }
}



export default LoginForm;