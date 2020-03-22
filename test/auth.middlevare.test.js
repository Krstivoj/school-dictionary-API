const request = require('supertest');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

const app = require('../index');
const authMiddleware = require('../middlewares/auth.middleware');
const config = require('../config/config');

const validToken = jwt.sign({username: 'testUsername'}, config.secret, { expiresIn: '24h'});
const invalidToken = jwt.sign({username: 'testUsername'}, config.secret, { expiresIn: '1ms'});

describe('auth.middleware', () => {
   it('If all correct should call next middleware', async () => {
      const res = await request(app).get('/api',authMiddleware).set('Authorization',`Bearer ${validToken}`);
      expect(res.status).not.equal(401);
   });
   it('If token does not exists should return 401', async () => {
      await request(app).get('/api',authMiddleware).set('Authorization','').expect(401);
   });
   it('If token does not exists should return 401', async () => {
      await request(app).get('/api',authMiddleware).set('Authorization','Something').expect(401);
   });
   it('If token expired should return 401', async () => {
      await request(app).get('/api',authMiddleware).set('Authorization',`Bearer ${invalidToken}`).expect(401);
   });
});