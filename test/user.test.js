const request = require('supertest');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const db = require('../config');
const config = require('../config/config');
const app = require('../index');

const token = jwt.sign({username: 'testUsername'}, config.secret, { expiresIn: '24h'});
const userPayload = (name, active, valid) => {
    return {
        name: `test${name}`,
        username: valid ? `test${name}` : '',
        password: `pass${name}`,
        email: `test${name}@mail.com`,
        active
    }
};
describe('/api/user', () => {
    beforeEach(async () => {
        const {User} = db;
        await User.destroy({where: {}});
    });
    describe('GET /', () => {
       it('Should return all users. Expected status is 200', async () => {
           const users = [
               userPayload('GET1', true, true),
               userPayload('GET2', true, true)
           ];
           const {User} = db;
           await User.bulkCreate(users);
           const res = await request(app).get('/api/user').set('Authorization', `Bearer ${token}`);
           expect(res.status).to.equal(200);
           expect(res.body.length).to.equal(2);
       });
        it('Should return unauthorized access. Expected status is 401', async () => {
            const users = [
                userPayload('GETTokenInvalid1', true, true),
                userPayload('GETTokenInvalid2', true, true)
            ];
            const {User} = db;
            await User.bulkCreate(users);
            const res = await request(app).get('/api/user');
            expect(res.status).to.equal(401);
        });
    });
    describe('GET /:id', () => {
        it('Should return one users. Expected status is 200', async () => {
            const user = userPayload('GETId1', true, true);
            const {User} = db;
            const createdUser = await User.create(user,{returning: true});
            const res = await request(app)
                .get(`/api/user/${createdUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            // expect(res.body.length).to.equal(1);
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
            const user = userPayload('DELETEId1', true, true);
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
           const user = userPayload('POST', true, true);
           const res = await request(app).post('/api/user').set('Authorization',`Bearer ${token}`).send(user);

           expect(res.status).to.equal(200);
           expect(res.body).to.have.property('id');
           expect(res.body).to.have.property('name',user.name);
           expect(res.body).to.have.property('username', user.username);
           expect(res.body).to.have.property('email', user.email);
           expect(res.body).to.have.property('active', user.active);
       });

       it('Should return unauthorized access (missing token). Expected status is 401.', async () => {
           const user = userPayload('POSTJWTInvalid', true, true);
           const res = await request(app).post('/api/user').send(user);
           expect(res.status).to.equal(401);
       });

        it('Should return bad request. Expected status is 400', async () => {
            const user = userPayload('POSTBadReq', true, false);
            const res = await request(app).post('/api/user').set('Authorization',`Bearer ${token}`).send(user);
            expect(res.status).to.equal(400);
        });
   });
    describe('PUT /:id', () => {
       it('Should update the existing user. Expected status is 200', async () => {
           const user = userPayload('PUT', true, true);
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
           const user = userPayload('PUTFail', true, true);
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
       it('Should return unauthorized access (invalid token). Expected status is 401.', async () => {
           const user = userPayload('PUTJWTInvalid', true, true);
           const {User} = db;
           const newUser = await User.create(user, {returning: true});
           const res = await request(app)
               .put(`/api/user/${newUser.id}`)
               .send({
                   name: 'newTest',
                   active: false
               });
           expect(res.status).to.equal(401);
       });
   });
});


