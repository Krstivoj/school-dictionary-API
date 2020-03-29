const express = require('express');
const router = express.Router();

const userRouter = require('../controllers/user');
const roleRouter = require('../controllers/role');
const classRouter = require('../controllers/class');
const subjectRouter = require('../controllers/subject');
const classElderRouter = require('../controllers/class_elder');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/class', classRouter);
router.use('/subject', subjectRouter);

router.use('/class-elder', classElderRouter);

module.exports = router;