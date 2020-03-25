const errorMiddleware = (err, req, res, next) => {
    try {
        let {status, message, name} = err;
        let statusCode = status;
        if (name === 'SequelizeUniqueConstraintError') {
            statusCode = 409;
        }
        res.status(statusCode || 500);
        res.json({message: message || 'Something has gone wrong!'});
    } catch (e) {
        next(e);
    }
};

module.exports = errorMiddleware;