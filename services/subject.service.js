const {models} = require('../config/index');

const findAll = async () => {
    const {subject} = models;
    return subject.findAll();
};

const create = async (subjectPayload) => {
    const {subject} = models;
    return subject.create(subjectPayload, {returning: true});
};

const update = async (id, update) => {
    const {subject} = models;
    await subject.update(update, {where: {id}});
    const found = await subject.findOne({where: {id}});
    if (!found) {
        throw {
            status: 404,
            message: 'subject not found'
        }
    }
    return found;

};

const findById = async (id) => {
    const {subject} = models;
    const found = await subject.findOne({where:{id}});
    if(!found) {
        throw {
            status: 404,
            message: 'subject not found'
        };
    }
    return found;
};

const destroy = async (id) => {
    const {subject} = models;
    await subject.update({deleted: true}, {where:{id}});
    const deleted = await subject.findOne({where:{id, deleted: true}});
    if(!deleted) {
        throw {
            status: 404,
            message: 'subject not found'
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