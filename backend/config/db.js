const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Cambia esto por tu usuario de PostgreSQL
    host: 'db',
    database: 'postgres', // El nombre de la base de datos que creaste
    password: 'nilda1668', // Cambia esto por tu contraseña de PostgreSQL
    port: 5432,
});

module.exports = pool;
