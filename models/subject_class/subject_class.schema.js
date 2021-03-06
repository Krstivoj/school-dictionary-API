const Sequelize = require('sequelize');

const SUBJECT_CLASS = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
};

module.exports = SUBJECT_CLASS;