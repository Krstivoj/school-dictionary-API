const router = require('express').Router();

const errorMiddleware = require('../../middlewares/error.middleware');
const debitController = require('./debit.controller');
const reqValidationMiddleware = require('../../middlewares/request.validation.middleware');

router.post('/', reqValidationMiddleware, debitController.create, errorMiddleware);
router.get('/', debitController.findAll);
router.get('/:id', debitController.findOne, errorMiddleware);
router.put('/:id', debitController.update, errorMiddleware);
router.delete('/:id', debitController.delete, errorMiddleware);

module.exports = router;