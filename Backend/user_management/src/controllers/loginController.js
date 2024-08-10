// import bcrypt from 'bcryptjs';
// import { findUserByUsername } from '../models/loginModel.js';

// export const login = async (req, res) => {
//     const { user_name, password } = req.body;

//     try {
//         const user = await findUserByUsername(user_name);
//         console.log('User:', user);
//         if (!user) {
//             return res.status(400).send({ error: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

//         res.status(200).send({ message: 'Login successful' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: 'Server error' });
//     }
// };



// import bcrypt from 'bcryptjs';
// import db from '../models/db.js';  // Import the database connection

// export const login = async (req, res) => {
//     const { user_name, password } = req.body;

//     try {
//         // SQL query to find the user by username
//         const query = 'SELECT * FROM user_credintial WHERE user_name = ?';
//         const rows = await db.execute(query, [user_name]);

//         if (rows.length === 0) {
//             return res.status(400).send({ error: 'User not found' });
//         }

//         const user = rows[0];

//         // Compare the provided password with the hashed password stored in the database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

//         res.status(200).send({ message: 'Login successful' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: 'Server error' });
//     }
// };



// import bcrypt from 'bcryptjs';
// import db from '../models/db.js'; // Import the database connection

// export const login = async (req, res) => {
//     const { user_name, password } = req.body;

//     try {
//         console.log('Login request:', { user_name, password });
//         // SQL query to find the user by username
//         const query = 'SELECT * FROM user_credintial WHERE user_name = ?';
//         const [rows] = await db.execute(query, [user_name]);

//         if (rows.length === 0) {
//             return res.status(400).send({ error: 'User not found' });
//         }

//         const user = rows[0]; // rows[0] should have the user object

//         // Check if user is defined and has a password
//         if (!user || !user.password) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

//         res.status(200).send({ message: 'Login successful' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: 'Server error' });
//     }
// };

import bcrypt from 'bcryptjs';
import db from '../models/db.js'; // Import the database connection

export const login = async (req, res) => {
    const { user_name, password } = req.body;

    try {
        console.log('Login request:', { user_name, password });

        // SQL query to find the user by username
        const query = 'SELECT * FROM user_credintial WHERE user_name = ?';
        const [rows] = await db.promise().execute(query, [user_name]);

        // Log the result to debug the issue
        console.log('Database query result:', rows);

        if (rows.length === 0) {
            return res.status(400).send({ error: 'User not found' });
        }

        const user = rows[0]; // rows[0] should have the user object

        // Check if user is defined and has a password
        if (!user || !user.password) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        res.status(200).send({ message: 'Login successful' });
        console.log('Login successful');
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).send({ error: 'Internal server error' });
    }
};