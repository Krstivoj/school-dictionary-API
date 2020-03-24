const userRoleMapSchema = require('./user_role_map.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const userRoleMap =  sequelize.define('user_role_map', userRoleMapSchema, tableConfig('user_role_map'));
    userRoleMap.associate = (models) => {
        userRoleMap.belongsTo(models.user,
            {
                foreignKey: 'user_id',
                targetKey: 'id',
                as: 'users'
            });
        userRoleMap.belongsTo(models.role,
            {
                foreignKey: 'role_id',
                targetKey: 'id',
                as: 'roles'
            });
    };
    return userRoleMap;
};