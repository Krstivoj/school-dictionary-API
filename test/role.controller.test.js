const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {createToken, createRolePayload} = require('./utils/test.utils');

const token = createToken('usernameR', true);
const rolePayload = createRolePayload('role test case', 'Creating role', true);

describe('api/role', () => {
    beforeEach(async () => {
        const {role} = models;
        await role.destroy({where: {}});
    });
    describe('GET /', () => {
        it('Should return all roles. Expected status is 200', async () => {
            const res = await request(app)
                .get('/api/role')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('POST /', () => {
        it('Should create and return role object. Expected status is 200', async () => {
            const res = await request(app)
                .post('/api/role')
                .set('Authorization', `Bearer ${token}`)
                .send(rolePayload);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name',rolePayload.name);
            expect(res.body).to.have.property('description', rolePayload.description);
        });
        it('Should return conflict. Expected status 409', async () => {
            const {role} = models;
            await role.create(rolePayload);
            const res = await request(app)
                .post('/api/role')
                .set('Authorization', `Bearer ${token}`)
                .send(rolePayload);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
       it('Should update existing role. Expected status is 200', async () => {
           const {role} = models;
           const newRole = await role.create(rolePayload, {returning: true});
           const res = await request(app)
               .put(`/api/role/${newRole.id}`)
               .set('Authorization', `Bearer ${token}`)
               .send({
                   description: 'test updating'
               });
           expect(res.status).to.equal(200);
           expect(res.body).to.have.property('id', newRole.id);
           expect(res.body).to.have.property('description', 'test updating');
       });
       it('Should return not found resource. Expected status is 404', async () => {
            const res = await request(app)
                .put(`/api/role/0`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'test updating'
                });
            expect(res.status).to.equal(404);
        });
       it('Should return conflict. Expected status 409', async () => {
            const rolePayloads = [
                createRolePayload('role409-1', 'description', true),
                createRolePayload('role409-2', 'description', true)];
            const {role} = models;
            const role1 = await role.create(rolePayloads[0], {returning: true});
            await role.create(rolePayloads[1], {returning: true});
            const res = await request(app)
                .put(`/api/role/${role1.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: rolePayloads[1].name
                });
            expect(res.status).to.equal(409);
        });
    });
    describe('GET /:id', () => {
        it('Should return one object. Expected status is 200', async () => {
            const {role} = models;
            const newRole = await role.create(rolePayload, {returning: true});
            const res = await request(app)
                .get(`/api/role/${newRole.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id', newRole.id);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('description');
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const res = await request(app)
                .get(`/api/role/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', () => {
        it('Should return status 200.', async () => {
            const {role} = models;
            const newRole = await role.create(rolePayload, {returning: true});
            const res = await request(app)
                .delete(`/api/role/${newRole.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const res = await request(app)
                .delete(`/api/role/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});