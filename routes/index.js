const express = require('express');
const router = express.Router();

const userRouter = require('../controllers/user');
const roleRouter = require('../controllers/role');
const classRouter = require('../controllers/class');
const subjectRouter = require('../controllers/subject');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/class', classRouter);
router.use('/subject', subjectRouter);

module.exports = router;