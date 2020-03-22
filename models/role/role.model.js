const roleSchema = require('./role.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    return sequelize.define('role', roleSchema, tableConfig('role'));
};