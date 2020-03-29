const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {createToken} = require('./utils/test.utils');

const token = createToken('className', true);

describe('/api/class-elder', () => {
    beforeEach(async () => {
       const {class_elder} = models;
       await class_elder.destroy({where:{}});
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
});