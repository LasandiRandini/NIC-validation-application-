// import db from './db.js';

// export const create = async (user) => {
//     const { email, user_name, password } = user;
//     const query = 'INSERT INTO user_credintial (email, user_name, password) VALUES (?, ?, ?)';
//     const values = [email, user_name, password];

//     try {
//         const result = await db.execute(query, values);
//         return result;
//     } catch (error) {
//         console.error('Database insertion error:', error.message);
        
//     }
// };

import db from './db.js';

export const create = async (user) => {
    let { email, user_name, password } = user;

    // Log the values to identify any undefined values
    console.log('Values before insertion:', { email, user_name, password });

    // Validate that required fields are not null or undefined
    if (!email || !user_name || !password) {
        throw new Error('Missing required fields: email, user_name, and password must be provided');
    }

    const query = 'INSERT INTO user_credintial (email, user_name, password) VALUES (?, ?, ?)';
    const values = [email, user_name, password];

    try {
        const result = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error('Database insertion error:', error.message);
        throw error; // Re-throw the error after logging it
    }
};