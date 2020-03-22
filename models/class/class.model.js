const classSchema = require('./class.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    return sequelize.define('class', classSchema, tableConfig('class'));
};