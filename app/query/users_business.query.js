const QUERY = {

    CREATE: 'INSERT INTO users_business (' +
            'user_id, ' +
            'business_name, ' +
            'business_email, ' +
            'business_contact, ' +
            'business_language_of_communication, ' +
            'business_tagline, ' +
            'business_website, ' +
            'business_social_media_contact_type, ' +
            'business_social_media_contact_number, ' +
            'business_address, ' +
            'business_country, ' +
            'business_states, ' +
            'business_city, ' +
            'region_of_operation, ' +
            'country_of_operation, ' +
            'states_of_operation, ' +
            'city_of_operation, ' +
            'start_operating_hour, ' +
            'end_operating_hour, ' +
            'communicator, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

    UPDATE: `UPDATE users_business SET 
            business_name = ?,
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
            city_of_operation = ?,
            start_operating_hour = ?,
            end_operating_hour = ?
            WHERE uuid = ?`,
}

module.exports = QUERY;