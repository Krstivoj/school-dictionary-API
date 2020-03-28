const db = require('../config/index');

const findAll = async () => {
    const {Role} = db ;
    return Role.findAll();
};

const create = async (role) => {
    const {Role} = db;
    return Role.create(role);
};

const update = async (id, role) => {
    const {Role} = db;
    await Role.update(role, {where: {id}});
    const updated = await Role.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'Role not found'
        }
    }
    return updated;
};

const findById = async (id) => {
    const {Role} = db;
    const role = await Role.findOne({where: {id}});
    if(!role){
        throw {
            status: 404,
            message: 'Role not found'
        }
    } else {
        return role;
    }
};

const destroy = async (id) => {
    const {Role} = db;
    await Role.update({deleted: true},{where: {id}});
    const deleted = await Role.findOne({where: {id, deleted: true}});
    if(!deleted){
        throw {
            status: 404,
            message: 'Role not found'
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