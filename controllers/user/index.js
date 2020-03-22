const router = require('express').Router();

const userController = require('./user.controller');
const errorMiddleware = require('../../middlewares/error.middleware');
const reqValidationMiddleware = require('../../middlewares/request.validation.middleware');

router.post('/', reqValidationMiddleware, userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne, errorMiddleware);
router.put('/:id', userController.update, errorMiddleware);
router.delete('/:id', userController.delete, errorMiddleware);

module.exports = router;