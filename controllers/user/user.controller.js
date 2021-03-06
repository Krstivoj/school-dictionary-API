const UserService = require('../../services/user.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const created = await UserService.create(body);
        await res.json(created);
    } catch (e) {
        next(e);
    }
};
exports.findAll = async (req, res, next) => {
        const users = await UserService.findAll();
        await res.json(users);
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const found = await UserService.findById(params.id);
        await res.json(found);
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