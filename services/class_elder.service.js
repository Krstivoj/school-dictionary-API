const {models} = require('../config/index');

const findAll = async () => {
    const {class_elder} = models ;
    return class_elder.findAll();
};

const create = async (classElderPayload) => {
    const {class_elder} = models;
    return class_elder.create(classElderPayload);
};

const update = async (id, classElderPayload) => {
    const {class_elder} = models;
    await class_elder.update(classElderPayload, {where: {id}});
    const updated = await class_elder.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'class_elder not found'
        }
    }
    return updated;
};

const findById = async (id) => {
    const {class_elder} = models;
    const found = await class_elder.findOne({where: {id}});
    if(!found){
        throw {
            status: 404,
            message: 'class_elder not found'
        }
    } else {
        return found;
    }
};

const destroy = async (id) => {
    const {class_elder} = models;
    await class_elder.update({deleted: true},{where: {id}});
    const deleted = await class_elder.findOne({where: {id, deleted: true}});
    if(!deleted){
        throw {
            status: 404,
            message: 'class_elder not found'
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