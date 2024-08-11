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
          axios.get('http://localhost:3003/api/dashboard/gender-counts'),
          axios.get('http://localhost:3003/api/dashboard/age-distribution'),
          axios.get('http://localhost:3003/api/dashboard/getdetails'),
        ]);

        setGenderData(genderResponse.data);

        // Transform age distribution data for BarChart
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

  // Define colors for specific genders
  const genderColors = {
    male: '#0088FE', // Blue
    female: '#FF8042', // Orange
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-blue-40 border border-gray-200 rounded-lg shadow-lg">
     
      <p className="text-gray-700 mb-10 font-semibold text-2xl">Total Records: {totalRecords}</p>

      {/* Gender Distribution */}
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={genderColors[entry.gender.toLowerCase()]} // Map gender to specific color
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution by Gender */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Age Distribution by Gender</h2>
          <ResponsiveContainer width="100%" height={400}>
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