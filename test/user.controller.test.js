const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {createToken, createUserPayload} = require('./utils/test.utils');

const token = createToken('usernameT', true);
const userPayload = createUserPayload('userTest', true, true);

describe('/api/user', () => {
    beforeEach(async () => {
        const {user} = models;
        await user.destroy({where: {}});
    });
    describe('GET /', () => {
        it('Should return all users. Expected status is 200', async () => {
            const res = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('GET /:id', () => {
        it('Should return one users. Expected status is 200', async () => {
            const {user} = models;
            const createdUser = await user.create(userPayload,{returning: true});
            const res = await request(app)
                .get(`/api/user/${createdUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', createdUser.id);
            expect(res.body).to.have.property('name',createdUser.name);
            expect(res.body).to.have.property('username', createdUser.username);
            expect(res.body).to.have.property('email', createdUser.email);
            expect(res.body).to.have.property('active', createdUser.active);
        });
        it('Should return not found resource. Expected status is 404', async () => {
            const res = await request(app)
                .get('/api/user/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should return one users. Expected status is 200', async () => {
            const {user} = models;
            const createdUser = await user.create(userPayload,{returning: true});
            const res = await request(app)
                .delete(`/api/user/${createdUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return not found resource. Expected status is 404', async () => {
            const res = await request(app)
                .delete('/api/user/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('POST /', () => {
        it('Should create and return user if all valid. Expected status is 200', async () => {
            const res = await request(app)
                .post('/api/user')
                .set('Authorization',`Bearer ${token}`)
                .send(userPayload);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name',userPayload.name);
            expect(res.body).to.have.property('username', userPayload.username);
            expect(res.body).to.have.property('email', userPayload.email);
            expect(res.body).to.have.property('active', userPayload.active);
        });
        it('Should return bad request. Expected status is 400', async () => {
            const userPayload = createUserPayload('POSTBadReq', true, false);
            const res = await request(app)
                .post('/api/user')
                .set('Authorization',`Bearer ${token}`)
                .send(userPayload);
            expect(res.status).to.equal(400);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const {user} = models;
            await user.create(userPayload);
            const res = await request(app)
                .post('/api/user')
                .set('Authorization', `Bearer ${token}`)
                .send(userPayload);
            expect(res.status).to.equal(409);


        });
    });
    describe('PUT /:id', () => {
        it('Should update the existing user. Expected status is 200', async () => {
            const {user} = models;
            const newUser = await user.create(userPayload, {returning: true});
            const res = await request(app)
                .put(`/api/user/${newUser.id}`)
                .set('Authorization',`Bearer ${token}`)
                .send({
                    name: 'newTest',
                    active: false
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('name', 'newTest');
            expect(res.body).to.have.property('active', false);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const res = await request(app)
                .put(`/api/user/0`)
                .set('Authorization',`Bearer ${token}`)
                .send({
                    name: 'newTest',
                    active: false
                });
            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409', async () => {
            const userPayloads = [
                createUserPayload('testPUT4091', true, true),
                createUserPayload('testPUTT4092', true, true)];
            const {user} = models;
            Promise.all([
                user.create(userPayloads[0], {returning: true}),
                user.create(userPayloads[1])
            ])
                .then(async results => {
                    const res = await request(app)
                        .put(`/api/user/${results[0].id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send({username: userPayloads[1].username});
                    expect(res.status).to.equal(409);
                });
        });
    });
});


