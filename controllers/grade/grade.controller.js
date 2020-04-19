const GradeService = require('../../services/grade.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const grade = await GradeService.create(body);
        await res.json(grade);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    await res.json();
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const grade = await GradeService.update(params.id, body);
        await res.json(grade);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const grade = await GradeService.findById(params.id);
        await res.json(grade);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await GradeService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};