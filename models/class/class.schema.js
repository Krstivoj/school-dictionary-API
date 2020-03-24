const Sequelize = require('sequelize');

const CLASS_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING
    }
};

module.exports = CLASS_SCHEMA;