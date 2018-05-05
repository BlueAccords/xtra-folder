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


### Javascript Web Token (JWT)
- Resources
  - https://github.com/themikenicholson/passport-jwt
- When should we check for it on the server?
- What method should we use to send it when making requests from the client?
  - Possible methods:
    - `fromHeader(header_name)` creates a new extractor that looks for the JWT in the given http header
    - `fromBodyField(field_name)` creates a new extractor that looks for the JWT in the given body field. You must have a body parser configured in order to use this method.
    - `fromUrlQueryParameter(param_name)` creates a new extractor that looks for the JWT in the given URL query parameter.
    - `fromAuthHeaderWithScheme(auth_scheme)` creates a new extractor that looks for the JWT in the authorization header, expecting the scheme to match auth_scheme.
    - `fromAuthHeaderAsBearerToken()` creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
    - `fromExtractors([array of extractor functions])` creates a new extractor using an array of extractors provided. Each extractor is attempted in order until one returns a token.
- Storage on browser
  - We can store JWT on the client side in either localStorage or cookies. localStorage is vulnerable to XSS(Cross-Site Scripting) attacks, while cookies are vulnerable to CSRF(Cross Site Request Forgery) attacks. After doing some research on this it seems like storing the JWT in cookies is the better option as CSRF is easier to mitigate than XSS.

## Flows


### Register Account Flow
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