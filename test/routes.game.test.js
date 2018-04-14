process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server/index');
const knex = require('../server/db/connection');
let agent = chai.request.agent(server)
let testHelper = require('./_helper');


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

describe.only('routes : game', () => {
  
  // seed before each test
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); })
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
          // chai.request(server)
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
        // chai.request(server)
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
