const ClassService = require('../../services/class.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const newClass = await ClassService.create(body);
        await res.json(newClass);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    const classes = await ClassService.findAll();
    await res.json(classes);
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const updatedClass = await ClassService.update(params.id, body);
        await res.json(updatedClass);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const classObject = await ClassService.findById(params.id);
        await res.json(classObject);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await ClassService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};