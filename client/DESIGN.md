# Design Documentation
This file contains the rough design documentation for the front end of this site.

## Technology Stack
- Webpack 4.0
- React
- Redux
  - Global store for state shared among multiple components
- Redux Sagas
  - Used for asynchronous action management in redux store
- CSS
  - Bulma CSS Framework

## Register Account Flow
- User Opens Register modal
- User enters information
- User hits submit button
  - Submit button dispatches `REQUEST_REGISTER` ACTION
  - `watchRegisterSaga` saga receives `REQUEST_REGISTER` Action and runs `submitRegisterForm` SAGA
  - `submitRegisterForm` saga runs makes API call with register form data
  - `submitRegisterForm` saga receives response from API call
  - `submitRegisterForm` saga dispatches `RECEIVE_REGISTER` action with API response
  - `RECEIVE_REGISTER` reducer receives the action and payload, and sets user information/session token
  - Redux store is changed
- User is redirected to a dashboard/home page after successful register