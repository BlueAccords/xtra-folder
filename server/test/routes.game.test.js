process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('./../index');
const knex = require('./../db/connection');

chai.use(chaiHttp);
let agent = chai.request.agent(server)
let testHelper = require('./_helper');




// TODO: remove this, use helper version instead
function login() {
  return new Promise ((resolve, reject) => {
    agent = chai.request.agent(server);
    agent.post('/api/auth/login')
        .send({username: 'ro1username', password: 'password111'})
        .then((res) => {
          resolve();
        })
  });
}

describe('routes : game', () => {
  
  // seed before each test
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); })
      .then(() => {
        agent.close();
        agent = chai.request.agent(server);
      });
  });
  
  afterEach(() => {
    return knex.migrate.rollback();
  });

/**
 * =================== TESTS ====================================
 */
  describe('GET /api/game', () => {
    it('should return all games', (done) => {
      testHelper.login(agent, chai).then(() => {
      agent
      .get('/api/game')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.message.should.eql('success');
        res.body.data.length.should.eql(3);
        res.body.data[0].should.include.keys(
          'id', 'title', 'description'
        );
        done();
      });
      })
    });
  });

  /**
   * get a single game
   */
  describe('GET /api/game/:id', () => {
    it('should return a single game', (done) => {
      login().then(() => {
        knex('game').select('*').first().then((singleGame) => {
          agent
            .get('/api/game/' + singleGame.id)
            .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
              'id', 'title', 'description', 'parent_game_id'
            );
            done();
          });
        })
      });
    });

    it('should throw an error if the game does not exist', (done) => {
      login().then(() => {
        agent
        .get('/api/game/999999')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.message.should.eql('NotFoundError');
          done();
        });
      });
    });
  });
});
