import mysql2 from 'mysql2';

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'LaRa@2001',
    database: 'nic_validationapp'
});

export default db; 