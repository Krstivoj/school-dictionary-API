const subjectTeacherSchema = require('./subject_teacher.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const subTea = sequelize.define('subject_has_teacher', subjectTeacherSchema, tableConfig('subject_has_teacher'));
    subTea.associate = (models) => {
        subTea.belongsTo(models.user,
            {
                foreignKey: 'user_id',
                targetKey: 'id',
                as: 'subject_teachers'
            });
        subTea.belongsTo(models.subject,
            {
                foreignKey: 'subject_id',
                targetKey: 'id',
                as: 'teacher_subjects'
            })
    };
    return subTea;
};