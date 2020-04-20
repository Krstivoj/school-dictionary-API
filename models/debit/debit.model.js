const tableConfig = require('../../config/table.config');
const debitSchema = require('./debit.schema');

module.exports = (sequelize) => {
    const debit = sequelize.define('debit', debitSchema, tableConfig('debit'));
    debit.associate = (models) => {
      debit.belongsTo(models.subject,
          {
              foreignKey: 'subject_id',
              targetKey: 'id'
          });
      debit.belongsTo(models.user,
          {
              foreignKey: 'user_id',
              targetKey: 'id'
          });
      debit.belongsTo(models.class,
          {
              foreignKey: 'class_id',
              targetKey: 'id'
          });
    };
    return debit;
};