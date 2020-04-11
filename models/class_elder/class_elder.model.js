const tableConfig = require('../../config/table.config');
const classElderSchema = require('./clas_elder.schema');

module.exports = (sequelize) => {
    const classElder =  sequelize.define(
        'class_elder',
        classElderSchema,
        {...tableConfig('class_elder'),
            uniqueKeys: {
                actions_unique: {
                    fields: ['user_id', 'class_id', 'school_year']
                }
            }});
    classElder.associate = (models) => {
        classElder.belongsTo(models.user,
            {
                foreignKey: 'user_id',
                targetKey: 'id'
        });
        classElder.belongsTo(models.class,
            {
                foreignKey: 'class_id',
                targetKey: 'id'
            })
    };
    return classElder;
};