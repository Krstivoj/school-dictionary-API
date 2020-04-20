const {models} = require('../config/index');

const findAll = async () => {
    const {student} = models ;
    return student.findAll();
};

const create = async (studentPayload) => {
    const {student} = models;
    return student.create(studentPayload);
};

const update = async (id, studentPayload) => {
    const {student} = models;
    await student.update(studentPayload, {where: {id}});
    const updated = await student.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'student not found'
        }
    }
    return updated;
};

const findById = async (id) => {
    const {student} = models;
    const found = await student.findOne({where: {id}});
    if(!found){
        throw {
            status: 404,
            message: 'student not found'
        }
    } else {
        return found;
    }
};

const destroy = async (id) => {
    const {student} = models;
    await student.update({deleted: true},{where: {id}});
    const deleted = await student.findOne({where: {id, deleted: true}});
    if(!deleted){
        throw {
            status: 404,
            message: 'student not found'
        }
    }
};
module.exports = {
    create,
    findAll,
    update,
    findById,
    destroy
};