const {models} = require('../config/index');

const findAll = async () => {
    const {user} = models;
    return user.findAll();
};

const create = async (payload) => {
    const {user} = models;
    return user.create(payload, {returning: true});
};

const update = async (id, payload) => {
    const {user} = models;
    await user.update(payload, {where: {id}});
  const updated = await user.findOne({where: {id}});
  if (!updated){
      throw {
          status: 404,
          message: 'user not found'
      };
  }
  return updated;
};

const destroy = async (id) => {
    const {user} = models;
    await user.update({deleted: true}, {where: {id}});
    const deleted = await user.findOne({where: {id, deleted: true}});
    if (!deleted){
        throw {
            status: 404,
            message: 'user not found'
        };
    }
};

const findById = async (id) => {
    const {user} = models;
    const found = await user.findOne({where: {id}});
    if (!found){
        throw {
            status: 404,
            message: 'user not found'
        };
    }
    return found;
};

module.exports = {
    create,
    findAll,
    update,
    destroy,
    findById
};