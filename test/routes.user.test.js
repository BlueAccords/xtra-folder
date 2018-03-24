process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require.main.require('server/index');
const knex = require.main.require('server/db/connection');

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
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": [3 user objects]}
      res.body.data.length.should.eql(3);
      // the first object in the data array should
      // have the right keys
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
  it('should return a single users', (done) => {
    chai.request(server)
    .get('/api/user/1')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": [3 user objects]}
      res.body.data[0].should.include.keys(
        'id', 'username', 'email', 'role'
      );
      done();
    });
  });
});







  
});