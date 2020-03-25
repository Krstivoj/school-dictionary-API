const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const createToken = (username, valid) => {
    return jwt.sign(
        {
            username
        },
        config.secret,
        {
            expiresIn: valid ? '24h': '1ms'
        });
}

const createUserPayload = (name, active, valid) => {
    return {
        name: `test${name}`,
        username: valid ? `test${name}` : '',
        password: `pass${name}`,
        email: `test${name}@mail.com`,
        active
    }
};

const createRolePayload = (name, description) => {
    return {
        name: `role${name}`,
        description
    };
};

const createClassPayload = (key, description) => {
    return {
        key: `class${key}`,
        description
    };
};

module.exports = {
    createToken,
    createUserPayload,
    createRolePayload,
    createClassPayload
};