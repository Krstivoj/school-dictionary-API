const express = require('express');
const router = express.Router();
const userRouter = require('../controllers/user');
const roleRouter = require('../controllers/role');

router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;