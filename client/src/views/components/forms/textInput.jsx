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


  const classNames = touched && !error ? 'is-success' : 'is-info';
  return (
    <div className="field">
      <label htmlFor={name} className="label">{displayName}</label> 
      <div className="control">
        <input 
          name={name} 
          type={type} 
          className={`input ${classNames}`}
          placeholder={placeholder || null}
          onChange={handleOnChange}
          onBlur={handleBlur}
          value={value}/> 
      </div>
    </div>
  )
}

// TODO: add proptypes
export default TextInput;