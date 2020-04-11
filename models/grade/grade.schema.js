const Sequelize = require('sequelize');

const GRADE_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'subject',
            key: 'id'
        }
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'student',
            key: 'id'
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
};

module.exports = GRADE_SCHEMA;