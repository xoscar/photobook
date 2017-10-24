// dependencies
const { expect } = require('chai');

// static
const data = {};

describe('Model:Contact', () => {
  describe('create()', () => {
    it('should create a record', (done) => {
      Contact.create({
        phone: '123456678',
        address: 'Test address',
        name: 'test name',
        email: 'test@email.com',
      })

        .then((contact) => {
          data.id = contact.id;
          expect(contact).to.be.an('object').and.to.have.any.keys('phone', 'address', 'name', 'email');
          done();
        });
    });
  });

  describe('update()', () => {
    it('should update a record', (done) => {
      Contact.update({ id: data.id }, {
        name: 'test 2',
      })

        .then(([ updatedContact ]) => {
          expect(updatedContact).to.be.an('object').and.to.have.any.keys('phone', 'address', 'name', 'email');
          expect(updatedContact.name).to.equals('test 2');
          done();
        });
    });
  });

  describe('find()', () => {
    it('should return a record', (done) => {
      Contact.findOne({ id: data.id })

        .then((contact) => {
          expect(contact).to.be.an('object').and.to.have.any.keys('phone', 'address', 'name', 'email');
          done();
        });
    });
  });

  describe('destroy()', () => {
    it('should destroy a record', (done) => {
      Contact.destroy({ id: data.id })

        .then(() => {
          done();
        });
    });
  });
});
