const QUERY = {

    CREATE: 'INSERT INTO users_accounts (' +
            'user_id, ' +
            'contact_number, ' +
            'email_or_social_media, ' +
            'password, ' +
            'type, ' +
            'verification_code, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?, ?)',
            
}

module.exports = QUERY;