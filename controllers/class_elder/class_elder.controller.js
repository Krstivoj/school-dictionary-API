const ClassElderService = require('../../services/class_elder.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const classElder = await ClassElderService.create(body);
        await res.json(classElder);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const classElders = await ClassElderService.findAll();
        await res.json(classElders);
    } catch (e) {
        console.log('Exception ',e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const updated = await ClassElderService.update(params.id, body);
        await res.json(updated);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const classElder = await ClassElderService.findById(params.id);
        await res.json(classElder);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await ClassElderService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};