module.exports = {
  login: function(agent, chai) {
    return new Promise ((resolve, reject) => {
      // agent = chai.request.agent(server);
      agent.post('/api/auth/login')
          .send({username: 'ro1username', password: 'password111'})
          .then((res) => {
            resolve();
          })
    });
  }
}