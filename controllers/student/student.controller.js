const StudentService = require('../../services/student.service');

exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        const student = await StudentService.create(body);
        await res.json(student);
    } catch (e) {
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    const students = await StudentService.findAll();
    await res.json(students);
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const student = await StudentService.update(params.id, body);
        await res.json(student);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const student = await StudentService.findById(params.id);
        await res.json(student);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await StudentService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};