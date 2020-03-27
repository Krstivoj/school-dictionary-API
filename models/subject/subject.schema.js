const Sequelize = require('sequelize');

const SUBJECT_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
};

module.exports = SUBJECT_SCHEMA;