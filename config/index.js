const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('mydb', 'student', 'student123T#', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const initModels = () => {
    const constantPath = './models';
    const models = {};
    fs.readdir(constantPath, function(err, modules) {
        modules
            .forEach(function (module) {
                const modelName = module.charAt(0).toUpperCase() + module.slice(1);
                models[modelName] = require(`.${constantPath}/${module}/${module}.model`)(sequelize);
            });
    });
    return models;
};

const db = initModels();
db['sequelize'] = sequelize;
module.exports = db;