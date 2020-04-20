const DebitService = require('../../services/debit.service');

exports.findAll = async (req, res, next) => {
    const debits = await DebitService.findAll();
    await res.json(debits);
};

exports.create = async (req, res, next) => {
    try{
        const {body} = req;
        const debit = await DebitService.create(body);
        await res.json(debit);
    } catch (e) {
        next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const {params, body} = req;
        const debit = await DebitService.update(params.id, body);
        await res.json(debit);
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        const debit = await DebitService.findById(params.id);
        await res.json(debit);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await DebitService.destroy(params.id);
        await res.json();
    } catch (e) {
        next(e);
    }
};