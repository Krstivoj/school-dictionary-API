const Sequelize = require('sequelize');

const SUBJECT_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = SUBJECT_SCHEMA;