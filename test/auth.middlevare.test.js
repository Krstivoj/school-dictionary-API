const request = require('supertest');
const expect = require('chai').expect;

const app = require('../index');
const authMiddleware = require('../middlewares/auth.middleware');
const {createToken} = require('./utils/test.utils');

const validToken = createToken('testUser', true);
const invalidToken = createToken('testUser', false);

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