process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server/index');
const knex = require('../server/db/connection');

describe('routes : user', () => {
  
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
  /**
   * Basic test to get all users from api
   */
  describe('GET /api/user', () => {
    it('should return all users', (done) => {
      chai.request(server)
      .get('/api/user')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.message.should.eql('success');
        res.body.data.length.should.eql(3);
        res.body.data[0].should.include.keys(
          'id', 'username', 'email', 'role'
        );
        done();
      });
    });
  });

  /**
   * get a single user
   */
  describe('GET /api/user/:id', () => {
    it('should return a single user', (done) => {
      chai.request(server)
      .get('/api/user/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.message.should.eql('success');
        res.body.data.should.include.keys(
          'id', 'username', 'email', 'role'
        );
        done();
      });
    });

    it('should throw an error if the user does not exist', (done) => {
      chai.request(server)
      .get('/api/user/999999')
      .end((err, res) => {
        // there should be an error
        // should.exist(err);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.message.should.eql('NotFoundError');
        // res.body.message.should.eql('That user does not exist.');
        done();
      });
    });
  });
});