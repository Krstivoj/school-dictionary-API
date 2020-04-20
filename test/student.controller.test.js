const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {
    createToken,
    createUserPayload,
    createClassPayload,
    createStudentPayload
} = require('./utils/test.utils');

const token = createToken('className', true);
const {user, class: Class, student} = models;

const userPayload = createUserPayload('CE', true, true);
const classPayload = createClassPayload('C--E','student test', true);

describe('/api/student', () => {
    beforeEach(async () => {
        await user.destroy({where:{}});
        await Class.destroy({where:{}});
    });
    describe('GET /', () => {
        it('Should return all students. Expected status is 200.', async () => {
            const res = await request(app)
                .get('/api/student/')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    describe('POST /', async () => {
        it('Should create and return student. Expected status is 200.', async () => {
            const results = await Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ]);
            const studentPayload = createStudentPayload(results[0].id, results[1].id);
            const res = await request(app)
                .post('/api/student/')
                .set('Authorization', `Bearer ${token}`)
                .send(studentPayload);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should create and return bad request. Expected status is 400.', async () => {
            const res = await request(app)
                .post('/api/student/')
                .set('Authorization', `Bearer ${token}`)
                .send({class_id: 1});
            expect(res.status).to.equal(400);
        });
        it('Should return conflict. Expected status is 409.', async () => {
        });
    });
    describe('PUT /:id', async () => {
        it('Should update and return student. Expected status is 200.', async () => {
            const results = await Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ]);
            const studentPayload = createStudentPayload(results[0].id, results[1].id);
            const newStudent = await student.create(studentPayload, {returning: true});
            const res = await request(app)
                .put(`/api/student/${newStudent.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({school_year: new Date(2018, 11, 24)});
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .put('/api/student/0')
                .set('Authorization', `Bearer ${token}`)
                .send({class_id: 2});
            expect(res.status).to.equal(404);
        });
        it('Should return conflict. Expected status is 409.', async () => {

        });
    });
    describe('GET /:id', async () => {
        it('Should return one student object. Expected status is 200.', async () => {
            const results = await Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ]);
            const studentPayload = createStudentPayload(results[0].id, results[1].id);
            const newStudent = await student.create(studentPayload, {returning: true});
            const res = await request(app)
                .get(`/api/student/${newStudent.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .get(`/api/student/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
    describe('DELETE /:id', async () => {
        it('Should destroy student object. Expected status is 200.', async () => {
            const results = await Promise.all([
                user.create(userPayload, {returning: true}),
                Class.create(classPayload, {returning: true})
            ]);
            const studentPayload = createStudentPayload(results[0].id, results[1].id);
            const newStudent = await student.create(studentPayload, {returning: true});
            const res = await request(app)
                .delete(`/api/student/${newStudent.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
        });
        it('Should return resource not found. Expected status is 404.', async () => {
            const res = await request(app)
                .delete(`/api/student/0`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
        });
    });
});