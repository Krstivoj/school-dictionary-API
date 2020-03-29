const userSchema = require('./user.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const user = sequelize.define('user', userSchema, tableConfig('user'));
    user.associate = (models) => {
      user.belongsToMany(models.role,
          {
              as: 'users',
              through: 'user_role_map',
              foreignKey: 'user_id'
          });
      user.belongsToMany(models.class,
          {
              // as: 'elders',
              through: 'class_elder',
              // foreignKey: 'user_id'
          });
      user.belongsToMany(models.subject,
          {
              through: 'debit',
              foreignKey: 'user_id'
            });
      user.belongsToMany(models.class,
          {
              through: 'debit',
              foreignKey: 'user_id'
            });
      user.belongsToMany(models.class,
          {
              through: 'student',
              foreignKey: 'user_id'
          });
      user.belongsToMany(models.subject,
          {
              through: 'subject_has_teacher',
              foreignKey: 'user_id'
          });
    };
    return user;
};