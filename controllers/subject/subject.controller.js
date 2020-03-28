const SubjectService = require('../../services/subject.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const newSubject = await SubjectService.create(body);
        await res.json(newSubject);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    const subjects = await SubjectService.findAll();
    await res.json(subjects);
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const updated = await SubjectService.update(params.id, body);
        await res.json(updated);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const found = await SubjectService.findById(params.id);
        await res.json(found);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await SubjectService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};