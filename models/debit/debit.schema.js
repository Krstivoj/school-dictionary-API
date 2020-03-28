const Sequelize = require('sequelize');

const DEBIT_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = DEBIT_SCHEMA;