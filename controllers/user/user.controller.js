const db = require('../../config');
const UserService = require('../../services/user.service');

exports.create = async (req, res, next) => {
    const {body} = req;
    const created = await UserService.create(body);
    await res.json(created);
};
exports.findAll = async (req, res, next) => {
        const { User } = db;
        const users = await User.findAll();
        await res.json(users);
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        await UserService.findById(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};

exports.update = async (req, res, next) => {
    const {body, params} = req;
    try {
        const updated = await UserService.update(params.id,body);
        await res.json(updated);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    const {params} = req;
    try {
        const result = await UserService.destroy(params.id);
        await res.json(result);
    }catch (e) {
        next(e);
    }
};