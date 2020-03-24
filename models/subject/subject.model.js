const subjectSchema = require('./subject.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const subject = sequelize.define('subject', subjectSchema, tableConfig('subject'));
    subject.associate = (models) => {
        subject.hasMany(models.grade,
            {
                as: 'subject_grades'
            });
        subject.hasMany(models.class,
            {
               as: 'subject_class'
            });
        subject.belongsToMany(models.user,
            {
                through: models.subject_has_teacher,
                foreignKey: 'user_id'
            })
    };
    return subject;
};