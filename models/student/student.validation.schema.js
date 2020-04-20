const joi = require('joi');

const creationSchema = joi.object().keys({
    user_id: joi
        .number()
        .integer()
        .min(1)
        .required(),
    class_id: joi
        .number()
        .integer()
        .min(1)
        .required(),
    school_year: joi
        .date()
        .required()
});

module.exports = {
    creationSchema
};