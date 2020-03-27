const request = require('supertest');
const expect = require('chai').expect;

const db = require('../config');
const app = require('../index');


const {createToken} = require('./utils/test.utils');

const token = createToken('usernameR', true);

describe('/api/subject', () => {
    beforeEach(async () => {
        const {Subject} = db;
        await Subject.destroy({where: {}});
    });
    describe('GET /', () => {
        it('Should return all subjects. Expected status is 200.', async () => {
            const res = await request(app)
                .get('/api/subject')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
});
