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
    return Role.findOne({where: {id}});
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
    const deletedRows = await Role.destroy({where: {id}});
    if(!deletedRows){
        throw {
            status: 404,
            message: 'Role not found'
        }
    } else {
        return deletedRows;
    }
};
module.exports = {
    create,
    findAll,
    update,
    findById,
    destroy
};