const router = require('express').Router();

const errorMiddleware = require('../../middlewares/error.middleware');
const classElderController = require('./class_elder.controller');
const reqValidationMiddleware = require('../../middlewares/request.validation.middleware');

router.post('/', reqValidationMiddleware, classElderController.create, errorMiddleware);
router.get('/', classElderController.findAll);
router.get('/:id', classElderController.findOne, errorMiddleware);
router.put('/:id', classElderController.update, errorMiddleware);
router.delete('/:id', classElderController.delete, errorMiddleware);

module.exports = router;