
exports.create = async (req, res, next) => {
    try {
        const {body} = req;
        await res.json();
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
        await res.json();
    } catch (e) {
        next(e);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const {params} = req;
        await res.json();
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const {params} = req;
        await res.json();
    } catch (e) {
        next(e);
    }
};