const tableConfig = require('../../config/table.config');
const gradeSchema = require('./grade.schema');

module.exports = (sequelize) => {
    const grade =  sequelize.define('grade', gradeSchema, tableConfig('grade'));
    grade.associate = (models) => {
        grade.belongsTo(models.student,
            {
                foreignKey: 'student_id',
                targetKey: 'id',
                as: 'student_subjects'
            });
        grade.belongsTo(models.subject,
            {
                foreignKey: 'subject_id',
                targetKey: 'id',
                as: 'students_on_subject'
            });
    };
    return grade;
};