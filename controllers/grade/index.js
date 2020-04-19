const router = require('express').Router();

const errorMiddleware = require('../../middlewares/error.middleware');
const reqValidationMiddleware = require('../../middlewares/request.validation.middleware');
const gradeController = require('./grade.controller');

router.post('/', reqValidationMiddleware, gradeController.create, errorMiddleware);
router.get('/', gradeController.findAll);
router.get('/:id', gradeController.findOne, errorMiddleware);
router.put('/:id', gradeController.update, errorMiddleware);
router.delete('/:id', gradeController.delete, errorMiddleware);

module.exports = router;