
// import bcrypt from 'bcryptjs';
// import db from '../models/db.js'; 

// export const login = async (req, res) => {
//     const { user_name, password } = req.body;

//     try {
//         console.log('Login request:', { user_name, password });

   
//         const query = 'SELECT * FROM user_credintial WHERE user_name = ?';
//         const [rows] = await db.promise().execute(query, [user_name]);

       
//         console.log('Database query result:', rows);

//         if (rows.length === 0) {
//             return res.status(400).send({ error: 'User not found' });
//         }

//         const user = rows[0]; 

       
//         if (!user || !user.password) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

       
//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             return res.status(400).send({ error: 'Invalid credentials' });
//         }

//         res.status(200).send({ message: 'Login successful' });
//         console.log('Login successful');
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         return res.status(500).send({ error: 'Internal server error' });
//     }
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';

const JWT_SECRET = 'your_secret_key';

export const login = async (req, res) => {
    const { user_name, password } = req.body;

    try {
        console.log('Login request:', { user_name, password });

        // Query the database to find the user by username
        const query = 'SELECT * FROM user_credintial WHERE user_name = ?';
        const [rows] = await db.promise().execute(query, [user_name]);

        console.log('Database query result:', rows);

        if (rows.length === 0) {
            return res.status(400).send({ error: 'User not found' });
        }

        const user = rows[0]; 

       
        if (!user || !user.password) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        
        const token = jwt.sign(
            { user_id: user.user_id, user_name: user.user_name }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        
        res.status(200).send({ message: 'Login successful', token });
        console.log('Login successful');
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).send({ error: 'Internal server error' });
    }
};
