const errorMiddleware = (err, req, res, next) => {
    let {status, message, name} = err ;
    let statusCode = status ;
    if (name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
    }
    res.status(statusCode || 500);
    res.json({message: message || 'Something has gone wrong!'});
};

module.exports = errorMiddleware;