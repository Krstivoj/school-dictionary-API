const request = require('supertest');
const expect = require('chai').expect;

const db = require('../config');
const app = require('../index');
const {createToken, createClassPayload} = require('./utils/test.utils');

describe('/api/class', () => {
    beforeEach( async () => {
        const {Class} = db;
        await Class.destroy({where:{}});
    });
    describe('GET /', () => {
       it('Should return all classes. Expected status is 200', async () => {
           const classes = [
               createClassPayload('FIRST CLASS','First class(1)'),
               createClassPayload('SECOND CLASS','Second class(2)')];
           const {Class} = db;
           await Class.bulkCreate(classes);
           const token = createToken('className', true);
           const res = await request(app)
               .get('/api/class')
               .set('Authorization', `Bearer ${token}`);
           expect(res.status).to.equal(200);
           expect(res.body.length).to.equal(classes.length);
       });
    });
    describe('POST /', () => {
        it('Should create new class and return created object. Expected status is 200', async () => {
            const classObject = createClassPayload('FIRST CLASS post', 'First class (1)');
            const token = createToken('classPost', true);
            const res = await request(app)
                .post('/api/class')
                .set('Authorization', `Bearer ${token}`)
                .send(classObject);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('key', classObject.key);
            expect(res.body).to.have.property('description', classObject.description);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const classObject = createClassPayload('FIRST CLASS post 409 ', 'First class (1)');
            const {Class} = db;
            await Class.create(classObject);
            const token = createToken('classUsername', true);
            const res = await request(app)
                .post('/api/class')
                .set('Authorization', `Bearer ${token}`)
                .send(classObject);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
        it('Should update and return updated class. Expected status is 200', async () => {
            const classObject = createClassPayload('FIRST CLASS put', 'First class (1)');
            const token = createToken('classPut', true);
            const {Class} = db;
            const newClass = await Class.create(classObject, {returning: true});
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
            const token = createToken('classPut', true);
            const res = await request(app)
                .put(`/api/class/0`)
                .set('Authorization', `Bearer ${token}`)
                .send({...updated});

            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const classes = [
                createClassPayload('FIRST CLASS 409','First class(1)'),
                createClassPayload('SECOND CLASS 409','Second class(2)')];
            const {Class} = db;
            const class1 = await Class.create(classes[0]);
            await Class.create(classes[1]);
            const token = createToken('className', true);
            const res = await request(app)
                .put(`/api/class/${class1.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ key: classes[1].key});
            expect(res.status).to.equal(409);
        });
    });
    describe('GET /:id', () => {
        it('Should return one class. Expected status is 200', async () => {
            const classPayload = createClassPayload('get by id', '---');
            const {Class} = db;
            const newClass = await Class.create(classPayload);
            const token = createToken('username12', true);
            const res = await request(app)
                .get(`/api/class/${newClass.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
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
            const classPayload = createClassPayload('delete by id', '---');
            const {Class} = db;
            const newClass = await Class.create(classPayload);
            const token = createToken('username12', true);
            const res = await request(app)
                .delete(`/api/class/${newClass.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const token = createToken('username12', true);
            const res = await request(app)
                .delete(`/api/class/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});