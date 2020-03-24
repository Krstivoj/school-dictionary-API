const request = require('supertest');
const expect = require('chai').expect;

const db = require('../config');
const app = require('../index');
const {createToken, createRolePayload} = require('./utils/test.utils');

const token = createToken('usernameR', true);

describe('api/role', () => {
    beforeEach(async () => {
        const {Role} = db;
        await Role.destroy({where: {}});
    });
    describe('GET /', () => {
        it('Should return all roles. Expected status is 200', async () => {
            const roles = [
                createRolePayload('role1', 'description'),
                createRolePayload('role2', 'description')];
            const {Role} = db;
            await Role.bulkCreate(roles);
            const res = await request(app)
                .get('/api/role')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        });
        it('Should return unauthorized access. Expected status is 401', async () => {
            const res = await request(app)
                .get('/api/role');
            expect(res.status).to.equal(401);
        });
    });
    describe('POST /', () => {
        it('Should create and return role object. Expected status is 200', async () => {
            const role = createRolePayload('rolePOST', 'Creating role');
            const res = await request(app)
                .post('/api/role')
                .set('Authorization', `Bearer ${token}`)
                .send(role);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name',role.name);
            expect(res.body).to.have.property('description', role.description);
        });
        it('Should return unauthorized access. Expected status is 401', async () => {
            const role = createRolePayload('rolePOST', 'Creating role');
            const res = await request(app)
                .post('/api/role')
                .send(role);
            expect(res.status).to.equal(401);
        });
        it('Should return conflict. Expected status 409', async () => {
            const roles = [
                createRolePayload('rolePOST409', 'description'),
                createRolePayload('rolePOST409', 'description1')];
            const {Role} = db;
            await Role.create(roles[0]);
            const res = await request(app)
                .post('/api/role')
                .set('Authorization', `Bearer ${token}`)
                .send(roles[1]);
            expect(res.status).to.equal(409);
        });
    });
    describe('PUT /:id', () => {
       it('Should update existing role. Expected status is 200', async () => {
           const role = createRolePayload('roleForUpdate', 'update role');
           const {Role} = db;
           const newRole = await Role.create(role, {returning: true});
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
       it('Should return unauthorized access. Expected status is 401', async () => {
           const role = createRolePayload('roleUpdate401', 'update role 401');
           const {Role} = db;
           const newRole = await Role.create(role, {returning: true});
           const res = await request(app)
               .put(`/api/role/${newRole.id}`)
               .send({
                   description: 'test updating'
               });
           expect(res.status).to.equal(401);
       });
       it('Should return not found resource. Expected status is 404', async () => {
            const res = await request(app)
                .put(`/api/role/`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'test updating'
                });
            expect(res.status).to.equal(404);
        });
       it('Should return conflict. Expected status 409', async () => {
            const roles = [
                createRolePayload('role409-1', 'description'),
                createRolePayload('role409-2', 'description')];
            const {Role} = db;
            const role1 = await Role.create(roles[0], {returning: true});
            await Role.create(roles[1], {returning: true});
            const res = await request(app)
                .put(`/api/role/${role1.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: roles[1].name
                });
            expect(res.status).to.equal(409);
        });
    });
    describe('GET /:id', () => {
        it('Should return one object. Expected status is 200', async () => {
            const role = createRolePayload('roleGETbyID', 'description');
            const {Role} = db;
            const newRole = await Role.create(role, {returning: true});
            const res = await request(app)
                .get(`/api/role/${newRole.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', newRole.id);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('description');
        });
        it('Should return unauthorised access. Expected code is 401', async () => {
            const role = createRolePayload('roleGETbyID2', 'description');
            const {Role} = db;
            const newRole = await Role.create(role, {returning: true});
            const res = await request(app)
                .get(`/api/role/${newRole.id}`);
            expect(res.status).to.equal(401);
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
            const role = createRolePayload('roleDelete', 'description');
            const {Role} = db;
            const newRole = await Role.create(role, {returning: true});
            const res = await request(app)
                .delete(`/api/role/${newRole.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return unauthorised access. Expected status is 401', async () => {
            const role = createRolePayload('roleDelete1', 'description');
            const {Role} = db;
            const newRole = await Role.create(role, {returning: true});
            const res = await request(app)
                .delete(`/api/role/${newRole.id}`);
            expect(res.status).to.equal(401);
        });
        it('Should return resource not found. Expected status is 404', async () => {
            const res = await request(app)
                .delete(`/api/role/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});