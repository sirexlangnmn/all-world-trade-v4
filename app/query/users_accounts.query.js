const QUERY = {

    CREATE: 'INSERT INTO users_accounts (' +
            'user_id, ' +
            'social_media_contact_type, ' +
            'contact_number, ' +
            'email_or_social_media, ' +
            'password, ' +
            'type, ' +
            'verification_code, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?, ?, ?)',
            
}

module.exports = QUERY;