/**
 * helper function to transform object of key/value pairs to be sent as part of 
 * api call URL 
 * @param {Object} params object of query parameters
 */
export const concatParams = function(params) {
  const paramsArr = Object.keys(params).reduce((acc, val) => {
    // check if array, and concat item in array if value is true
    if(Array.isArray(params[val])) {
      const valArr = params[val];
      valArr.forEach(option => {
        if(option.checked) acc.push(val.concat('=', option.label));
      });

      return acc;
    } else if(params[val] !== undefined && params[val] !== '') {
      acc.push(val.concat('=', params[val]));
      return acc;
    } else {
      return acc;
    }
  }, [])
  
  return paramsArr.join('&');
}
