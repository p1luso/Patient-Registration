const { Pool } = require('pg');

const pool = new Pool({
    user: 'patient_user', 
    host: 'db',          
    database: 'patient_db', 
    password: 'patient_password', 
    port: 5432,           
});

module.exports = pool;