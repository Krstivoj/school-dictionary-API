const {models} = require('../config/index');

const findAll = async () => {
    const {role} = models ;
    return role.findAll();
};

const create = async (rolePayload) => {
    const {role} = models;
    return role.create(rolePayload);
};

const update = async (id, rolePayload) => {
    const {role} = models;
    await role.update(rolePayload, {where: {id}});
    const updated = await role.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'role not found'
        }
    }
    return updated;
};

const findById = async (id) => {
    const {role} = models;
    const found = await role.findOne({where: {id}});
    if(!found){
        throw {
            status: 404,
            message: 'role not found'
        }
    } else {
        return found;
    }
};

const destroy = async (id) => {
    const {role} = models;
    await role.update({deleted: true},{where: {id}});
    const deleted = await role.findOne({where: {id, deleted: true}});
    if(!deleted){
        throw {
            status: 404,
            message: 'role not found'
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