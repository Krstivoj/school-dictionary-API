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
    const modules = fs.readdirSync(constantPath);
    modules.forEach(function (module) {
        require(`.${constantPath}/${module}/${module}.model`)(sequelize);
    });
    const {models} = sequelize;
    Object.keys(models).forEach((modelName) => {
        if ('associate' in models[modelName]) {
            models[modelName].associate(models);
        }
    });

};

initModels();
// sequelize.sync({
//     force: true
// });
module.exports = sequelize;