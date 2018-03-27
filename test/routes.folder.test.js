process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server/index');
const knex = require('../server/db/connection');

describe('routes : folder', () => {
  
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
  describe('GET /api/folder', () => {
    it('should return all folders', (done) => {
      chai.request(server)
      .get('/api/folder')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(3);
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'author_id'
        );
        done();
      });
    });
  });

  /**
   * get a single user
   */
  describe('GET /api/folder/:id', () => {
    it('should return a single folder', (done) => {
      knex('folder').select('*').first().then((singleFolder) => {
        chai.request(server)
          .get('/api/folder/' + singleFolder.id)
          .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id', 'title', 'description', 'author_id'
          );

          done();
        });
      })
    });

    it.skip('should throw an error if the user does not exist', (done) => {
      chai.request(server)
      .get('/api/user/999999')
      .end((err, res) => {
        // there should be an error
        // should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That user does not exist."}
        res.body.message.should.eql('That user does not exist.');
        done();
      });
    });
  });
});