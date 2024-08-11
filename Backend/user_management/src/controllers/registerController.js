// import bcrypt from 'bcryptjs';
// import { create } from '../models/registerModel.js';

// export const register = async (req, res) => {
//     const {email, user_name, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         await create({ email, user_name, password: hashedPassword  });
//         res.status(201).send({ message: 'User registered successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({ error: 'User registration failed' });
//     }
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db.js'; // Assuming db is your database connection
import { create } from '../models/registerModel.js';

const JWT_SECRET = 'your_secret_key';

export const register = async (req, res) => {
    const { email, user_name, password } = req.body;

    try {
        // Check if the username or email already exists in the database
        const checkQuery = 'SELECT * FROM user_credintial WHERE user_name = ? OR email = ?';
        const [rows] = await db.promise().execute(checkQuery, [user_name, email]);

        // If any rows are returned, the username or email is already in use
        if (rows.length > 0) {
            return res.status(409).send({ error: 'Username or email already exists' });
        }

        // If username and email are unique, proceed with registration

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const newUser = await create({ email, user_name, password: hashedPassword });

        // Generate a JWT token for the new user
        const token = jwt.sign(
            { email: newUser.email }, // Payload to include in the token
            JWT_SECRET, // Secret key to sign the token
            { expiresIn: '1h' } // Token expiration time
        );

        // Send the token and success message in the response
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        // Handle any other errors during registration
        console.error(error);
        res.status(400).send({ error: 'User registration failed' });
    }
};
