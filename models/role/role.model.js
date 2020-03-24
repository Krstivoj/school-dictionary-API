const roleSchema = require('./role.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const role =  sequelize.define('role', roleSchema, tableConfig('role'));
    role.associate = (models) => {
        role.belongsToMany(models.user,
            {
                as: 'roles',
                through: models.user_role_map,
                foreignKey: 'role_id'
            });
    };
    return role;
};