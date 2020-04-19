const {models} = require('../config/index');

const findAll = async () => {
    const {grade} = models;
    return grade.findAll();
};

const create = async (gradePayload) => {
        const {grade} = models;
    return grade.create(gradePayload, {returning: true});
};

const update = async (id, gradePayload) => {
        const {grade} = models;
    await grade.update(gradePayload, {where: {id}});
    const updated = await grade.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'grade not found'
        }
    }
    return updated;
};

const findById = async (id) => {
        const {grade} = models;
    const foundGrade = await grade.findOne({where: {id}});
    if (!foundGrade) {
        throw {
            status: 404,
            message: 'grade not found'
        }
    } else {
        return foundGrade;
    }
};

const destroy = async (id) => {
    const {grade} = models;
    const deleted = await grade.destroy({where: {id}});
    if (!deleted) {
        throw {
            status: 404,
            message: 'grade not found'
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