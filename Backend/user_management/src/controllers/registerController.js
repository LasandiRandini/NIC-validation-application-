import bcrypt from 'bcryptjs';
import { create } from '../models/registerModel.js';

export const register = async (req, res) => {
    const {email, user_name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await create({ email, user_name, password: hashedPassword  });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'User registration failed' });
    }
};
