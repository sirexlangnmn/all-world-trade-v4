const QUERY = {

    CREATE: 'INSERT INTO users_address (' +
            'user_id, ' +
            'address, ' +
            'country, ' +
            'state_or_province, ' +
            'city, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?)',
            
}

module.exports = QUERY;