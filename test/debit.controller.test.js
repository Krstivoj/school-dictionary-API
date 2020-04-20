const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {
    createToken,
    createDebitPayload,
    createClassPayload,
    createUserPayload,
    createSubjectPayload
} = require('./utils/test.utils');
const {user, subject, class: Class, debit} = models;

const token = createToken('debit', true);
const subjectPayload = createSubjectPayload('SUB1', 'description', true);
const userPayload = createUserPayload('debit', true, true);
const classPayload = createClassPayload('class1', 'class 1', true);

async function prepareDebitPayload(){
    const results = await Promise.all([
        user.create(userPayload, {returning: true}),
        subject.create(subjectPayload, {returning: true}),
        Class.create(classPayload, {returning: true})
    ]);
    return createDebitPayload(results[0].id, results[1].id, results[2].id);
}
describe('/api/debit', () => {
    beforeEach(async () => {
        await debit.destroy({where: {}});
        await Promise.all([
            user.destroy({where: {}}),
            subject.destroy({where: {}}),
            Class.destroy({where: {}})
        ]);

    });
    describe('GET /', () => {
        it('Should return all debits. Expected status is 200.', async () => {
            const res = await request(app)
                .get('/api/debit/')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('POST /', () => {
       it('Should create and return debit object. Expected status is 200.', async () => {
           const debitPayload = await prepareDebitPayload();
           const res = await request(app)
               .post('/api/debit/')
               .set('Authorization', `Bearer ${token}`)
               .send(debitPayload);
           expect(res.status).to.equal(200);
           expect(res.body).to.be.an('object');
       });
       it('Should return bad request. Expected status is 400.', async () => {
           const res = await request(app)
               .post('/api/debit/')
               .set('Authorization', `Bearer ${token}`)
               .send({subject_id: 1});
           expect(res.status).to.equal(400);
       });
       it('Should return conflict. Expected status is 409.', async () => {
           const debitPayload = await prepareDebitPayload();
           await debit.create(debitPayload);
           const res = await request(app)
               .post('/api/debit/')
               .set('Authorization', `Bearer ${token}`)
               .send(debitPayload);
           expect(res.status).to.equal(409);
           expect(res.body).to.be.an('object');
       });
    });
    describe('PUT /:id', () => {
        it('Should update and return updated debit object. Expected status is 200.', async () => {
            const debitPayload = await prepareDebitPayload();
            const newDebit = await debit.create(debitPayload, {returning: true});
            const res = await request(app)
                .put(`/api/debit/${newDebit.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({school_year: new Date(2018, 11, 24)});
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .put(`/api/debit/0`)
                .set('Authorization', `Bearer ${token}`)
                .send({school_year: new Date(2018, 11, 24)});
            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409.', async () => {

        });
    });
    describe('GET /:id', () => {
        it('Should return return debit object. Expected status is 200.', async () => {
            const debitPayload = await prepareDebitPayload();
            const newDebit = await debit.create(debitPayload, {returning: true});
            const res = await request(app)
                .get(`/api/debit/${newDebit.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .get(`/api/debit/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should destroy resource. Expected status is 200.', async () => {
            const debitPayload = await prepareDebitPayload();
            const newDebit = await debit.create(debitPayload, {returning: true});
            const res = await request(app)
                .delete(`/api/debit/${newDebit.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .delete(`/api/debit/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});