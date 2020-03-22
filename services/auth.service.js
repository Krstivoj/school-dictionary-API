const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let returnValue;
    if (!token){
        returnValue = {
            success: false,
            message: 'Auth token is not supplied'
        };
    } else {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    returnValue = {
                        success: false,
                        message: 'Token is not valid'
                    };
                } else {
                    req.decoded = decoded;
                    returnValue = {
                        success: true,
                        message: 'Token is valid'
                    }
                }
            });
        } else {
            return {
                success: false,
                message: 'Auth token is not supplied'
            };
        }
    }
    return returnValue;
};

module.exports = verifyToken;