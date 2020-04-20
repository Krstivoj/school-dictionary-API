const Sequelize = require('sequelize');

const DEBIT_SCHEMA = {
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
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'subject',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    school_year: {
        type: Sequelize.DATE
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

module.exports = DEBIT_SCHEMA;