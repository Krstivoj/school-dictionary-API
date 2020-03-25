const db = require('../config/index');

const findAll = async () => {
    const {Class} = db ;
    return Class.findAll();
};

const create = async (classObject) => {
    const {Class} = db;
    return Class.create(classObject, {returning: true});
};

const update = async (id, update) => {
    const {Class} = db;
    const rowsNumber = await Class.update(update, {where: {id}});
    if (!rowsNumber[0]) {
        throw {
            status: 404,
            message: 'Class not found'
        }
    } else {
        return Class.findOne({where: {id}});
    }
};

const findById = async (id) => {
    const {Class} = db;
    const foundClass = await Class.findOne({where: {id}});
    if (!foundClass) {
        throw {
            status: 404,
            message: 'Class not found'
        }
    } else {
        return foundClass;
    }
};

const destroy = async (id) => {
    const {Class} = db;
    const deletedRows = await Class.destroy({where: {id}});
    if (!deletedRows) {
        throw {
            status: 404,
            message: 'Class not found'
        }
    } else {
        return deletedRows;
    }
};

module.exports = {
    findAll,
    create,
    update,
    findById,
    destroy
};