const errorMiddleware = (err, req, res, next) => {
    const {status, message} = err ;
    res.status(status || 500);
    res.json({message: message || 'Something has gone wrong!'});
};

module.exports = errorMiddleware;