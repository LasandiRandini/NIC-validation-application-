import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import db from '../model/db.js';

export const validateNICs = (req, res) => {
    const { files } = req.body;
    console.log('Received files:', files);

    if (!files || files.length !== 4) {
        return res.status(400).json({ error: 'Exactly four CSV files must be provided.' });
    }

    const results = [];

    try {
        files.forEach((file, index) => {
            const filePath = path.resolve(file);
            console.log(`Processing file: ${filePath}`);
            const fileResults = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    console.log('Row data:', row);

                    const nicNumber = row['NIC'] || row['nic'] || row['Nic']; // Handle possible variations in the header name
                    console.log('Extracted NIC:', nicNumber); // Log the NIC number to ensure it's being extracted

                    if (nicNumber) {
                        const details = extractNICDetails(nicNumber);
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

const extractNICDetails = (nicNumber) => {
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

    // Check if the year is a leap year
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const leapYear = isLeapYear(parseInt(year));
    console.log('Is Leap Year:', leapYear);

    // Create a date object starting from January 1st and add the day of the year
    const startDate = new Date(year, 0, 1); // Start from January 1st
    console.log('Start Date:', startDate);

    // Adjust the date by adding the day of the year
    // birthday = new Date(startDate.setDate(dayOfYear - 1));
    birthday = new Date(year, 0, dayOfYear);
    console.log('Birthday:', birthday);

    age = new Date().getFullYear() - birthday.getFullYear();
    gender = isFemale ? 'Female' : 'Male';

    const details = {
        nicNumber,
        birthday: birthday.toDateString(),
        age,
        gender,
    };

    console.log('Extracted details:', details); // Log extracted details

    const formattedBirthday = birthday.toISOString().split('T')[0];

    const sql = 'INSERT INTO details (nic_number, birthday, age, gender) VALUES (?, ?, ?, ?)';
    const values = [details.nicNumber, formattedBirthday, details.age, details.gender];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return;
        }
        console.log('Data Inserted');
    });



    return details;
};