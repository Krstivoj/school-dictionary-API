const joi = require('joi');

const creationSchema = joi.object().keys({
    name: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    active: joi.boolean().optional()
});

const updateSchema = joi.object().keys({
    name: joi.string().optional(),
    username: joi.string().optional(),
    password: joi.string().optional(),
    email: joi.string().email().optional(),
    active: joi.boolean().optional()
});

module.exports = {
    creationSchema,
    updateSchema
};
