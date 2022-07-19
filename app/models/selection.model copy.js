const sql = require('./db.js');
// const USERS_BUSINESS_MEDIAS = require('../query/users_business_medias.query.js');

// constructor
const Model = function (model) {};

Model.getAllPublished = (uuid, result) => {
    // console.log('UUID: ', uuid);
    //sql.query('SELECT COUNT(id) AS id_count FROM users_business_medias', (err, res) => {
    //sql.query('SELECT COUNT(id) AS id_count FROM users_business_characteristics WHERE business_major_category = 1', (err, res) => {
    //sql.query('SELECT id FROM trade_categories WHERE status = 1', (err, res) => {

    sql.query(`SELECT country, state_or_province FROM users_address WHERE uuid = '${uuid}'`, (err, res) => {
        let currentUserCountryCode = res[0].country;
        // console.log('USERS_COUNTRY: ', res[0].country);
        // console.log('USERS_STATE: ', res[0].state_or_province);
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        } else {
            sql.query('SELECT id FROM trade_categories WHERE status = 1', (err, res) => {
                // console.log('TRADE_CATEGORIES_ID: ', res[0].id);
                let tradeCategoryId = res[0].id;
                if (err) {
                    console.log('error: ', err);
                    result(null, err);
                    return;
                } else {
                    // console.log('currentUserCountryCode: ', currentUserCountryCode);
                    // sql.query(`SELECT COUNT(id) AS id_count FROM users_business_characteristics WHERE business_major_category = ${tradeCategoryId}`, (err, res) => {
                    // sql.query(`SELECT * FROM users_business_characteristics JOIN users_business ON users_business_characteristics.user_business_id = users_business.id WHERE users_business_characteristics.business_major_category = ${tradeCategoryId} OR WHERE users_business.country_of_operation = ${currentUserCountryCode}`, (err, res) => {
                    // sql.query(`SELECT COUNT(users_business.id) AS id_count FROM users_business_characteristics JOIN users_business ON users_business_characteristics.user_business_id = users_business.id WHERE users_business_characteristics.business_major_category = '${tradeCategoryId}' AND users_business.country_of_operation = '${currentUserCountryCode}'`, (err, res) => {
                    // sql.query(`SELECT COUNT(users_business.id) AS id_count FROM users_business JOIN users_business_characteristics ON users_business.id = users_business_characteristics.user_business_id WHERE users_business.country_of_operation = 'PH'`, (err, res) => {
                    sql.query(
                        `SELECT COUNT(users_business.id) AS id_count FROM users_business JOIN users_business_characteristics ON users_business.uuid = users_business_characteristics.uuid WHERE users_business_characteristics.business_major_category = '${tradeCategoryId}' AND users_business.country_of_operation = '${currentUserCountryCode}'`,
                        (err, res) => {
                            // console.log('USERS_BUSINESS_COUNT_RELATED_TO_tradeCategoryId_AND_currentUserCountryCode: ',  res[0].id_count);
                            if (err) {
                                console.log('error: ', err);
                                result(null, err);
                                return;
                            } else {
                                let randomNumber = Math.floor(1 + Math.random() * res[0].id_count);

                                // console.log('RANDOM_NUMBER: ', randomNumber);
                                sql.query(
                                    `SELECT 
                                    users_business.id, 
                                    users_business.business_name, 
                                    users_business.business_tagline,
                                    users_business.business_website,
                                    users_business.business_email,
                                    users_business.business_contact,
                                    users_business.business_language_of_communication,
                                    users_business.business_social_media_contact_type,
                                    users_business.business_social_media_contact_number,
                                    users_business.business_address,
                                    users_business.business_country,
                                    users_business.business_states,
                                    users_business.business_city,
                                    users_business.region_of_operation,
                                    users_business.country_of_operation,
                                    users_business.states_of_operation,
                                    users_business.city_of_operation,
                                    users_business.communicator,
                                    users_business.uuid,
                                    users_business_characteristics.business_industry_belong_to,
                                    users_business_characteristics.business_major_category,
                                    users_business_characteristics.business_sub_category,
                                    users_business_characteristics.business_minor_sub_category,
                                    users_business_characteristics.business_scale,
                                    users_business_medias.banner
                                    FROM users_business 
                                    JOIN users_business_characteristics 
                                    ON users_business.uuid = users_business_characteristics.uuid 
                                    JOIN users_business_medias 
                                    ON users_business.uuid = users_business_medias.uuid 
                                    WHERE users_business_characteristics.business_major_category = '${tradeCategoryId}' 
                                    AND users_business.country_of_operation = '${currentUserCountryCode}'`,
                                    (err, res) => {
                                        // console.log('BUSINESS_RETRIEVE: ', res);
                                        if (err) {
                                            console.log('error: ', err);

                                            result(null, err);
                                            return;
                                        } else {
                                            result(null, res);
                                        }
                                    },
                                );
                            }
                        },
                    );
                }
            });
        }
    });
};

Model.getAllBySearchParameter = (param, result) => {
    // console.log('selection.model.js | Model.getAllPublished | parameters: ', param);
    // console.log('selection.model.js | Model.getAllPublished | param.uuid: ', param.uuid);
    console.log(
        'selection.model.js | Model.getAllPublished | param.regionOfOperationCode: ',
        param.regionOfOperationCode,
    );
    console.log('selection.model.js | Model.getAllPublished | param.countryCode: ', param.countryCode);
    console.log('selection.model.js | Model.getAllPublished | param.selectionState: ', param.selectionState);
    console.log('selection.model.js | Model.getAllPublished | param.selectionCity: ', param.selectionCity);
    console.log('selection.model.js | Model.getAllPublished | param.language: ', param.language);
    console.log('selection.model.js | Model.getAllPublished | param.business_scale: ', param.business_scale);
    console.log('selection.model.js | Model.getAllPublished | param.trade_categories: ', param.trade_categories);
    console.log('selection.model.js | Model.getAllPublished | param.sub_categories: ', param.sub_categories);
    console.log(
        'selection.model.js | Model.getAllPublished | param.minor_sub_categories: ',
        param.minor_sub_categories,
    );
    console.log(
        'selection.model.js | Model.getAllPublished | param.product_service_input: ',
        param.product_service_input,
    );
    console.log('selection.model.js | Model.getAllPublished | param.company_name_input: ', param.company_name_input);

    let query = `SELECT 
        users_business.id, 
        users_business.business_name, 
        users_business.business_tagline,
        users_business.business_website,
        users_business.business_email,
        users_business.business_contact,
        users_business.business_language_of_communication,
        users_business.business_social_media_contact_type,
        users_business.business_social_media_contact_number,
        users_business.business_address,
        users_business.business_country,
        users_business.business_states,
        users_business.business_city,
        users_business.region_of_operation,
        users_business.country_of_operation,
        users_business.states_of_operation,
        users_business.city_of_operation,
        users_business.communicator,
        users_business.uuid,
        users_business_characteristics.business_industry_belong_to,
        users_business_characteristics.business_major_category,
        users_business_characteristics.business_sub_category,
        users_business_characteristics.business_minor_sub_category,
        users_business_characteristics.business_scale,
        users_business_medias.banner
        FROM users_business 
        JOIN users_business_characteristics 
        ON users_business.uuid = users_business_characteristics.uuid 
        JOIN users_business_medias 
        ON users_business.uuid = users_business_medias.uuid 
        WHERE `;

    if (param.trade_categories) {
        query += `users_business_characteristics.business_major_category = '${param.trade_categories}' `;
    }
    if (param.regionOfOperationCode) {
        query += `AND users_business.region_of_operation = '${param.regionOfOperationCode}' `;
    }
    if (param.countryCode) {
        query += `AND users_business.country_of_operation = '${param.countryCode}'`;
    }
    if (param.selectionState) {
        query += `AND users_business.states_of_operation = '${param.selectionState}'`;
    }
    if (param.selectionCity) {
        query += `AND users_business.city_of_operation = '${param.selectionCity}'`;
    }
    // if (param.language) {
    //     query += `OR users_business.business_language_of_communication LIKE '%${param.language}%'`;
    // }
    if (param.language) {
        query += `AND users_business.business_language_of_communication LIKE '%${param.language}%'`;
    }
    if (param.business_scale) {
        query += `AND users_business_characteristics.business_scale = '${param.business_scale}'`;
    }
    if (param.sub_categories) {
        query += `AND users_business_characteristics.business_sub_category = '${param.sub_categories}'`;
    }
    if (param.minor_sub_categories) {
        query += `AND users_business_characteristics.business_minor_sub_category = '${param.minor_sub_categories}'`;
    }
    if (param.product_service_input) {
        query += `OR users_business_characteristics.business_industry_belong_to LIKE '%${param.product_service_input}%'`;
    }
    if (param.company_name_input) {
        query += `OR users_business.business_name LIKE '%${param.company_name_input}%'`;
    }

    sql.query(query, (err, res) => {
        console.log('BUSINESS_RETRIEVE: ', res);
        if (err) {
            console.log('error: ', err);

            result(null, err);
            return;
        } else {
            console.log('res: ', res);
            result(null, res);
        }
    });
};

module.exports = Model;
