const router = require('express').Router();

const errorMiddleware = require('../../middlewares/error.middleware');
const reqValidationMiddleware = require('../../middlewares/request.validation.middleware');
const studentController = require('./student.controller');

router.post('/', reqValidationMiddleware, studentController.create, errorMiddleware);
router.get('/', studentController.findAll);
router.get('/:id', studentController.findOne, errorMiddleware);
router.put('/:id', studentController.update, errorMiddleware);
router.delete('/:id', studentController.delete, errorMiddleware);

module.exports = router;