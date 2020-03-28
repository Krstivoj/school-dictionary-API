const Sequelize = require('sequelize');

const SUBJECT_TEACHER_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = SUBJECT_TEACHER_SCHEMA;