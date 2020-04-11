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
        references: {
            model: 'class',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    school_year: {
        type: Sequelize.DATE,
        allowNull: false
    }
};

module.exports = CLASS_ELDER_SCHEMA;