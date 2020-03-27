const joi = require('joi');

const validateCreation = (route, body) => {
    const parts = route.split('/');
    const module = parts[2];
    const { creationSchema } = require(`../models/${module}/${module}.validation.schema`);
    let validation = null;
    joi.validate(body, creationSchema, (err, value) => {
        if (err) {
            validation = {
              success: false,
              message: 'Request body is not complete!'
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