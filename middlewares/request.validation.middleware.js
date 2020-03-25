const validateCreation = require('../services/request.validation.service');

const reqValidationMiddleware = (req, res, next) => {
    const {originalUrl} = req;
    const validation = validateCreation(originalUrl,req.body);
    if (!validation.success) {
        res.status(400);
        res.send(validation);
    } else {
        next();
    }
};

module.exports = reqValidationMiddleware;