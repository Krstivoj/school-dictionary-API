const request = require('supertest');
const expect = require('chai').expect;

const db = require('../config');
const app = require('../index');
const {createToken, createUserPayload} = require('./utils/test.utils');

const token = createToken('usernameT', true);

describe('/api/user', () => {
    beforeEach(async () => {
        const {User} = db;
        await User.destroy({where: {}});
    });
    describe('GET /', () => {
       it('Should return all users. Expected status is 200', async () => {
           const users = [
               createUserPayload('GET1', true, true),
               createUserPayload('GET2', true, true)
           ];
           const {User} = db;
           await User.bulkCreate(users);
           const res = await request(app).get('/api/user').set('Authorization', `Bearer ${token}`);
           expect(res.status).to.equal(200);
           expect(res.body.length).to.equal(2);
       });
    });
    describe('GET /:id', () => {
        it('Should return one users. Expected status is 200', async () => {
            const user = createUserPayload('GETId1', true, true);
            const {User} = db;
            const createdUser = await User.create(user,{returning: true});
            const res = await request(app)
                .get(`/api/user/${createdUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should throw Not found exception. Expected status is 404', async () => {
            const res = await request(app)
                .get('/api/user/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should return one users. Expected status is 200', async () => {
            const user = createUserPayload('DELETEId1', true, true);
            const {User} = db;
            const createdUser = await User.create(user,{returning: true});
            const res = await request(app)
                .delete(`/api/user/${createdUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should throw Not found exception. Expected status is 404', async () => {
            const res = await request(app)
                .delete('/api/user/0')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('POST /', () => {
       it('Should create and return user if all valid. Expected status is 200', async () => {
           const user = createUserPayload('POST', true, true);
           const res = await request(app).post('/api/user').set('Authorization',`Bearer ${token}`).send(user);

           expect(res.status).to.equal(200);
           expect(res.body).to.have.property('id');
           expect(res.body).to.have.property('name',user.name);
           expect(res.body).to.have.property('username', user.username);
           expect(res.body).to.have.property('email', user.email);
           expect(res.body).to.have.property('active', user.active);
       });
       it('Should return bad request. Expected status is 400', async () => {
           const user = createUserPayload('POSTBadReq', true, false);
           const res = await request(app).post('/api/user').set('Authorization',`Bearer ${token}`).send(user);
           expect(res.status).to.equal(400);
       });
       it('Should return conflict. Expected status is 409', async () => {
           const user = createUserPayload('testPOST409', true, true);
           const {User} = db;
           await User.create(user);
           const token = createToken('testPOST409', true);
           const res = await request(app)
               .post('/api/user')
               .set('Authorization', `Bearer ${token}`)
               .send(user);
           expect(res.status).to.equal(409);


       });
   });
    describe('PUT /:id', () => {
       it('Should update the existing user. Expected status is 200', async () => {
           const user = createUserPayload('PUT', true, true);
           const {User} = db;
           const newUser = await User.create(user, {returning: true});
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
       it('Should throw error if user not found. Expected status is 404', async () => {
           const user = createUserPayload('PUTFail', true, true);
           const {User} = db;
           const newUser = await User.create(user, {returning: true});
           const res = await request(app)
               .put(`/api/user/${(2*newUser.id)}`)
               .set('Authorization',`Bearer ${token}`)
               .send({
                   name: 'newTest',
                   active: false
               });
           expect(res.status).to.equal(404);
       });
       it('Should return conflict. Expected status is 409', async () => {
           const users = [
               createUserPayload('testPUT4091', true, true),
               createUserPayload('testPUTT4092', true, true)];
           const {User} = db;
           const user1 = await User.create(users[0]);
           await User.create(users[1]);
           const token = createToken('testPUT409', true);
           const res = await request(app)
               .put(`/api/user/${user1.id}`)
               .set('Authorization', `Bearer ${token}`)
               .send({username: users[1].username});
           expect(res.status).to.equal(409);
        });
   });
});


