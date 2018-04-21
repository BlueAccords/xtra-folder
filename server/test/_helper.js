module.exports = {
  login: function(agent, chai) {
    return new Promise ((resolve, reject) => {
      agent.post('/api/auth/login')
          .send({username: 'ro1username', password: 'password111'})
          .then((res) => {
            resolve();
          }).catch((err) => {
            console.log(err);
            reject(err);
          })
      });
  },
  loginAsAdmin: function(agent, chai) {
    return new Promise ((resolve, reject) => {
      agent.post('/api/auth/login')
          .send({username: 'ro3username', password: 'password111'})
          .then((res) => {
            resolve();
          })
    });
  },
}