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
        .get('/api/folder?sortBy=id&order=ASC')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.statusCode.should.eql(200);
          res.body.success.should.eql(true);
          res.body.message.should.eql('success');
          res.body.data.total.should.eql(203);
          res.body.data.results.length.should.eql(25);
          res.body.data.results[0].should.include.keys(
            'id', 'title', 'description', 'author_id'
          );
          done();
        });
      });
    });

    // test query validation
    it('should return return error on get folders if given incorrect query parameters', (done) => {
      testHelper.login(agent, chai).then(() => {
        agent
        .get('/api/folder')
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.message.should.eql('Invalid query parameters');
          res.body.error.length.should.eql(2);
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
  
  describe('## Folder : Child Copies routes', () => {
    describe('/api/folder/:id/chips/', () => {
      it('OWNER should create a new chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').first().then((singleFolder) => {
            agent
            .post(`/api/folder/${singleFolder.id}/chips`)
            .send({
              code: 'Z',
              folder_id: 1,
              chip_id: 1
            })
            .end((err, res) => {
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.message.should.eql('success');
              res.body.data.should.include.keys(
                'code', 'folder_id', 'chip_id'
              );
              res.body.data.folder_id.should.equal(singleFolder.id);
              done();
            });
          });
        });
      });
      it('user who is NOT OWNER should NOT be able to create a new chip copy', (done) => {
        const folderIdWithoutOwnership = 2
        testHelper.login(agent, chai).then(() => {
            agent
            .post(`/api/folder/${folderIdWithoutOwnership}/chips`)
            .send({
              code: 'Z',
              folder_id: 2,
              chip_id: 1
            })
            .end((err, res) => {
              res.status.should.equal(403);
              res.type.should.equal('application/json');
              done();
            });
        });
      });
    });
    describe('/api/folder/:id/chips/:chipId WITH user as owner of folder', () => {
      const existingChipCopyId = 1;
      it('should update an existing chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').where('author_id', 1).first().then((singleFolder) => {
            agent
            .put(`/api/folder/${singleFolder.id}/chips/${existingChipCopyId}`)
            .send({
              code: 'V',
              folder_id: 1,
            })
            .end((err, res) => {
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.message.should.eql('success');
              res.body.data.should.include.keys(
                'code', 'folder_id', 'chip_id'
              );
              res.body.data.folder_id.should.equal(singleFolder.id);
              res.body.data.id.should.equal(existingChipCopyId);
              res.body.data.code.should.equal('V');
              done();
            });
          });
        });
      });
      it('should delete an existing chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').where('author_id', 1).first().then((singleFolder) => {
            agent
            .delete(`/api/folder/${singleFolder.id}/chips/${existingChipCopyId}`)
            .end((err, res) => {
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.message.should.eql('success');
              done();
            });
          });
        });
      });
    });

    describe('/api/folder/:id/chips/:chipId WITHOUT user as owner of folder', () => {
      const existingChipCopyId = 1;
      it('should NOT update an existing chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').where('author_id', 2).first().then((singleFolder) => {
            agent
            .put(`/api/folder/${singleFolder.id}/chips/${existingChipCopyId}`)
            .send({
              code: 'V',
              folder_id: 1,
            })
            .end((err, res) => {
              res.status.should.equal(403);
              res.type.should.equal('application/json');
              done();
            });
          });
        });
      });
      it('should NOT delete an existing chip copy', (done) => {
        testHelper.login(agent, chai).then(() => {
          knex('folder').select('*').where('author_id', 2).first().then((singleFolder) => {
            agent
            .delete(`/api/folder/${singleFolder.id}/chips/${existingChipCopyId}`)
            .end((err, res) => {
              res.status.should.equal(403);
              res.type.should.equal('application/json');
              done();
            });
          });
        });
      });
    });
  })
  
});
