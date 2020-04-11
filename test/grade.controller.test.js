// const request = require('supertest');
// const expect = require('chai').expect;
//
// const {models} = require('../config');
// const app = require('../index');
// const {createToken, createGradePayload} = require('./utils/test.utils');
//
// const token = createToken('className', true);
//
// describe('/api/grade', () => {
//     beforeEach(async () => {
//         const {grade} = models;
//         await grade.destroy({where: {}});
//     });
//     describe('GET /', () => {
//         it('Should return all grades. Expected status is 200.', async () => {
//             const res = await request(app)
//                 .get('/api/grade')
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).to.equal(200);
//             expect(res.body).to.be.an('array');
//         })
//     });
//     describe('POST /', () => {
//         it('Should create and return grade object. Expected status is 200.', async () => {
//             const gradePayload = createGradePayload(1,1,new Date(), 4);
//             const res = await request(app)
//                 .post('/api/grade/')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send(gradePayload);
//             expect(res.status).to.equal(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.property('student_id');
//             expect(res.body).to.have.property('subject_id');
//             expect(res.body).to.have.property('date');
//             expect(res.body).to.have.property('value');
//         });
//     });
// });