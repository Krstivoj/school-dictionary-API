const subjectClassSchema = require('./subject_class.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    return sequelize.define('subject_has_class', subjectClassSchema, tableConfig('subject_has_class'));
};