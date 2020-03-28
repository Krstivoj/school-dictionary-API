const db = require('../config/index');

const findAll = async () => {
    const {User} = db;
    return User.findAll();
};

const create = async (payload) => {
    const {User} = db;
    return User.create(payload, {returning: true});
};

const update = async (id, payload) => {
    const {User} = db;
    await User.update(payload, {where: {id}});
  const user = await User.findOne({where: {id}});
  if (!user){
      throw {
          status: 404,
          message: 'User not found'
      };
  }
  return user;
};

const destroy = async (id) => {
    const {User} = db;
    await User.update({deleted: true}, {where: {id}});
    const deleted = await User.findOne({where: {id, deleted: true}});
    if (!deleted){
        throw {
            status: 404,
            message: 'User not found'
        };
    }
};

const findById = async (id) => {
    const {User} = db;
    const user = await User.findOne({where: {id}});
    if (!user){
        throw {
            status: 404,
            message: 'User not found'
        };
    }
    return user;
};

module.exports = {
    create,
    findAll,
    update,
    destroy,
    findById
};