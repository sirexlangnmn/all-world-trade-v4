const sql = require('./db.js');

const Model = function (data) {
    console.log('small-scale-company.model.js | const Model = function (data) : ', data);

    this.uuid = data.uuid;

    // users
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.middle_name = data.middle_name;

    // users_address
    this.country = data.country;
    this.state_or_province = data.state_or_province;
    this.city = data.city;

    // users_business
    this.business_social_media_contact_type = data.business_social_media_contact_type;
    this.business_social_media_contact_number = data.business_social_media_contact_number;
    this.business_language_of_communication =
        data.editLanguagesOfCommunication === undefined
            ? data.currentLanguagesOfCommunication
            : data.editLanguagesOfCommunication.toString(); //new
};

Model.update = (data, result) => {
    console.log("small-scale-company.model.js | Model.update = (data, result)")
    console.log(data)

    // users_business
    const usersData = [data.first_name, data.last_name, data.middle_name, data.uuid];

    // users_address
    const usersAddressData = [data.country, data.state_or_province, data.city, data.uuid];

    // users_business
    const usersBusinessData = [
        data.business_language_of_communication,
        data.business_social_media_contact_type,
        data.business_social_media_contact_number,
        data.uuid,
    ];

    const usersQuery = `UPDATE users SET 
        first_name = ?, 
        last_name = ?, 
        middle_name = ?
        WHERE uuid = ?`;

    const usersAddressQuery = `UPDATE users_address SET 
        country = ?, 
        state_or_province = ?, 
        city = ?
        WHERE uuid = ?`;

    const usersBusinessQuery = `UPDATE users_business SET 
        business_language_of_communication = ?, 
        business_social_media_contact_type = ?, 
        business_social_media_contact_number = ?
        WHERE uuid = ?`;

    /* Begin transaction */
    // sql.beginTransaction(function (err) {
    //     if (err) {
    //         throw err;
    //     }

    //     sql.query(usersQuery, usersData, function (err, rows) {
    //         if (err) {
    //             sql.rollback(function () {
    //                 throw err;
    //             });
    //         } else {
    //             sql.query(usersAddressQuery, usersAddressData, (err, rows) => {
    //                 if (err) {
    //                     sql.rollback(function () {
    //                         throw err;
    //                     });
    //                 } else {
    //                     sql.query(usersBusinessQuery, usersBusinessData, (err, rows) => {
    //                         if (err) {
    //                             sql.rollback(function () {
    //                                 throw err;
    //                             });
    //                         } else {
    //                             sql.commit(function (err) {
    //                                 if (err) {
    //                                     sql.rollback(function () {
    //                                         throw err;
    //                                     });
    //                                 } else {
    //                                     result(null, { id: rows.insertId, ...data });
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });
    /* End transaction */
};

module.exports = Model;