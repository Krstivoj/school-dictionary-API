const db = require('../config/index');

const findAll = async () => {
    const {Subject} = db;
    return Subject.findAll();
};

const create = async (subject) => {
    const {Subject} = db;
    return Subject.create(subject, {returning: true});
};

const update = async (id, update) => {
    const {Subject} = db;
    await Subject.update(update, {where: {id}});
    const found = await Subject.findOne({where: {id}});
    if (!found) {
        throw {
            status: 404,
            message: 'Subject not found'
        }
    }
    return found;

};

const findById = async (id) => {
    const {Subject} = db;
    const found = await Subject.findOne({where:{id}});
    if(!found) {
        throw {
            status: 404,
            message: 'Subject not found'
        };
    }
    return found;
};

const destroy = async (id) => {
    const {Subject} = db;
    await Subject.update({deleted: true}, {where:{id}});
    const deleted = await Subject.findOne({where:{id, deleted: true}});
    if(!deleted) {
        throw {
            status: 404,
            message: 'Subject not found'
        };
    }
};

module.exports = {
    findAll,
    create,
    update,
    findById,
    destroy
};