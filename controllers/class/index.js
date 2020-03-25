const router = require('express').Router();

const errorMiddleware = require('../../middlewares/error.middleware');
const classController = require('./class.controller');

router.post('/', classController.create, errorMiddleware);
router.get('/', classController.findAll);
router.get('/:id', classController.findOne, errorMiddleware);
router.put('/:id', classController.update, errorMiddleware);
router.delete('/:id', classController.delete, errorMiddleware);

module.exports = router;