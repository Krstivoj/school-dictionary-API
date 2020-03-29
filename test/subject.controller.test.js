const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');


const {createToken, createSubjectPayload} = require('./utils/test.utils');

const token = createToken('usernameR', true);

describe('/api/subject', () => {
    beforeEach(async () => {
        const {subject} = models;
        await subject.destroy({where: {}});
    });
    describe('GET /', () => {
        it('Should return all subjects. Expected status is 200.', async () => {
            const res = await request(app)
                .get('/api/subject')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('POST /', () => {
        it('Should create and return subject. Expected status is 200.', async () => {
            const subjectPayload = createSubjectPayload('POST', 'Some description', true);
            const res = await request(app)
                .post('/api/subject')
                .set('Authorization',`Bearer ${token}`)
                .send(subjectPayload);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('key', subjectPayload.key);
            expect(res.body).to.have.property('description', subjectPayload.description);
        });
        it('Should return bad request. Expected status is 400.', async () => {
            const subjectPayload = createSubjectPayload('POST400', 'Some description', false);
            const res = await request(app)
                .post('/api/subject')
                .set('Authorization',`Bearer ${token}`)
                .send(subjectPayload);
            expect(res.status).to.equal(400);
        });
        it('Should return conflict. Expected status 409.', async () => {
            const subjectPayload = createSubjectPayload('POST409', 'Some description', true);
            const {subject} = models;
            await subject.create(subjectPayload);
            const res = await request(app)
                .post('/api/subject')
                .set('Authorization',`Bearer ${token}`)
                .send(subjectPayload);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
        it('Should update and return updated subject. Expected status is 200.', async () => {
            const subjectPayload = createSubjectPayload('PUT', 'Some description', true);
            const {subject} = models;
            const newSubject = await subject.create(subjectPayload, {returning: true});
            const res = await request(app)
                .put(`/api/subject/${newSubject.id}`)
                .set('Authorization',`Bearer ${token}`)
                .send({
                    key: 'PUT_TEST'
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', newSubject.id);
            expect(res.body).to.have.property('key', 'PUT_TEST');
            expect(res.body).to.have.property('description', subjectPayload.description);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .put(`/api/subject/0`)
                .set('Authorization',`Bearer ${token}`)
                .send({
                    key: 'PUT_TEST'
                });
            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409.', async () => {
            const subjectPayloads = [
                createSubjectPayload('PUT4091', 'Some description', true),
                createSubjectPayload('PUT4092', 'Some description', true)];
            const {subject} = models;
            const newSubject = await subject.create(subjectPayloads[0], {returning: true});
            await subject.create(subjectPayloads[1]);
            const res = await request(app)
                .put(`/api/subject/${newSubject.id}`)
                .set('Authorization',`Bearer ${token}`)
                .send({
                    key: subjectPayloads[1].key
                });
            expect(res.status).to.equal(409);
        });
    });
    describe('GET /:id', () => {
        it('Should return subject requested by id. Expected status is 200.', async () => {
            const subjectPayload = createSubjectPayload('POST', 'Some description', true);
            const {subject} = models;
            const newSubject = await subject.create(subjectPayload, {returning: true});
            const res = await request(app)
                .get(`/api/subject/${newSubject.id}`)
                .set('Authorization',`Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('key');
            expect(res.body).to.have.property('description');
        });
        it('Should return resource not found. Expected result is 404.', async () => {
            const res = await request(app)
                .get(`/api/subject/0`)
                .set('Authorization',`Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should delete resource. Expected status is 200.', async () => {
            const subjectPayload = createSubjectPayload('POST', 'Some description', true);
            const {subject} = models;
            const newSubject = await subject.create(subjectPayload, {returning: true});
            const res = await request(app)
                .delete(`/api/subject/${newSubject.id}`)
                .set('Authorization',`Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .delete(`/api/subject/0`)
                .set('Authorization',`Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});
