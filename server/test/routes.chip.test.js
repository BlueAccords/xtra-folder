process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./../index');
const knex = require('./../db/connection');
let agent = chai.request.agent(server)
let testHelper = require('./_helper');

describe('routes : chip', () => {
  
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
    return knex.migrate.rollback()
    .then(() => {
      agent.close();
    });
  });

/**
 * =================== TESTS ====================================
 */
  describe('GET /api/chip', () => {
    it('should return all chips', (done) => {
      testHelper.login(agent, chai).then(() => {
      agent
        .get('/api/chip')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.message.should.eql('success');
          res.body.data.length.should.eql(264);
          res.body.data[0].should.include.keys(
            'id', 'original_name', 'original_description', 'chip_number'
          );
          done();
        });
      });
    });
  });

  /**
   * get a single chip
   */
  describe('GET /api/chip/:id', () => {
    it('should return a single chip', (done) => {
      knex('chip').select('*').first().then((singleChip) => {
        testHelper.login(agent, chai).then(() => {
          agent
            .get('/api/chip/' + singleChip.id)
            .end((err, res) => {
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
            'id', 'original_name', 'original_description', 'chip_number'
            );
              done();
            });
          });
      })
    });

    it('should throw an error if the chip does not exist', (done) => {

      testHelper.login(agent, chai).then(() => {
        agent
        .get('/api/chip/999999')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.message.should.eql('NotFoundError');
          done();
        });
      });
    });
  });

  // POST#chip
  // Create a new chip
  describe('POST /api/chip/', () => {
    it('should create a single NEW chip', (done) => {
      testHelper.loginAsAdmin(agent, chai).then(() => {
        agent
          .post('/api/chip')
          .send({
            original_name: 'my chip name',
            original_description: 'a simple chip description',
            chip_number: 999
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(201);
            res.type.should.equal('application/json');
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
            'id', 'original_name', 'original_description', 'chip_number'
            );
            res.body.data.original_name.should.equal('my chip name');
            done();
          });
        });
    });
  });

  // PUT#chip
  // update a chip
  describe('PUT /api/chip/', () => {
    it('should throw an error if chip id does not exist', (done) => {
      const invalidId = 999999;
      testHelper.loginAsAdmin(agent, chai).then(() => {
        agent
          .put(`/api/chip/${invalidId}`)
          .send({
            original_description: 'updated chip description',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.message.should.eql('NotFoundError');
            done();
        });
      });
    });

    it('should update a current chip', (done) => {
      knex('chip').select('*').first().then((singleChip) => {
      testHelper.loginAsAdmin(agent, chai).then(() => {
        agent
          .put(`/api/chip/${singleChip.id}`)
          .send({
            original_description: 'updated chip description',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
              'id', 'original_name', 'original_description', 'chip_number'
            );
            res.body.data.original_description.should.equal('updated chip description');
            done();
          });
        });
      });
    });

    it('should NOT update a current chip if user is standard role', (done) => {
      knex('chip').select('*').first().then((singleChip) => {
      testHelper.login(agent, chai).then(() => {
        agent
          .put(`/api/chip/${singleChip.id}`)
          .send({
            original_description: 'updated chip description',
          })
          .end((err, res) => {
            res.status.should.equal(403);
            res.type.should.equal('application/json');
            done();
          });
        });
      });
    });


  });
});
