// dependencies
const { expect } = require('chai');
const { join } = require('path');
const request = require('supertest');

// static
const data = {
  name: 'test',
  phone: '123456',
  email: 'test@email.com',
};

describe('Controller:Contact', () => {
  describe('POST /contacts', () => {
    it('Should created new Contact', (done) => {
      request(sails.hooks.http.app)
        .post(sails.config.blueprints.prefix + '/contacts')
        .send(data)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.contact.name).to.equal(data.name);
          expect(res.body.contact.phone).to.equal(data.phone);
          expect(res.body.contact.address).to.equal(undefined);
          return done();
        });
    });

    it('Should fail to create because of missing phone Contact', (done) => {
      const requestData = Object.assign({}, data, {
        phone: null,
      });

      request(sails.hooks.http.app)
        .post(sails.config.blueprints.prefix + '/contacts')
        .send(requestData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.statusCode).to.equal(400);
          expect(res.body.phone).to.be.an('array');
          return done();
        });
    });
  });

  describe('GET /contacts', () => {
    it('Should getted Contact', (done) => {
      request(sails.hooks.http.app)
        .get(sails.config.blueprints.prefix + '/contacts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.contacts).to.be.an('array');
          expect(res.body.hits).to.be.a('number');
          data.id = res.body.contacts[0].id;
          return done();
        });
    });
  });

  describe('GET /contacts/:id', () => {
    it('should respond with the requested Contact:id', (done) => {
      request(sails.hooks.http.app)
        .get(sails.config.blueprints.prefix + '/contacts/' + data.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.contact.name).to.equal(data.name);
          expect(res.body.contact.phone).to.equal(data.phone);
          expect(res.body.contact.address).to.equal(undefined);
          return done();
        });
    });

    it('should respond a 404 not found error for Contact:id', (done) => {
      request(sails.hooks.http.app)
        .get(sails.config.blueprints.prefix + '/contacts/1a23')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(err => (
          done(err)
        ));
    });
  });

  describe('PUT /contacts/:id', () => {
    it('should respond updated Contact', (done) => {
      const requestData = Object.assign({}, data, {
        phone: null,
      });

      request(sails.hooks.http.app)
        .put(sails.config.blueprints.prefix + '/contacts/' + data.id)
        .send(requestData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(err => (
          done(err)
        ));
    });

    it('should respond updated Contact', (done) => {
      request(sails.hooks.http.app)
        .put(sails.config.blueprints.prefix + '/contacts/' + data.id)
        .send({
          name: 'test2',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body.contact.name).to.equal('test2');
          expect(res.body.contact.phone).to.equal(data.phone);
          expect(res.body.contact.address).to.equal(undefined);
          return done();
        });
    });
  });

  describe('POST /contacts/:id/image', () => {
    it('Should upload image to s3 and update the contact', (done) => {
      request(sails.hooks.http.app)
        .post(sails.config.blueprints.prefix + '/contacts/' + data.id + '/image')
        .expect(200)
        .attach('image', join(__dirname, '../../fixtures/default.png'))
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.statusCode).to.equal(200);
          return done();
        });
    });
  });

  describe('DELETE /contacts/:id', () => {
    it('should respond with 204 on successful removal', (done) => {
      request(sails.hooks.http.app)
        .delete(sails.config.blueprints.prefix + '/contacts/' + data.id)
        .expect(204)
        .end(err => (
          done(err)
        ));
    });
  });

  // Clear Contact after testing
  after(() => (
    Contact.destroy()
  ));
});
