const Sequelize = require('sequelize');

const ROLE_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
};

module.exports = ROLE_SCHEMA;