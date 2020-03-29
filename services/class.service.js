const {models} = require('../config/index');

const findAll = async () => {
    const Class = models.class;
    return Class.findAll();
};

const create = async (classPayload) => {
    const Class = models.class;
    return Class.create(classPayload, {returning: true});
};

const update = async (id, classPayload) => {
    const Class = models.class;
    await Class.update(classPayload, {where: {id}});
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
    const Class = models.class;
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
    const Class = models.class;
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