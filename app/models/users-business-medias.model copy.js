const sql = require('./db.js');
const USERS_BUSINESS_MEDIAS = require('../query/users_business_medias.query.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT id, brochure, brochure_title FROM users_business_medias';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business_medias: ', res);
        result(null, res);
    });
};


// old version
// Tutorial.getAllPublished = (result) => {
//     // sql.query('SELECT * FROM users_business_medias WHERE status=1', (err, res) => {
//     sql.query(USERS_BUSINESS_MEDIAS.SELECT_BANNER, (err, res) => {
//         if (err) {
//             console.log('error: ', err);
//             result(null, err);
//             return;
//         }

//         //console.log('USERS_BUSINESS_MEDIAS.SELECT_BANNER: ', res);
//         result(null, res);
//     });
// };

//new version
Tutorial.getAllPublished = (uuid, result) => {
    console.log('UUID: ', uuid);
    //sql.query('SELECT COUNT(id) AS id_count FROM users_business_medias', (err, res) => {
    //sql.query('SELECT COUNT(id) AS id_count FROM users_business_characteristics WHERE business_major_category = 1', (err, res) => {
    //sql.query('SELECT id FROM trade_categories WHERE status = 1', (err, res) => {

    sql.query(`SELECT country, state_or_province FROM users_address WHERE uuid = '${uuid}'`, (err, res) => {
        console.log('USERS_COUNTRY: ', res[0].country);
        console.log('USERS_STATE: ', res[0].state_or_province);
        console.log('USERS_ADDRESS: ', err);
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        } else {
            sql.query('SELECT id FROM trade_categories WHERE status = 1', (err, res) => {
                console.log('TRADE_CATEGORIES_ID: ', res[0].id);
                let tradeCategoryId = res[0].id;
                if (err) {
                    console.log('error: ', err);
                    result(null, err);
                    return;
                } else {
                    sql.query(`SELECT COUNT(id) AS id_count FROM users_business_characteristics WHERE business_major_category = ${tradeCategoryId}`, (err, res) => {
                        console.log('USERS_BUSINESS_CHARACTERISTICS_COUNT: ', res[0].id_count);
                        if (err) {
                            console.log('error: ', err);
                            result(null, err);
                            return;
                        } else {
                            let randomNumber = Math.floor(1 + Math.random() * res[0].id_count);
        
                            console.log('RANDOM_NUMBER: ', randomNumber);
                            sql.query(`SELECT uuid FROM users_business_characteristics WHERE business_major_category = ${tradeCategoryId}`, (err, res) => {
                                console.log('USERS_BUSINESS_CHARACTERISTICS_GET: ', res);
                                if (err) {
                                    console.log('error: ', err);
                                    result(null, err);
                                    return;
                                } else {
                                    
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
   
};

module.exports = Tutorial;
