const subjectSchema = require('./subject.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    return sequelize.define('subject', subjectSchema, tableConfig('subject'));
};