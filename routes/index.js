const express = require('express');
const router = express.Router();

const userRouter = require('../controllers/user');
const roleRouter = require('../controllers/role');
const classRouter = require('../controllers/class');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/class', classRouter);

module.exports = router;