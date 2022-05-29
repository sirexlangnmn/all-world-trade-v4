const sql = require('./db.js');
const USERS_BUSINESS = require('../query/users_business.query.js');
const USERS_BUSINESS_CHARACTERISTICS = require('../query/users_business_characteristics.query.js');


const Model = function (model) {
    console.log("upgrade-to-traders.model.js | const Model = function (model)");
    console.log(model);

    

    let regionOfOperation = null;
    let countryOfOperation = null;
    let statesOfOperation = null;
    let cityOfOperation = null;

    let inputRegionOfOperation = model.region_of_operation;
    let inputCountryOfOperation = model.country_of_operation;
    let inputStatesOfOperation = model.states_of_operation;
    let inputCityOfOperation = model.city_of_operation;

   
    if (typeof inputRegionOfOperation === 'string') {
        regionOfOperation = inputRegionOfOperation;
    }
    if (typeof inputRegionOfOperation === 'object') {
        regionOfOperation = inputRegionOfOperation.toString();
    }


    if(typeof inputCountryOfOperation === 'string') {
        countryOfOperation = inputCountryOfOperation;    
    }
    if(typeof inputCountryOfOperation === 'object') {
        countryOfOperation = inputCountryOfOperation.toString();
    }

  
    if(typeof inputStatesOfOperation === 'string') {
        statesOfOperation = inputStatesOfOperation;
    } 
    
    if(typeof inputCityOfOperation === 'string') {
        cityOfOperation = inputCityOfOperation;
    }

    



    let businessSubCategoryInt;
    let businessSubCategoryStr;
    let inputBusinessSubCategory = model.business_sub_category;
    let parsedBusinessSubCategory = parseInt(model.business_sub_category);

    if (isNaN(parsedBusinessSubCategory)) {
        businessSubCategoryInt = null;
        businessSubCategoryStr = inputBusinessSubCategory;
    } else {
        businessSubCategoryInt = inputBusinessSubCategory;
        businessSubCategoryStr = null;
    }

    let businessMinorSubCategoryInt;
    let businessMinorSubCategoryStr;
    let inputBusinessMinorSubCategory = model.business_minor_sub_category;
    let parsedBusinessMinorSubCategory = parseInt(model.business_minor_sub_category);

    if (isNaN(parsedBusinessMinorSubCategory)) {
        businessMinorSubCategoryInt = null;
        businessMinorSubCategoryStr = inputBusinessMinorSubCategory;
    } else {
        businessMinorSubCategoryInt = inputBusinessMinorSubCategory;
        businessMinorSubCategoryStr = null;
    }


    
    

    let business_language_of_communication;
    let business_industry_belong_to;

    if (model.editLanguagesOfCommunication) {
        business_language_of_communication = model.editLanguagesOfCommunication;
    } else {
        business_language_of_communication = model.currentLanguagesOfCommunication;
    }

    if (model.textAreaAddKeywords) {
        business_industry_belong_to = model.textAreaAddKeywords;
    } else {
        business_industry_belong_to = model.textAreaCurrentKeywords;
    }


    // console.log('radiobutton');
    // let asd1 = model.i_operate_on_a_world_wide_level === undefined ? 0 : 1;
    // let asd2 = model.i_operate_on_a_global_regional_level === undefined ? 0 : 1;
    // let asd3 = model.i_operate_on_a_national_level === undefined ? 0 : 1;
    // let asd4 = model.i_operate_on_a_state_level === undefined ? 0 : 1;
    // console.log(asd1);
    // console.log(asd2);
    // console.log(asd3);
    // console.log(asd4);

    // console.log('radiobutton typeof');
    // console.log(typeof asd1);
    // console.log(typeof asd2);
    // console.log(typeof asd3);
    // console.log(typeof asd4);



    // console.log('location of operation initial input');
    // console.log(inputRegionOfOperation);
    // console.log(inputCountryOfOperation);
    // console.log(inputStatesOfOperation);
    // console.log(inputCityOfOperation);

    // console.log('location of operation typeof');
    // console.log(typeof inputRegionOfOperation);
    // console.log(typeof inputCountryOfOperation);
    // console.log(typeof inputStatesOfOperation);
    // console.log(typeof inputCityOfOperation);

    // console.log('location of operation final input');
    // console.log(regionOfOperation);
    // console.log(countryOfOperation);
    // console.log(statesOfOperation);
    // console.log(cityOfOperation);



    // console.log('Sub Category');
    // console.log(isNaN(parsedBusinessSubCategory));
    // console.log(typeof parsedBusinessSubCategory);
    // console.log(parsedBusinessSubCategory);
    // console.log(model.business_sub_category);
    // console.log(businessSubCategoryInt);
    // console.log(businessSubCategoryStr);
    
    // console.log('Minor Sub Category');
    // console.log(isNaN(parsedBusinessMinorSubCategory));
    // console.log(typeof parsedBusinessMinorSubCategory);
    // console.log(parsedBusinessMinorSubCategory);
    // console.log(model.business_minor_sub_category);
    // console.log(businessMinorSubCategoryInt);
    // console.log(businessMinorSubCategoryStr);


    // this.i_operate_on_a_world_wide_level = model.i_operate_on_a_world_wide_level === undefined ? 0 : 1;
    // this.i_operate_on_a_global_regional_level = model.i_operate_on_a_global_regional_level === undefined ? 0 : 1;
    // this.i_operate_on_a_national_level = model.i_operate_on_a_national_level === undefined ? 0 : 1;
    // this.i_operate_on_a_state_level = model.i_operate_on_a_state_level === undefined ? 0 : 1;

    // this.visible_to_your_own_global_region = model.visible_to_your_own_global_region === undefined ? 0 : 1;
    // this.visible_only_to_your_own_country = model.visible_only_to_your_own_country === undefined ? 0 : 1;
    // this.visible_to_your_own_states = model.visible_to_your_own_states === undefined ? 0 : 1;
    // this.visible_to_your_own_city = model.visible_to_your_own_city === undefined ? 0 : 1;
    // this.visible_to_micro_small_retailers = model.visible_to_micro_small_retailers === undefined ? 0 : 1;
    // this.visible_to_btb_medium_large_wholesale_highend =
    //     model.visible_to_btb_medium_large_wholesale_highend === undefined ? 0 : 1;
    // this.visible_to_large_scale_and_highend_business =
    //     model.visible_to_large_scale_and_highend_business === undefined ? 0 : 1;



    this.id = model.id;
    this.uuid = model.uuid;
    this.type = 1, // traders

    // users_business
    this.business_name = model.business_name;
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

    this.region_of_operation = regionOfOperation;
    this.country_of_operation = countryOfOperation;
    this.states_of_operation = statesOfOperation;
    this.city_of_operation = cityOfOperation;

    // users_business_characteristics
    this.business_industry_belong_to = business_industry_belong_to.toString();
    this.business_major_category = model.business_major_category;
    this.business_sub_category = businessSubCategoryInt;
    this.business_sub_category_str = businessSubCategoryStr;
    this.business_minor_sub_category = businessMinorSubCategoryInt;
    this.business_minor_sub_category_str = businessMinorSubCategoryStr;
    this.business_scale = model.business_scale;

    // users_business_visibility
    this.i_operate_on_a_world_wide_level = model.i_operate_on_a_world_wide_level === undefined ? 0 : 1;
    this.i_operate_on_a_global_regional_level = model.i_operate_on_a_global_regional_level === undefined ? 0 : 1;
    this.i_operate_on_a_national_level = model.i_operate_on_a_national_level === undefined ? 0 : 1;
    this.i_operate_on_a_state_level = model.i_operate_on_a_state_level === undefined ? 0 : 1;

    // this.visible_to_your_own_global_region = model.visible_to_your_own_global_region === undefined ? 0 : 1;
    // this.visible_only_to_your_own_country = model.visible_only_to_your_own_country === undefined ? 0 : 1;
    // this.visible_to_your_own_states = model.visible_to_your_own_states === undefined ? 0 : 1;
    // this.visible_to_your_own_city = model.visible_to_your_own_city === undefined ? 0 : 1;
    this.visible_to_micro_small_retailers = model.visible_to_micro_small_retailers === undefined ? 0 : 1;
    this.visible_to_btb_medium_large_wholesale_highend =
        model.visible_to_btb_medium_large_wholesale_highend === undefined ? 0 : 1;
    this.visible_to_large_scale_and_highend_business =
        model.visible_to_large_scale_and_highend_business === undefined ? 0 : 1;


    this.session = model.session;
};

Model.update = (newModel, result) => {
    console.log('upgrade-to-traders.model.js | Model.update = (newModel, result) =>');
    console.log(newModel);

    const usersBusinessObject = {
        business_name: newModel.business_name,
        business_email: newModel.business_email,
        business_contact: newModel.business_contact,
        business_language_of_communication: newModel.business_language_of_communication,
        business_tagline: newModel.business_tagline,
        business_website: newModel.business_website,
        business_social_media_contact_type: newModel.business_social_media_contact_type,
        business_social_media_contact_number: newModel.business_social_media_contact_number,
        business_address: newModel.business_address,
        business_country: newModel.business_country,
        business_states: newModel.business_states,
        business_city: newModel.business_city,
        region_of_operation: newModel.region_of_operation,
        country_of_operation: newModel.country_of_operation,
        states_of_operation: newModel.states_of_operation,
        city_of_operation: newModel.city_of_operation,
        start_operating_hour: newModel.start_operating_hour,
        end_operating_hour: newModel.end_operating_hour,
    };

    // users_business
    // const usersBusinessData = [
    //     newModel.business_name,
    //     newModel.business_email,
    //     newModel.business_contact,
    //     newModel.business_language_of_communication,
    //     newModel.business_tagline,
    //     newModel.business_website,
    //     newModel.business_social_media_contact_type,
    //     newModel.business_social_media_contact_number,
    //     newModel.business_address,
    //     newModel.business_country,
    //     newModel.business_states,
    //     newModel.business_city,
    //     newModel.region_of_operation,
    //     newModel.country_of_operation,
    //     newModel.states_of_operation,
    //     newModel.city_of_operation,
    //     newModel.start_operating_hour,
    //     newModel.end_operating_hour,
    //     newModel.uuid,
    // ];

    // const usersBusinessQuery = `UPDATE users_business SET 
    //     business_name = ?,
    //     business_email = ?, 
    //     business_contact = ?, 
    //     business_language_of_communication = ?, 
    //     business_tagline = ?, 
    //     business_website = ?, 
    //     business_social_media_contact_type = ?, 
    //     business_social_media_contact_number = ?, 
    //     business_address = ?, 
    //     business_country = ?, 
    //     business_states = ?, 
    //     business_city = ?, 
    //     region_of_operation = ?,
    //     country_of_operation = ?,
    //     states_of_operation = ?,
    //     city_of_operation = ?,
    //     start_operating_hour = ?,
    //     end_operating_hour = ?
    //     WHERE uuid = ?`;

    // users_accounts ok
    const usersAccountsData = [
        newModel.type,
        newModel.uuid,
    ];

    const usersAccountsQuery = `UPDATE users_accounts SET 
        type = ?
        WHERE uuid = ?`;

    // users_business_characteristics
    const usersBusinessCharacteristicsObject = {
        user_business_id: newModel.id,
        business_industry_belong_to: newModel.business_industry_belong_to,
        business_major_category: newModel.business_major_category,
        business_sub_category: newModel.business_sub_category,
        business_sub_category_str: newModel.business_sub_category_str,
        business_minor_sub_category: newModel.business_minor_sub_category,
        business_minor_sub_category_str: newModel.business_minor_sub_category_str,
        business_scale: newModel.business_scale,
        uuid: newModel.uuid
    };


    // users_business_visibility
    const usersBusinessVisibilityData = [
        newModel.id,
        newModel.i_operate_on_a_world_wide_level,
        newModel.i_operate_on_a_global_regional_level,
        newModel.i_operate_on_a_national_level,
        newModel.i_operate_on_a_state_level,
        newModel.visible_to_micro_small_retailers,
        newModel.visible_to_btb_medium_large_wholesale_highend,
        newModel.visible_to_large_scale_and_highend_business,
        newModel.uuid,
    ];

    const usersBusinessVisibilityQuery = `INSERT INTO users_business_visibility
        (user_business_id, 
        i_operate_on_a_world_wide_level, 
        i_operate_on_a_global_regional_level, 
        i_operate_on_a_national_level, 
        i_operate_on_a_state_level, 
        visible_to_micro_small_retailers, 
        visible_to_btb_medium_large_wholesale_highend, 
        visible_to_large_scale_and_highend_business, 
        uuid) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?);`;


    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }


        // sql.query(usersBusinessQuery, usersBusinessData, function (err, rows) {
        sql.query(USERS_BUSINESS.UPDATE, [...Object.values(usersBusinessObject), newModel.uuid], function (err, rows) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            } else {
                console.log('users_business table row inserted with id = ' + rows.insertId);

                sql.query(usersAccountsQuery, usersAccountsData, function (err, rows) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    } else {
                        console.log('users_accounts table row inserted with id = ' + rows.insertId);

                        // sql.query(usersBusinessCharacteristicsQuery, usersBusinessCharacteristicsData, (err, rows) => {
                        sql.query(USERS_BUSINESS_CHARACTERISTICS.CREATE, Object.values(usersBusinessCharacteristicsObject), (err, rows) => {
                            
                            if (err) {
                                sql.rollback(function () {
                                    throw err;
                                });
                            } else {
                                console.log('users_business_characteristics table row inserted with id = ' + rows.insertId);
                                sql.query(usersBusinessVisibilityQuery, usersBusinessVisibilityData, (err, rows) => {
                                    if (err) {
                                        sql.rollback(function () {
                                            throw err;
                                        });
                                    } else {
                                        
                                        console.log('users_business_visibility table row inserted with id = ' + rows.insertId);
                                        sql.commit(function (err) {
                                            if (err) {
                                                sql.rollback(function () {
                                                    throw err;
                                                });
                                            } else {
                                                newModel.session.user.type = newModel.type;
                                                result(null, { id: rows.insertId, ...newModel });
                                            }
                                        });
                                    }
                                    // console.log('usersBusinessVisibilityQuery', usersBusinessVisibilityQuery);
                                    // console.log('usersBusinessVisibilityData', usersBusinessVisibilityData);
                                });
                            }
                        });

                    }
                });
            }
        });
    });
    /* End transaction */
};

module.exports = Model;
