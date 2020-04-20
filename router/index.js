const express = require('express');
const router = express.Router();

const userRouter = require('../controllers/user');
const roleRouter = require('../controllers/role');
const classRouter = require('../controllers/class');
const subjectRouter = require('../controllers/subject');
const classElderRouter = require('../controllers/class_elder');
const gradeRouter = require('../controllers/grade');
const debitRouter = require('../controllers/debit');
const studentRouter = require('../controllers/student');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/class', classRouter);
router.use('/subject', subjectRouter);
router.use('/class-elder', classElderRouter);
router.use('/grade', gradeRouter);
router.use('/debit', debitRouter);
router.use('/student', studentRouter);

module.exports = router;