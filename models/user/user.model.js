const userSchema = require('./user.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const user = sequelize.define('user', userSchema, tableConfig('user'));
    user.associate = (models) => {
      user.belongsToMany(models.role,
          {
              as: 'users',
              through: models.user_role_map,
              foreignKey: 'user_id'
          });
      user.belongsToMany(models.class,
          {
              as: 'elders',
              through: models.class_elder,
              foreignKey: 'user_id'
          });
      user.belongsToMany(models.subject,
          {
              through: models.debit,
              foreignKey: 'user_id'
            });
      user.belongsToMany(models.class,
          {
              through: models.debit,
              foreignKey: 'user_id'
            });
      user.belongsToMany(models.class,
          {
              through: models.student,
              foreignKey: 'user_id'
          });
      user.belongsToMany(models.subject,
          {
              through: models.subject_has_teacher,
              foreignKey: 'user_id'
          });
    };
    return user;
};