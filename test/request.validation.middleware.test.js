const request = require('supertest');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

const app = require('../index');
const config = require('../config/config');
const db = require('../config');

const userPayload = (name, active, valid) => {
    return {
        name: `test${name}`,
        username: valid ? `test${name}` : '',
        password: `pass${name}`,
        email: `test${name}@mail.com`,
        active
    }
};
const token = jwt.sign({username: 'testUsername'}, config.secret, { expiresIn: '24h'});

describe('req.validation.middleware', () => {
    beforeEach(async () => {
        const {User} = db;
        await User.destroy({where: {}});
    });
    describe('validation', () => {
        it('Should return bad request. Expected status is 400.', async () => {
            const user = userPayload('testBadReq', true, false);
            const res = await request(app)
                .post('/api/user')
                .set('Authorization', `Bearer ${token}`)
                .send(user);
            expect(res.status).to.equal(400);
        });
        it('Should pass to next. Expected status is 200.', async () => {
            const user = userPayload('testOK', true, true);
            const res = await request(app)
                .post('/api/user')
                .set('Authorization', `Bearer ${token}`)
                .send(user);
            expect(res.status).to.equal(200);
        })
    });
});