const joi = require('joi');

const creationSchema = joi.object().keys({
    student_id: joi
        .number()
        .integer()
        .min(1)
        .required(),
    subject_id: joi
        .number()
        .integer()
        .min(1)
        .required(),
    date: joi
        .date()
        .required(),
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
});

module.exports = {
    creationSchema
};