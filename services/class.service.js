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
    await Class.update(update, {where: {id}});
    const updated = await Class.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'Class not found'
        }
    }
    return updated;
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
    const deleted = await Class.destroy({where: {id}});
    if (!deleted) {
        throw {
            status: 404,
            message: 'Class not found'
        }
    }
};

module.exports = {
    findAll,
    create,
    update,
    findById,
    destroy
};