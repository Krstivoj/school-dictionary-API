const Sequelize = require('sequelize');

const ROLE_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
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

module.exports = ROLE_SCHEMA;