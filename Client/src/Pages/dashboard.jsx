import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genderResponse = await axios.get('http://localhost:3003/api/dashboard/gender-counts');
        setGenderData(genderResponse.data);

        const ageResponse = await axios.get('http://localhost:3003/api/dashboard/age-distribution');
        setAgeData(ageResponse.data);

        const totalRecordsResponse = await axios.get('http://localhost:3003/api/dashboard/getdetails');
        setTotalRecords(totalRecordsResponse.data.length);

        setSuccessMessage('Data fetched successfully.');
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard</h1>
      <p className="text-gray-600">Total Records: {totalRecords}</p>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}

      <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-700">Gender Distribution</h2>
      <PieChart width={400} height={400} className="mx-auto">
        <Pie
          data={genderData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-700">Age Distribution by Gender</h2>
      <BarChart width={600} height={300} data={ageData} className="mx-auto">
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
