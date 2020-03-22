const userSchema = require('./user.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    return sequelize.define('user', userSchema, tableConfig('user'));
};