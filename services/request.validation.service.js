const joi = require('joi');
const { creationSchema } = require('../models/user/user.validation.schema');

const validateCreation = (body) => {
    let validation = null;
    joi.validate(body, creationSchema, (err, value) => {
        if (err) {
            validation = {
              success: false,
              message: 'Body is not complete!'
            };
        } else {
            validation = {
                success: true
            };
        }
    });
    return validation;
};

module.exports = validateCreation;