const Sequelize = require('sequelize');

const CLASS_SCHEMA = {
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
    }
};

module.exports = CLASS_SCHEMA;