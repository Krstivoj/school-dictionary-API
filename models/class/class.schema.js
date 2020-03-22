const Sequelize = require('sequelize');

const CLASS_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
};

module.exports = CLASS_SCHEMA;