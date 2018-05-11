process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./../index');
const knex = require('./../db/connection');

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { 
        return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST api/auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/api/auth/register')
      .send({
        username: 'validusername',
        password: 'validpassword',
        password_confirmation: 'validpassword',
        email: 'validemail@gmail.com'
      })
      .end((err, res) => {
        should.not.exist(err);
        // .text contains validation error messages
        // console.log(res.text);
        res.body.message.should.eql('successfully registered and logged in');
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.success.should.eql(true);
        done();
      });
    });
  });

  describe('POST api/auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          username: 'ro1username',
          password: 'password111',
          password_confirmation: 'password111',
          email: 'ro1email@gmail.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.success.should.eql(true);
          res.body.message.should.eql('successfully logged in');
          done();
        });
    });
    it('should not allow incorrect password', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          username: 'ro1username',
          password: 'wrongpassword',
          password_confirmation: 'wrongpassword',
          email: 'ro1email@gmail.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.message.should.eql('Invalid password');
          done();
      });
    });
    it('should not allow non-existent username', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          username: 'invalidusername',
          password: 'password111',
          password_confirmation: 'password111',
          email: 'ro1email@gmail.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.message.should.eql('user with that username does not exist');
          done();
        });
    });
  });
});