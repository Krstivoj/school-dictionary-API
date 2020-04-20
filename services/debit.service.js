const {models} = require('../config/index');

const findAll = async () => {
    const {debit} = models;
    return debit.findAll();
};

const create = async (debitPayload) => {
    const {debit} = models;
    return debit.create(debitPayload, {returning: true});
};

const update = async (id, debitPayload) => {
    const {debit} = models;
    await debit.update(debitPayload, {where: {id}});
    const updated = await debit.findOne({where: {id}});
    if (!updated) {
        throw {
            status: 404,
            message: 'debit not found'
        }
    }
    return updated;
};

const findById = async (id) => {
    const {debit} = models;
    const founddebit = await debit.findOne({where: {id}});
    if (!founddebit) {
        throw {
            status: 404,
            message: 'debit not found'
        }
    } else {
        return founddebit;
    }
};

const destroy = async (id) => {
    const {debit} = models;
    const deleted = await debit.destroy({where: {id}});
    if (!deleted) {
        throw {
            status: 404,
            message: 'debit not found'
        }
    }
};

module.exports = {
    findAll,
    create,
    update,
    findById,
    destroy
};