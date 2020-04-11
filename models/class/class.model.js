const classSchema = require('./class.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const classM = sequelize.define('class', classSchema, tableConfig('class'));
    classM.associate = function(models){
        classM.belongsToMany(models.subject, {
            through: models.debit,
            foreignKey: 'class_id'
            });
        classM.belongsToMany(models.user, {
            through: models.debit,
            foreignKey: 'class_id'
            });
        classM.belongsToMany(models.subject,
            {
                through: models.subject_has_class,
                foreignKey: 'class_id'
            });
        classM.belongsToMany(models.user,{
            through: models.class_elder,
            foreignKey: 'class_id'
        });
    };
    return classM;
};