const QUERY = {

    CREATE: 'INSERT INTO users_business_characteristics (' +
            'user_business_id, ' +
            'business_industry_belong_to, ' +
            'business_major_category, ' +
            'business_sub_category, ' +
            'business_sub_category_str, ' + 
            'business_minor_sub_category, ' + 
            'business_minor_sub_category_str, ' +
            'business_scale, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?, ?, ?, ?)',

    CREATE_OLD: 'INSERT INTO users_business_characteristics (' +
            'user_business_id, ' +
            'business_industry_belong_to, ' +
            'business_major_category, ' +
            'business_sub_category, ' +
            'business_minor_sub_category, ' + 
            'business_scale, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?, ?)',
}

module.exports = QUERY;