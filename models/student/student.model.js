const studentSchema = require('./student.schema');
const tableConfig = require('../../config/table.config');

module.exports = (sequelize) => {
    const student =  sequelize.define('student', studentSchema, tableConfig('student'));
    student.associate = (models) =>  {
      student.belongsTo(models.user,
          {
              foreignKey: 'user_id',
              targetKey: 'id',
              as: 'students'
          });
      student.belongsTo(models.class,
          {
              foreignKey: 'class_id',
              targetKey: 'id',
              as: 'student_class'
          });
      student.hasMany(models.grade,
          {
              as: 'student_grades'
          })
    };
    return student;
};