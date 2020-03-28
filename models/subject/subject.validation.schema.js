const joi = require('joi');

const creationSchema = joi.object().keys({
    key: joi.string().required(),
    description: joi.string().optional()
});

const updateSchema = joi.object().keys({
    key: joi.string().optional(),
    description: joi.string().optional()
});

module.exports = {
    creationSchema,
    updateSchema
};
