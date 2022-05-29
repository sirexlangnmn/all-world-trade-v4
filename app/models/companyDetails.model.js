const sql = require('./db.js');

const Model = function (model) {
    let business_language_of_communication;
    if (model.editLanguagesOfCommunication) {
        business_language_of_communication = model.editLanguagesOfCommunication;
    } else {
        business_language_of_communication = model.currentLanguagesOfCommunication;
    }

    let business_industry_belong_to;
    if (model.textAreaAddKeywords) {
        business_industry_belong_to = model.textAreaAddKeywords;
    } else {
        business_industry_belong_to = model.textAreaCurrentKeywords;
    }

    this.uuid = model.uuid;

    // users_business
    this.business_tagline = model.business_tagline;
    this.business_website = model.business_website;
    this.business_social_media_contact_type = model.business_social_media_contact_type;
    this.start_operating_hour = model.start_operating_hour;
    this.end_operating_hour = model.end_operating_hour;

    this.business_email = model.business_email;
    this.business_contact = model.business_contact;
    this.business_language_of_communication = business_language_of_communication.toString();
    this.business_social_media_contact_number = model.business_social_media_contact_number;
    this.business_address = model.business_address;
    this.business_country = model.business_country;
    this.business_states = model.business_states;
    this.business_city = model.business_city;
    this.region_of_operation = model.region_of_operation;

    this.country_of_operation = model.country_of_operation;
    this.states_of_operation = model.states_of_operation;

    // users_business_characteristics
    this.business_industry_belong_to = business_industry_belong_to.toString();
    this.business_major_category = model.business_major_category;
    this.business_sub_category = model.business_sub_category;
    this.business_minor_sub_category = model.business_minor_sub_category;
    this.business_scale = model.business_scale;
};

Model.update = (newModel, result) => {
    // console.log('newModel');
    // console.log(newModel);

    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }

        // users_business
        const usersBusinessData = [
            newModel.business_email,
            newModel.business_contact,
            newModel.business_language_of_communication,
            newModel.business_tagline,
            newModel.business_website,
            newModel.business_social_media_contact_type,
            newModel.business_social_media_contact_number,
            newModel.business_address,
            newModel.business_country,
            newModel.business_states,
            newModel.business_city,
            newModel.region_of_operation,
            newModel.country_of_operation,
            newModel.states_of_operation,
            //newModel.city_of_operation,
            newModel.start_operating_hour,
            newModel.end_operating_hour,
            newModel.uuid,
        ];

        const usersBusinessQuery = `UPDATE users_business SET 
            business_email = ?, 
            business_contact = ?, 
            business_language_of_communication = ?, 
            business_tagline = ?, 
            business_website = ?, 
            business_social_media_contact_type = ?, 
            business_social_media_contact_number = ?, 
            business_address = ?, 
            business_country = ?, 
            business_states = ?, 
            business_city = ?, 
            region_of_operation = ?,
            country_of_operation = ?,
            states_of_operation = ?,
            start_operating_hour = ?,
            end_operating_hour = ?
            WHERE uuid = ?`;

        sql.query(usersBusinessQuery, usersBusinessData, function (err, rows) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            } else {
                console.log('users_business table row inserted with id = ' + rows.insertId);

                // users_business_characteristics
                const usersBusinessCharacteristicsData = [
                    newModel.business_industry_belong_to,
                    newModel.business_major_category,
                    newModel.business_sub_category,
                    newModel.business_minor_sub_category,
                    newModel.business_scale,
                    newModel.uuid,
                ];

                const usersBusinessCharacteristicsQuery = `UPDATE users_business_characteristics SET 
                    business_industry_belong_to = ?, 
                    business_major_category = ?, 
                    business_sub_category = ?, 
                    business_minor_sub_category = ?, 
                    business_scale = ? 
                    WHERE uuid = ?`;

                sql.query(usersBusinessCharacteristicsQuery, usersBusinessCharacteristicsData, (err, rows) => {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    } else {
                        sql.commit(function (err) {
                            if (err) {
                                sql.rollback(function () {
                                    throw err;
                                });
                            } else {
                                result(null, { id: rows.insertId, ...newModel });
                            }
                        });
                    }
                    console.log('users_business_characteristics table row inserted with id = ' + rows.insertId);
                });
            }
        });
    });
    /* End transaction */
};

module.exports = Model;
