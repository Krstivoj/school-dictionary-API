const request = require('supertest');
const expect = require('chai').expect;

const {models} = require('../config');
const app = require('../index');
const {createToken, createClassElderPayload, createUserPayload, createClassPayload} = require('./utils/test.utils');

const token = createToken('className', true);

describe('/api/class-elder', () => {
    beforeEach(async () => {
       const {class_elder, user, class:Class} = models;
       await class_elder.destroy({where:{}});
       await user.destroy({where:{}});
       await Class.destroy({where:{}});
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
    describe('POST /', () => {
       it('Should create and return class elder object. Expected status is 200.', async () => {
           const {user, class: Class} = models;

           const userPayload = createUserPayload('CE', true, true);
           const classPayload = createClassPayload('C--E','class elder test', true);

           const elder = await user.create(userPayload, {returning: true});
           const eldersClass = await Class.create(classPayload, {returning: true});

           const classElderPayload = createClassElderPayload(eldersClass.id, elder.id, true);
           const res = await request(app)
               .post('/api/class-elder/')
               .set('Authorization', `Bearer ${token}`)
               .send(classElderPayload);
           expect(res.status).to.equal(200);
           expect(res.body).to.be.an('object');
       });
    });
});