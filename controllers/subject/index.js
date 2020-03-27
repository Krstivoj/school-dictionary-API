const router = require('express').Router();

const subjectController = require('./subject.controller');
const errorMiddleware = require('../../middlewares/error.middleware');

router.post('/', subjectController.create, errorMiddleware);
router.get('/', subjectController.findAll);
router.get('/:id', subjectController.findOne, errorMiddleware);
router.put('/:id', subjectController.update, errorMiddleware);
router.delete('/:id', subjectController.delete, errorMiddleware);

module.exports = router;