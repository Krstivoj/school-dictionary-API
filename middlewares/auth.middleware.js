const verifyToken = require('../services/auth.service');

const authMiddleware = (req, res, next) => {
    const verification = verifyToken(req);
    if (!verification.success) {
        res.status(401);
        res.send(verification);
    } else {
        next();
    }
};

module.exports = authMiddleware;