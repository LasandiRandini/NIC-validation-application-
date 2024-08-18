

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genderResponse, ageResponse, totalRecordsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/dashboard/gender-counts'),
          axios.get('http://localhost:5000/api/dashboard/dashboard/age-distribution'),
          axios.get('http://localhost:5000/api/dashboard/dashboard/getdetails'),
        ]);

        setGenderData(genderResponse.data);

        const transformedAgeData = ageResponse.data.reduce((acc, curr) => {
          const existingAgeRange = acc.find((item) => item.age_range === curr.age_range);
          if (existingAgeRange) {
            existingAgeRange[curr.gender.toLowerCase()] = curr.count;
          } else {
            acc.push({
              age_range: curr.age_range,
              [curr.gender.toLowerCase()]: curr.count,
            });
          }
          return acc;
        }, []);
        setAgeData(transformedAgeData);

        setTotalRecords(totalRecordsResponse.data.length);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const genderColors = {
    male: '#64B5F6',  
    female: '#F06292',  
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-600 text-center text-lg">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white border border-gray-300 rounded-lg shadow-xl">
      <p className="text-gray-800 mb-12 font-bold text-3xl text-center">Total Records: {totalRecords}</p>

      <div className="flex flex-col lg:flex-row lg:space-x-14">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={110}
                fill="#8884d8"
                dataKey="count"
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={genderColors[entry.gender.toLowerCase()]} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Age Distribution by Gender</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ageData}>
              <XAxis dataKey="age_range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill={genderColors.male} name="Male" />
              <Bar dataKey="female" fill={genderColors.female} name="Female" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
