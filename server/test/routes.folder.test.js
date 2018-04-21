process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./../index');
const knex = require('./../db/connection');

let agent = chai.request.agent(server)
let testHelper = require('./_helper');

describe('# routes : folder', () => {
  
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
  describe('## GET /api/folder', () => {
    it('should return all folders', (done) => {
      testHelper.login(agent, chai).then(() => {
        agent
        .get('/api/folder')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.statusCode.should.eql(200);
          res.body.success.should.eql(true);
          res.body.message.should.eql('success');
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys(
            'id', 'title', 'description', 'author_id'
          );
          done();
        });
      });
    });
  });
  
  /**
  * get a single folder
  */
  describe('## GET /api/folder/:id', () => {
    it('should return a single folder', (done) => {
      knex('folder').select('*').first().then((singleFolder) => {
        testHelper.login(agent, chai).then(() => {
          agent
          .get('/api/folder/' + singleFolder.id)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.statusCode.should.eql(200);
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
              'id', 'title', 'description', 'author_id'
            );
            done();
          });
        })
      })
    });
    
    it('should throw an error if the folder does not exist', (done) => {
      testHelper.login(agent, chai).then(() => {
        agent
        .get('/api/folder/999999')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.statusCode.should.eql(404);
          res.body.message.should.eql('No folder with that id was found');
          done();
        });
      });
    });
  });
  
  // POST#folder
  // Create a new folder
  describe('## POST /api/folder/', () => {
    it('should create a single NEW folder', (done) => {
      testHelper.login(agent, chai).then(() => {
        agent
        .post('/api/folder')
        .send({
          title: 'my folder name',
          description: 'a simple folder description',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.message.should.eql('success');
          res.body.data.should.include.keys(
            'id', 'title', 'description'
          );
          res.body.data.title.should.equal('my folder name');
          done();
        });
      });
    });
  });
  
  /**
  * Update a single folder
  */
  describe('## PUT /api/folder/', () => {
    it('should update a current folder', (done) => {
      testHelper.login(agent, chai).then(() => {
        knex('folder').select('*').first().then((singleFolder) => {
          // chai.request(server)
          agent
          .put(`/api/folder/${singleFolder.id}`)
          .send({
            description: 'updated folder description',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.message.should.eql('success');
            res.body.data.should.include.keys(
              'id', 'title', 'description'
            );
            res.body.data.description.should.equal('updated folder description');
            done();
          });
        });
      });
    });
    
    it('should throw an error if folder id does not exist', (done) => {
      const invalidFolderId = 99999;
      testHelper.login(agent, chai).then(() => {
        agent
        .put(`/api/folder/${invalidFolderId}`)
        .send({
          description: 'updated folder description',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          done();
        });
      });
    });
  });
  
  describe.skip('## Folder : Child Copies routes', () => {
    describe(' /api/folder/:id/chips/:chipId', () => {
      it('should create a new chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').first().then((singleFolder) => {
            // TODO
            agent
            .put(`/api/folder/${singleFolder.id}`)
            .send({
              description: 'updated folder description',
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.message.should.eql('success');
              res.body.data.should.include.keys(
                'id', 'title', 'description'
              );
              res.body.data.description.should.equal('updated folder description');
              done();
            });
          });
        });
      });
      
      it('should throw an error if folder id does not exist', (done) => {
        const invalidFolderId = 99999;
        testHelper.login(agent, chai).then(() => {
          agent
          .put(`/api/folder/${invalidFolderId}`)
          .send({
            description: 'updated folder description',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            done();
          });
        });
      });
    });
  })
  
});
