const Tutorial = require('../models/users-business.model.js');

// Retrieve all companies from the database (with condition).
exports.findAll = (req, res) => {};

exports.findBusinessLocationCode = (req, res) => {};

// find all published companies
exports.findAllPublished = (req, res) => {};

// ===================
// Retrieve objects
// ===================
// Retrieve all companies from the database (with condition).
exports.findAll = (req, res) => {
    const uuid = req.session.user.uuid;

    Tutorial.getAll(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};



exports.findBusinessLocationCode = (req, res) => {
    const uuid = req.session.user.uuid;
    //console.log('exports.findBusinessLocationCode = (req, res):', uuid);
    Tutorial.getBusinessLocationCode(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};


exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};
