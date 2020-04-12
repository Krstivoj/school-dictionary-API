const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {
    createToken,
    createClassElderPayload,
    createUserPayload,
    createClassPayload
} = require('./utils/test.utils');

const token = createToken('className', true);
const {user, class: Class, class_elder} = models;

const userPayload = createUserPayload('CE', true, true);
const classPayload = createClassPayload('C--E','class elder test', true);

describe('/api/class-elder', () => {
    beforeEach(async () => {
        await class_elder.destroy({where:{}});
        await user.destroy({where:{}});
        await Class.destroy({where:{}});
    });
    describe('GET /', () => {
        it('Should return all class elders. Expected status is 200.', async () => {
            const res = await request(app)
                .get('/api/class-elder/')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('POST /', () => {
        it('Should create and return class elder object. Expected status is 200.', async () => {
            const elder = await user.create(userPayload, {returning: true});
            const eldersClass = await Class.create(classPayload, {returning: true});

            const classElderPayload = createClassElderPayload(eldersClass.id, elder.id, true);
            const res = await request(app)
                .post('/api/class-elder/')
                .set('Authorization', `Bearer ${token}`)
                .send(classElderPayload);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should return bad request. Expected status is 400.', async () => {
            const userId = Math.floor(Math.random() * 100);
            let classElderPayload = createClassElderPayload(null, userId, true);

            const res1 = await request(app)
                .post('/api/class-elder')
                .set('Authorization', `Bearer ${token}`)
                .send(classElderPayload);
            expect(res1.status).to.equal(400);

            classElderPayload = createClassElderPayload(userId, null, true);

            const res2 = await request(app)
                .post('/api/class-elder')
                .set('Authorization', `Bearer ${token}`)
                .send(classElderPayload);
            expect(res2.status).to.equal(400);
        });
        it('Should return conflict. Expected status is 409.', async () => {
            const elder = await user.create(userPayload, {returning: true});
            const eldersClass = await Class.create(classPayload, {returning: true});

            const classElderPayload = await createClassElderPayload(eldersClass.id, elder.id, true);
            await class_elder.create(classElderPayload);

            const res = await request(app)
                .post('/api/class-elder')
                .set('Authorization', `Bearer ${token}`)
                .send(classElderPayload);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
        it('Should update and return class elder object. Expected status is 200.', async () => {

        });
        it('Should return resource not found. Expected status is 404.', async () => {

        });
        it('Should return conflict. Expected status is 409.', async () => {

        });
    });
    describe('GET /:id', () => {
        it('Should return class elder object. Expected status is 200.', async () => {

            const elder = await user.create(userPayload, {returning: true});
            const eldersClass = await Class.create(classPayload, {returning: true});

            const classElderPayload = await createClassElderPayload(eldersClass.id, elder.id, true);
            const newClassElder = await class_elder.create(classElderPayload, {returning: true});

            const res = await request(app)
                .get(`/api/class-elder/${newClassElder.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', newClassElder.id);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .get('/api/class-elder/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should remove resource. Expected status is 200.', async () => {
            const elder = await user.create(userPayload, {returning: true});
            const eldersClass = await Class.create(classPayload, {returning: true});

            const classElderPayload = await createClassElderPayload(eldersClass.id, elder.id, true);
            const newClassElder = await class_elder.create(classElderPayload, {returning: true});

            const res = await request(app)
                .delete(`/api/class-elder/${newClassElder.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .delete('/api/class-elder/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});