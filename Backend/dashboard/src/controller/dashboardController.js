import db from '../model/db.js'; 


export const getAllDetails = async (req, res) => {
    const sql = 'SELECT age, birthday, gender FROM details';

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


export const getGenderCounts = async (req, res) => {
    const sql = 'SELECT gender, COUNT(*) AS count FROM details GROUP BY gender';

    try {
        console.log('Fetching gender counts');

        const [results] = await db.promise().query(sql);

        console.log('Database query result:', results);

        res.status(200).json(results); 
    } catch (error) {
        console.error('Error fetching gender counts:', error.message);
        res.status(500).json({ message: 'Failed to fetch gender counts. Please try again.' });
    }
};


export const getAgeDistribution = async (req, res) => {
    
    const sql = `
        SELECT 
            CASE 
                WHEN age BETWEEN 0 AND 10 THEN '0-10'
                WHEN age BETWEEN 11 AND 20 THEN '11-20'
                WHEN age BETWEEN 21 AND 30 THEN '21-30'
                WHEN age BETWEEN 31 AND 40 THEN '31-40'
                WHEN age BETWEEN 41 AND 50 THEN '41-50'
                WHEN age BETWEEN 51 AND 60 THEN '51-60'
                WHEN age BETWEEN 61 AND 70 THEN '61-70'
                WHEN age BETWEEN 71 AND 80 THEN '71-80'
                ELSE '81+' 
            END AS age_range,
            gender,
            COUNT(*) AS count
        FROM details
        GROUP BY age_range, gender
        ORDER BY age_range;
    `;

    try {
        console.log('Fetching age distribution by ranges');

        const [results] = await db.promise().query(sql);

        console.log('Database query result:', results);

        res.status(200).json(results); 
    } catch (error) {
        console.error('Error fetching age distribution:', error.message);
        res.status(500).json({ message: 'Failed to fetch age distribution. Please try again.' });
    }
};
