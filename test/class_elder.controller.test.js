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
            Promise.all([user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})])
                .then(async results => {
                    const elder = results[0];
                    const eldersClass = results[1];
                    const classElderPayload = createClassElderPayload(eldersClass.id, elder.id, true);
                    const res = await request(app)
                        .post('/api/class-elder/')
                        .set('Authorization', `Bearer ${token}`)
                        .send(classElderPayload);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
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
            Promise.all([user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})])
                .then(async results => {
                    const elder = results[0];
                    const eldersClass = results[1];
                    const classElderPayload = createClassElderPayload(eldersClass.id, elder.id, true);
                    await class_elder.create(classElderPayload);

                    const res = await request(app)
                        .post('/api/class-elder')
                        .set('Authorization', `Bearer ${token}`)
                        .send(classElderPayload);
                    expect(res.status).to.equal(409);
                });
        });
    });
    describe('PUT /:id', () => {
        it('Should update and return class elder object. Expected status is 200.', async () => {
            const class2 = createClassPayload('KET', 'some class description', true);
            Promise.all([
                Class.create(classPayload, {returning: true}),
                user.create(userPayload, {returning: true}),
                Class.create(class2, {returning: true})])
                .then( async results => {
                    const classElder = createClassElderPayload(results[0].id, results[1].id, true);
                    const newClassElder = await class_elder.create(classElder, {returning: true});
                    const res = await request(app)
                        .put(`/api/class-elder/${newClassElder.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send({class_id: results[2].id});
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', newClassElder.id);
                });
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const newClass1 = await Class.create(classPayload, {returning: true});
            const res = await request(app)
                .put(`/api/class-elder/0`)
                .set('Authorization', `Bearer ${token}`)
                .send({class_id: newClass1.id});
            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409.', async () => {
            Promise.all([
                Class.create(classPayload, {returning: true}),
                user.create(userPayload, {returning: true})
            ])
                .then(async results => {
                    const classElder1 = createClassElderPayload(results[0].id, results[1].id, true);
                    const newClassElder1 = await class_elder.create(classElder1, {returning: true});
                    const classElder2 = createClassElderPayload(results[0].id, results[1].id, true);
                    classElder2.school_year = new Date(2018, 11, 24);
                    const newClassElder2 = await class_elder.create(classElder2, {returning: true});
                    const res = await request(app)
                        .put(`/api/class-elder/${newClassElder2.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send({school_year: newClassElder1.school_year});
                    expect(res.status).to.equal(409);
                });
        });
    });
    describe('GET /:id', () => {
        it('Should return class elder object. Expected status is 200.', async () => {
            Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ])
                .then(async results => {
                    const classElderPayload = await createClassElderPayload(results[0].id, results[1].id, true);
                    const newClassElder = await class_elder.create(classElderPayload, {returning: true});
                    const res = await request(app)
                        .get(`/api/class-elder/${newClassElder.id}`)
                        .set('Authorization', `Bearer ${token}`);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', newClassElder.id);
                });
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
            Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ])
                .then(async results => {
                    const classElderPayload = await createClassElderPayload(results[0].id, results[1].id, true);
                    const newClassElder = await class_elder.create(classElderPayload, {returning: true});

                    const res = await request(app)
                        .delete(`/api/class-elder/${newClassElder.id}`)
                        .set('Authorization', `Bearer ${token}`);
                    expect(res.status).to.equal(200);
                });
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .delete('/api/class-elder/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});