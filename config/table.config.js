
const table_name = (name) => {
    return {
        tableName: name,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    };
};

module.exports = table_name;