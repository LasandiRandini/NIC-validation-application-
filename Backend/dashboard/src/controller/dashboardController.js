import db from '../model/db.js';

export const getAllDetails = async (req, res) => {
    const sql = 'SELECT age, birth_day, gender FROM details';

    try {
        const [results] = await db.query(sql);
        res.status(200).send(results);
    } catch (error) {
        console.error('Error fetching all details:', error.message);
        res.status(500).send({ message: 'Failed to fetch details. Please try again.' });
    }
};

export const getGenderCounts = async (req, res) => {
    const sql = 'SELECT gender, COUNT(*) as count FROM details GROUP BY gender';

    try {
        const [results] = await db.query(sql);
        res.status(200).send(results);
    } catch (error) {
        console.error('Error fetching gender counts:', error.message);
        res.status(500).send({ message: 'Failed to fetch gender counts. Please try again.' });
    }
};


export const getAgeDistribution = async (req, res) => {
    const sql = 'SELECT age, gender, COUNT(*) as count FROM details GROUP BY age, gender';

    try {
        const [results] = await db.query(sql);
        res.status(200).send(results);
    } catch (error) {
        console.error('Error fetching age distribution:', error.message);
        res.status(500).send({ message: 'Failed to fetch age distribution. Please try again.' });
    }
};
