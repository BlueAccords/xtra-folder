process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server/index');
const knex = require('../server/db/connection');

describe('routes : game', () => {
  
  // seed before each test
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });
  
  afterEach(() => {
    return knex.migrate.rollback();
  });

/**
 * =================== TESTS ====================================
 */
  describe('GET /api/game', () => {
    it('should return all games', (done) => {
      chai.request(server)
      .get('/api/game')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(3);
        res.body.data[0].should.include.keys(
          'id', 'title', 'description'
        );
        done();
      });
    });
  });

  /**
   * get a single game
   */
  describe('GET /api/game/:id', () => {
    it('should return a single game', (done) => {
      knex('game').select('*').first().then((singleGame) => {
        chai.request(server)
          .get('/api/game/' + singleGame.id)
          .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id', 'title', 'description', 'parent_game_id'
          );
          done();
        });
      })
    });

    it('should throw an error if the game does not exist', (done) => {
      chai.request(server)
      .get('/api/game/999999')
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That game does not exist.');
        done();
      });
    });
  });
});
