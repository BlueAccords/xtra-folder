// supports text/password input. More later as needed

import React from 'react';

const TextInput = (props) => {
  const { 
    type,
    value,
    touched,
    name,
    error,
    displayName,
    placeholder,
    handleBlur,
    handleOnChange
    } = props;
  
  function classNames() {
    let returnName = '';
    if(touched && !error) {
      returnName = 'is-success';
    } else if(touched && error) {
      returnName = 'is-danger';
    }
    

    return returnName;
  }

  return (
    <div className="field">
      <label htmlFor={name} className="label">{displayName}</label> 
      <div className="control">
        <input 
          name={name} 
          type={type} 
          className={`input ${classNames()}`}
          placeholder={placeholder || null}
          onChange={handleOnChange}
          onBlur={handleBlur}
          value={value}/> 
      </div>
      {touched && error ?
        <div className="help is-danger">{error}</div> 
        : null
      }
    </div>
  )
}

// TODO: add proptypes
export default TextInput;