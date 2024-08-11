import db from '../model/db.js';

export const getAllDetails = async (req, res) => {
    const sql = 'SELECT nic_number,age, birthday, gender FROM details';

    try {
        console.log('Fetching all details');

        const [results] = await db.promise().query(sql);

        console.log('Database query result:', results);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching all details:', error.message);
        res.status(500).json({ message: 'Failed to fetch details. Please try again.' });
    }
};
