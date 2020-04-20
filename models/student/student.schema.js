const Sequelize = require('sequelize');

const STUDENT_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'class',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    school_year: {
        type: Sequelize.DATE,
        allowNull: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = STUDENT_SCHEMA;