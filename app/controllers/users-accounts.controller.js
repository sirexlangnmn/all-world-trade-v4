const Tutorial = require('../models/users-accounts.model.js');

// Retrieve user account from the database (with condition).
exports.find = (req, res) => {};

exports.emailVerification = (req, res) => {};

// ===================
// Retrieve objects
// ===================
// Retrieve user account from the database (with condition).
exports.find = (req, res) => {
    const uuid = req.session.user.uuid;

    Tutorial.getAll(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving user account.',
            });
        else res.send(data);
    });
};

exports.emailVerification = (req, res) => {
    const registration_uuid = req.session.registration_uuid;
    const verification_code = req.session.verification_code;
    const inputCode = req.body.inputCode;
    // console.log('user-accounts.controller.js registration_uuid:', registration_uuid);
    // console.log('user-accounts.controller.js verification_code:', verification_code);
    // console.log('user-accounts.controller.js inputCode:', req.body.inputCode);
    // console.log('user-accounts.controller.js typeof registration_uuid:', typeof registration_uuid);
    // console.log('user-accounts.controller.js typeof verification_code:', typeof verification_code);
    // console.log('user-accounts.controller.js typeof inputCode:', typeof req.body.inputCode);
    // console.log('user-accounts.controller.js typeof Number inputCode:', typeof Number(inputCode));
    // console.log('user-accounts.controller.js typeof Number verification_code:', typeof Number(verification_code));

    // if (Number(inputCode) == Number(verification_code)) {
    //     console.log('verify');
    //     res.send('verify');
    // } else {
    //     res.send('not_verify');
    // }

    Tutorial.emailVerification(registration_uuid, verification_code, inputCode, (err, data) => {
        console.log('user-accounts.controller.js data:', data);
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving user account.',
            });
        else res.send(data);
    });
};
