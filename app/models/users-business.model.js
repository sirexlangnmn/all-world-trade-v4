const sql = require('./db.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT * FROM users_business';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business: ', res);
        result(null, res);
    });
};

Tutorial.getBusinessLocationCode = (uuid, result) => {
    let query = 'SELECT business_country, business_states, business_city, region_of_operation, country_of_operation, states_of_operation, city_of_operation FROM users_business';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business: ', res);
        result(null, res);
    });
};

Tutorial.getAllPublished = (result) => {
    sql.query('SELECT * FROM users_business WHERE status=1', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        //console.log('SELECT * FROM users_business WHERE status=1: ', res);
        result(null, res);
    });
};

module.exports = Tutorial;
