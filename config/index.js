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
    fs.readdir(constantPath, function(err, modules) {
        modules
            .forEach(function (module) {
                require(`.${constantPath}/${module}/${module}.model`)(sequelize);
            });
    });
};

initModels();
// sequelize.sync({
//     force: true
// });
module.exports = sequelize;