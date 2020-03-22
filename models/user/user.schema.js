const Sequelize = require('sequelize');

const USER_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [6, 20]
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    active: {
        type: Sequelize.BOOLEAN
    }
};

module.exports = USER_SCHEMA;