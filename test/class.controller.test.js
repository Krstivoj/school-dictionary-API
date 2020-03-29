const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {createToken, createClassPayload} = require('./utils/test.utils');

const token = createToken('className', true);

describe('/api/class', () => {
    beforeEach( async () => {
        const Class = models.class;
        await Class.destroy({where:{}});
    });
    describe('GET /', () => {
       it('Should return all classes. Expected status is 200', async () => {
           const res = await request(app)
               .get('/api/class')
               .set('Authorization', `Bearer ${token}`);
           expect(res.status).to.equal(200);
           expect(res.body).to.be.an('array');
       });
    });
    describe('POST /', () => {
        it('Should create new class and return created object. Expected status is 200', async () => {
            const classPayload = createClassPayload('FIRST CLASS post', 'First class (1)', true);
            const res = await request(app)
                .post('/api/class')
                .set('Authorization', `Bearer ${token}`)
                .send(classPayload);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('key', classPayload.key);
            expect(res.body).to.have.property('description', classPayload.description);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const classPayload = createClassPayload('FIRST CLASS post 409 ', 'First class (1)', true);
            const Class = models.class;
            await Class.create(classPayload);
            const res = await request(app)
                .post('/api/class')
                .set('Authorization', `Bearer ${token}`)
                .send(classPayload);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
        it('Should update and return updated class. Expected status is 200', async () => {
            const classPayload = createClassPayload('FIRST CLASS put', 'First class (1)', true);
            const Class = models.class;
            const newClass = await Class.create(classPayload, {returning: true});
            const updated = {
                key: 'putTest',
                description: 'some description'
            };
            const res = await request(app)
                .put(`/api/class/${newClass.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({...updated});

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', newClass.id);
            expect(res.body).to.have.property('key', updated.key);
            expect(res.body).to.have.property('description', updated.description);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const updated = {
                key: 'putTest',
                description: 'some description'
            };
            const res = await request(app)
                .put(`/api/class/0`)
                .set('Authorization', `Bearer ${token}`)
                .send({...updated});

            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const classPayloads = [
                createClassPayload('FIRST CLASS 409','First class(1)', true),
                createClassPayload('SECOND CLASS 409','Second class(2)', true)];
            const Class = models.class;
            const class1 = await Class.create(classPayloads[0], {returning: true});
            await Class.create(classPayloads[1]);
            const res = await request(app)
                .put(`/api/class/${class1.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ key: classPayloads[1].key});
            expect(res.status).to.equal(409);
        });
    });
    describe('GET /:id', () => {
        it('Should return one class. Expected status is 200', async () => {
            const classPayload = createClassPayload('get by id', '---', true);
            const Class = models.class;
            const newClass = await Class.create(classPayload, {returning: true});
            const res = await request(app)
                .get(`/api/class/${newClass.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id', newClass.id);
            expect(res.body).to.have.property('key');
            expect(res.body).to.have.property('description');
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const token = createToken('username12', true);
            const res = await request(app)
                .get(`/api/class/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        })
    });
    describe('DELETE /:id', () => {
        it('Should delete resource. Expected resource is 200', async () => {
            const classPayload = createClassPayload('delete by id', '---', true);
            const Class = models.class;
            const newClass = await Class.create(classPayload, {returning: true});
            const res = await request(app)
                .delete(`/api/class/${newClass.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const res = await request(app)
                .delete(`/api/class/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});