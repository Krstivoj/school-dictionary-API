const Sequelize = require('sequelize');

const CLASS_ELDER_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'class',
        //     key: 'id'
        // }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'user',
        //     key: 'id'
        // }
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = CLASS_ELDER_SCHEMA;