const Sequelize = require('sequelize');

const STUDENT_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

module.exports = STUDENT_SCHEMA;