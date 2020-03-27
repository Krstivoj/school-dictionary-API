const db = require('../config/index');


const findAll = async () => {
    const {Subject} = db;
    return Subject.findAll();
};

module.exports = {
  findAll
};