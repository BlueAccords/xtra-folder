import React, { Fragment } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSpinner }from '@fortawesome/fontawesome-free-solid';

const Loader = ({isLoading, children}) => {
  if(isLoading) {
    return (
      <div className="has-text-centered spinner-container">
        <FontAwesomeIcon icon={faSpinner} size='5x' spin/>
      </div>
    )
  }
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default Loader;