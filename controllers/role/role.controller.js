const RoleService = require('../../services/role.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const role = await RoleService.create(body);
        await res.json(role);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    const roles = await RoleService.findAll();
    await res.json(roles);
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const updatedRole = await RoleService.update(params.id, body);
        await res.json(updatedRole);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const role = await RoleService.findById(params.id);
        await res.json(role);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await RoleService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};