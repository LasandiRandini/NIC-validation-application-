import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import db from '../model/db.js';

// Function to validate NICs
export const validateNICs = (req, res) => {
    const { files } = req.body;
    console.log('Received files:', files);

    if (!files || files.length !== 4) {
        return res.status(400).json({ error: 'Exactly four CSV files must be provided.' });
    }

    const results = [];
    const uploadDate = new Date().toISOString(); // Current date and time in ISO format

    try {
        files.forEach((file, index) => {
            const filePath = path.resolve(file);
            console.log(`Processing file: ${filePath}`);
            const fileResults = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    console.log('Row data:', row);

                    const nicNumber = row['NIC'] || row['nic'] || row['Nic'] || row['NIC Number'] || row['nic number']; // Handle possible variations in the header name
                    console.log('Extracted NIC:', nicNumber); // Log the NIC number to ensure it's being extracted

                    if (nicNumber) {
                        const details = extractNICDetails(nicNumber, uploadDate); // Pass uploadDate to extractNICDetails
                        fileResults.push(details);
                        console.log('Processed row:', details); // Log each processed row
                    } else {
                        console.warn('NIC number not found in row:', row); // Warn if NIC number is missing
                    }
                })
                .on('end', () => {
                    results.push({
                        file: path.basename(filePath),
                        data: fileResults,
                    });

                    console.log(`Results for file ${path.basename(filePath)}:`, fileResults); // Log results for each file

                    // Once all files have been processed, send the response
                    if (index === files.length - 1) {
                        console.log('Final results:', results); // Log final results
                        res.status(200).json({ message: 'NIC validation complete.', results });
                    }
                })
                .on('error', (error) => {
                    console.error('Error processing file:', error);
                    res.status(500).json({ error: 'Failed to process the NIC files.' });
                });
        });
    } catch (error) {
        console.error('Error during NIC validation:', error);
        res.status(500).json({ error: 'Failed to process the NIC files.' });
    }
};


// const extractNICDetails = (nicNumber, uploadDate) => {
//     console.log('Extracting details for NIC:', nicNumber); // Log NIC number being processed

//     let year, dayOfYear, isFemale, birthday, age, gender;

//     if (nicNumber.length === 10 && nicNumber.endsWith('V')) {
//         // Old NIC format
//         year = '19' + nicNumber.substring(0, 2);
//         dayOfYear = parseInt(nicNumber.substring(2, 5), 10);
//     } else if (nicNumber.length === 12) {
//         // New NIC format
//         year = nicNumber.substring(0, 4);
//         dayOfYear = parseInt(nicNumber.substring(4, 7), 10);
//     } else {
//         console.warn('Invalid NIC number format:', nicNumber);
//         return null; // Or handle the invalid format as needed
//     }

//     console.log('Year:', year);
//     console.log('Day of Year:', dayOfYear);

//     isFemale = dayOfYear > 500;
//     if (isFemale) {
//         dayOfYear -= 500;
//     }

//     console.log('Adjusted Day of Year (if female):', dayOfYear);

//     // Check if the year is a leap year
//     const isLeapYear = (year) => {
//         return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
//     };

//     const leapYear = isLeapYear(parseInt(year));
//     console.log('Is Leap Year:', leapYear);

//     // Create a date object starting from January 1st and add the day of the year
//     const startDate = new Date(year, 0, 1); // Start from January 1st
//     console.log('Start Date:', startDate);

//     // Adjust the date by adding the day of the year
//     birthday = new Date(year, 0, dayOfYear);
//     console.log('Birthday:', birthday);

//     age = new Date().getFullYear() - birthday.getFullYear();
//     gender = isFemale ? 'Female' : 'Male';

//     const details = {
//         nicNumber,
//         birthday: birthday.toDateString(),
//         age,
//         gender,
//     };

//     console.log('Extracted details:', details); // Log extracted details

//     const formattedBirthday = birthday.toISOString().split('T')[0];

//     // Insert data into the database including the upload_date
//     const sql = 'INSERT INTO details (nic_number, birthday, age, gender, upload_date) VALUES (?, ?, ?, ?, ?)';
//     const values = [details.nicNumber, formattedBirthday, details.age, details.gender, uploadDate];

//     db.query(sql, values, (err, results) => {
//         if (err) {
//             console.error('Error executing query', err.stack);
//             return;
//         }
//         console.log('Data Inserted');
//     });

//     return details;
// };
const extractNICDetails = (nicNumber, uploadDate) => {
    console.log('Extracting details for NIC:', nicNumber); // Log NIC number being processed

    let year, dayOfYear, isFemale, birthday, age, gender;

    if (nicNumber.length === 10 && nicNumber.endsWith('V')) {
        // Old NIC format
        year = '19' + nicNumber.substring(0, 2);
        dayOfYear = parseInt(nicNumber.substring(2, 5), 10);
    } else if (nicNumber.length === 12) {
        // New NIC format
        year = nicNumber.substring(0, 4);
        dayOfYear = parseInt(nicNumber.substring(4, 7), 10);
    } else {
        console.warn('Invalid NIC number format:', nicNumber);
        return null; // Or handle the invalid format as needed
    }

    console.log('Year:', year);
    console.log('Day of Year:', dayOfYear);

    isFemale = dayOfYear > 500;
    if (isFemale) {
        dayOfYear -= 500;
    }

    console.log('Adjusted Day of Year (if female):', dayOfYear);

    // Create a date object starting from January 1st and add the day of the year
    const startDate = new Date(year, 0, 1); // Start from January 1st
    console.log('Start Date:', startDate);

    // Adjust the date by adding the day of the year
    birthday = new Date(year, 0, dayOfYear);
    console.log('Birthday:', birthday);

    age = new Date().getFullYear() - birthday.getFullYear();
    gender = isFemale ? 'Female' : 'Male';

    const details = {
        nicNumber,
        birthday: birthday.toISOString().split('T')[0], // Format as YYYY-MM-DD
        age,
        gender,
    };

    console.log('Extracted details:', details); // Log extracted details

    const formattedUploadDate = new Date(uploadDate).toISOString().slice(0, 19).replace('T', ' '); // Format as DATETIME

    const sql = 'INSERT INTO details (nic_number, birthday, age, gender, upload_date) VALUES (?, ?, ?, ?, ?)';
    const values = [details.nicNumber, details.birthday, details.age, details.gender, formattedUploadDate];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return;
        }
        console.log('Data Inserted');
    });

    return details;
};


// Function to get NIC details for the most recent upload
export const getNICDetails = async (req, res) => {
    const sql = `
        SELECT nic_number, birthday, age, gender
        FROM details
        WHERE upload_date = (SELECT MAX(upload_date) FROM details)
    `;

    try {
        console.log('Fetching NIC details');

        const [results] = await db.promise().query(sql);

        console.log('Database query result:', results);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching NIC details:', error.message);
        res.status(500).json({ message: 'Failed to fetch NIC details. Please try again.' });
    }
};


// import csv from 'csv-parser';
// import fs from 'fs';
// import path from 'path';
// import db from '../model/db.js';



// export const validateNICs = (req, res) => {
//     const { files } = req.body;
//     console.log('Received files:', files);

//     if (!files || files.length !== 4) {
//         return res.status(400).json({ error: 'Exactly four CSV files must be provided.' });
//     }

//     const results = [];
//     const uploadDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

//     try {
//         files.forEach((file, index) => {
//             const filePath = path.resolve(file);
//             console.log(`Processing file: ${filePath}`);
//             const fileResults = [];

//             fs.createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (row) => {
//                     console.log('Row data:', row);

//                     const nicNumber = row['NIC'] || row['nic'] || row['Nic'] || row['NIC Number'] || row['nic number']; // Handle possible variations in the header name
//                     console.log('Extracted NIC:', nicNumber); // Log the NIC number to ensure it's being extracted

//                     if (nicNumber) {
//                         const details = extractNICDetails(nicNumber, uploadDate); // Pass uploadDate to extractNICDetails
//                         fileResults.push(details);
//                         console.log('Processed row:', details); // Log each processed row
//                     } else {
//                         console.warn('NIC number not found in row:', row); // Warn if NIC number is missing
//                     }
//                 })
//                 .on('end', () => {
//                     results.push({
//                         file: path.basename(filePath),
//                         data: fileResults,
//                     });

//                     console.log(`Results for file ${path.basename(filePath)}:`, fileResults); // Log results for each file

//                     // Once all files have been processed, send the response
//                     if (index === files.length - 1) {
//                         console.log('Final results:', results); // Log final results
//                         res.status(200).json({ message: 'NIC validation complete.', results });
//                     }
//                 })
//                 .on('error', (error) => {
//                     console.error('Error processing file:', error);
//                     res.status(500).json({ error: 'Failed to process the NIC files.' });
//                 });
//         });
//     } catch (error) {
//         console.error('Error during NIC validation:', error);
//         res.status(500).json({ error: 'Failed to process the NIC files.' });
//     }
// };



// const extractNICDetails = (nicNumber, uploadDate) => {
//     console.log('Extracting details for NIC:', nicNumber); // Log NIC number being processed

//     let year, dayOfYear, isFemale, birthday, age, gender;

//     if (nicNumber.length === 10 && nicNumber.endsWith('V')) {
//         // Old NIC format
//         year = '19' + nicNumber.substring(0, 2);
//         dayOfYear = parseInt(nicNumber.substring(2, 5), 10);
//     } else if (nicNumber.length === 12) {
//         // New NIC format
//         year = nicNumber.substring(0, 4);
//         dayOfYear = parseInt(nicNumber.substring(4, 7), 10);
//     } else {
//         console.warn('Invalid NIC number format:', nicNumber);
//         return null; // Or handle the invalid format as needed
//     }

//     console.log('Year:', year);
//     console.log('Day of Year:', dayOfYear);

//     isFemale = dayOfYear > 500;
//     if (isFemale) {
//         dayOfYear -= 500;
//     }

//     console.log('Adjusted Day of Year (if female):', dayOfYear);

//     // Check if the year is a leap year
//     const isLeapYear = (year) => {
//         return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
//     };

//     const leapYear = isLeapYear(parseInt(year));
//     console.log('Is Leap Year:', leapYear);

//     // Create a date object starting from January 1st and add the day of the year
//     const startDate = new Date(year, 0, 1); // Start from January 1st
//     console.log('Start Date:', startDate);

//     // Adjust the date by adding the day of the year
//     birthday = new Date(year, 0, dayOfYear);
//     console.log('Birthday:', birthday);

//     age = new Date().getFullYear() - birthday.getFullYear();
//     gender = isFemale ? 'Female' : 'Male';

//     const details = {
//         nicNumber,
//         birthday: birthday.toDateString(),
//         age,
//         gender,
//     };

//     console.log('Extracted details:', details); // Log extracted details

//     const formattedBirthday = birthday.toISOString().split('T')[0];

//     const sql = 'INSERT INTO details (nic_number, birthday, age, gender, upload_date) VALUES (?, ?, ?, ?, ?)';
//     const values = [details.nicNumber, formattedBirthday, details.age, details.gender, uploadDate];

//     db.query(sql, values, (err, results) => {
//         if (err) {
//             console.error('Error executing query', err.stack);
//             return;
//         }
//         console.log('Data Inserted');
//     });

//     return details;
// };

// export const getNICDetails = async (req, res) => {
//     const sql = `
//         SELECT nic_number, birthday, age, gender
//         FROM details
//         WHERE upload_date = (SELECT MAX(upload_date) FROM details)
//     `;

//     try {
//         console.log('Fetching NIC details');

//         const [results] = await db.promise().query(sql);

//         console.log('Database query result:', results);

//         res.status(200).json(results);
//     } catch (error) {
//         console.error('Error fetching NIC details:', error.message);
//         res.status(500).json({ message: 'Failed to fetch NIC details. Please try again.' });
//     }
// };

// import csv from 'csv-parser';
// import fs from 'fs';
// import path from 'path';
// import db from '../model/db.js';

// export const validateNICs = (req, res) => {
//     const { files } = req.body;
//     console.log('Received files:', files);

//     if (!files || files.length !== 4) {
//         return res.status(400).json({ error: 'Exactly four CSV files must be provided.' });
//     }

//     const results = [];
//     const uploadDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

//     try {
//         Promise.all(files.map((file) => processFile(file, uploadDate)))
//             .then(() => {
//                 console.log('Final results:', results);
//                 res.status(200).json({ message: 'NIC validation complete.', results });
//             })
//             .catch((error) => {
//                 console.error('Error during NIC validation:', error);
//                 res.status(500).json({ error: 'Failed to process the NIC files.' });
//             });
//     } catch (error) {
//         console.error('Error during NIC validation:', error);
//         res.status(500).json({ error: 'Failed to process the NIC files.' });
//     }
// };

// const processFile = (file, uploadDate) => {
//     const filePath = path.resolve(file);
//     console.log(`Processing file: ${filePath}`);

//     return new Promise((resolve, reject) => {
//         const fileResults = [];

//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (row) => {
//                 console.log('Row data:', row);

//                 const nicNumber = row['NIC'] || row['nic'] || row['Nic'] || row['NIC Number'] || row['nic number'];
//                 console.log('Extracted NIC:', nicNumber);

//                 if (nicNumber) {
//                     const details = extractNICDetails(nicNumber, uploadDate);
//                     fileResults.push(details);
//                     console.log('Processed row:', details);
//                 } else {
//                     console.warn('NIC number not found in row:', row);
//                 }
//             })
//             .on('end', () => {
//                 results.push({
//                     file: path.basename(filePath),
//                     data: fileResults,
//                 });
//                 console.log(`Results for file ${path.basename(filePath)}:`, fileResults);
//                 resolve();
//             })
//             .on('error', (error) => {
//                 console.error('Error processing file:', error);
//                 reject(error);
//             });
//     });
// };

// const extractNICDetails = (nicNumber, uploadDate) => {
//     console.log('Extracting details for NIC:', nicNumber);

//     let year, dayOfYear, isFemale, birthday, age, gender;

//     if (nicNumber.length === 10 && nicNumber.endsWith('V')) {
//         // Old NIC format
//         year = '19' + nicNumber.substring(0, 2);
//         dayOfYear = parseInt(nicNumber.substring(2, 5), 10);
//     } else if (nicNumber.length === 12) {
//         // New NIC format
//         year = nicNumber.substring(0, 4);
//         dayOfYear = parseInt(nicNumber.substring(4, 7), 10);
//     } else {
//         console.warn('Invalid NIC number format:', nicNumber);
//         return null;
//     }

//     isFemale = dayOfYear > 500;
//     if (isFemale) {
//         dayOfYear -= 500;
//     }

//     const isLeapYear = (year) => {
//         return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
//     };

//     const leapYear = isLeapYear(parseInt(year));

//     const startDate = new Date(year, 0, 1);
//     birthday = new Date(year, 0, dayOfYear);

//     age = new Date().getFullYear() - birthday.getFullYear();
//     gender = isFemale ? 'Female' : 'Male';

//     const details = {
//         nicNumber,
//         birthday: birthday.toDateString(),
//         age,
//         gender,
//     };

//     console.log('Extracted details:', details);

//     const formattedBirthday = birthday.toISOString().split('T')[0];
//     const sql = 'INSERT INTO details (nic_number, birthday, age, gender, upload_date) VALUES (?, ?, ?, ?, ?)';
//     const values = [details.nicNumber, formattedBirthday, details.age, details.gender, uploadDate];

//     db.query(sql, values, (err, results) => {
//         if (err) {
//             console.error('Error executing query', err.stack);
//             return;
//         }
//         console.log('Data Inserted');
//     });

//     return details;
// };

// export const getNICDetails = async (req, res) => {
//     const sql = 'SELECT nic_number, birthday, age, gender FROM details';

//     try {
//         console.log('Fetching NIC details');

//         const [results] = await db.promise().query(sql);

//         console.log('Database query result:', results);

//         res.status(200).json(results); 
//     } catch (error) {
//         console.error('Error fetching NIC details:', error.message);
//         res.status(500).json({ message: 'Failed to fetch NIC details. Please try again.' });
//     }
// };
