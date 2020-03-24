const router = require('express').Router();

const roleController = require('./role.controller');
const errorMiddleware = require('../../middlewares/error.middleware');

router.post('/', roleController.create, errorMiddleware);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findOne, errorMiddleware);
router.put('/:id', roleController.update, errorMiddleware);
router.delete('/:id', roleController.delete, errorMiddleware);

module.exports = router;