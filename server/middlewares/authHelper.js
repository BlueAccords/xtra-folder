module.exports = {
  // helper function, just used so it can be stubbed during tests
  isAuthenticated: function(req) {
    return req.isAuthenticated();
  }
}