// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { CSVLink } from 'react-csv';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';

// const Dashboard = () => {
//   const [detailsData, setDetailsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [genderFilter, setGenderFilter] = useState('');
//   const [yearFilter, setYearFilter] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3007/api/report/getdetails');
//         setDetailsData(response.data);
//         setFilteredData(response.data);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let filtered = detailsData;

//     if (genderFilter) {
//       filtered = filtered.filter(detail => detail.gender.toLowerCase() === genderFilter.toLowerCase());
//     }

//     if (yearFilter) {
//       filtered = filtered.filter(detail => new Date(detail.birthday).getFullYear().toString() === yearFilter);
//     }

//     setFilteredData(filtered);
//   }, [genderFilter, yearFilter, detailsData]);

//   const handleDownloadCSV = () => {
//     const csvData = filteredData.map(detail => ({
//       Age: detail.age,
//       Birthday: new Date(detail.birthday).toLocaleDateString(),
//       Gender: detail.gender
//     }));
//     return csvData;
//   };

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredData.map(detail => ({
//       Age: detail.age,
//       Birthday: new Date(detail.birthday).toLocaleDateString(),
//       Gender: detail.gender
//     })));
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(data, "details.xlsx");
//   };

//   const handleDownloadPDF = () => {
//     import('jspdf').then(jsPDF => {
//       const doc = new jsPDF.default();
//       let rowHeight = 10;
//       doc.text("Details", 10, 10);
//       filteredData.forEach((detail, index) => {
//         doc.text(`Age: ${detail.age}, Birthday: ${new Date(detail.birthday).toLocaleDateString()}, Gender: ${detail.gender}`, 10, 20 + index * rowHeight);
//       });
//       doc.save("details.pdf");
//     });
//   };

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      

   
//       <div className="flex mb-4 space-x-4">
//         <select
//           className="p-2 border border-gray-300 rounded-md"
//           value={genderFilter}
//           onChange={e => setGenderFilter(e.target.value)}
//         >
//           <option value="">All Genders</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>

//         <input
//           type="text"
//           className="p-2 border border-gray-300 rounded-md"
//           placeholder="Enter Birth Year"
//           value={yearFilter}
//           onChange={e => setYearFilter(e.target.value)}
//         />
//       </div>

    
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//         <thead>
//           <tr>
//           <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">NIC Number</th>
//             <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Age</th>
//             <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Birthday</th>
//             <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((detail, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4 border-b text-gray-700">{detail.nic_number}</td>
//               <td className="py-2 px-4 border-b text-gray-700">{detail.age}</td>
//               <td className="py-2 px-4 border-b text-gray-700">{new Date(detail.birthday).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b text-gray-700">{detail.gender}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Download Buttons */}
//       <div className="mt-4 flex space-x-4">
//         <CSVLink data={handleDownloadCSV()} filename={"details.csv"} className="p-2 bg-blue-500 text-white rounded-md">Download CSV</CSVLink>
//         <button onClick={handleDownloadExcel} className="p-2 bg-green-500 text-white rounded-md">Download Excel</button>
//         <button onClick={handleDownloadPDF} className="p-2 bg-red-500 text-white rounded-md">Download PDF</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [detailsData, setDetailsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genderFilter, setGenderFilter] = useState('');
  const [yearFilterFrom, setYearFilterFrom] = useState('');
  const [yearFilterTo, setYearFilterTo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3007/api/report/report/getdetails');
        setDetailsData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = detailsData;

    if (genderFilter) {
      filtered = filtered.filter(detail => detail.gender.toLowerCase() === genderFilter.toLowerCase());
    }

    if (yearFilterFrom && yearFilterTo) {
      filtered = filtered.filter(detail => {
        const birthYear = new Date(detail.birthday).getFullYear();
        return birthYear >= parseInt(yearFilterFrom) && birthYear <= parseInt(yearFilterTo);
      });
    } else if (yearFilterTo) {
      filtered = filtered.filter(detail => {
        const birthYear = new Date(detail.birthday).getFullYear();
        return birthYear <= parseInt(yearFilterTo);
      });
    }

    setFilteredData(filtered);
  }, [genderFilter, yearFilterFrom, yearFilterTo, detailsData]);

  const handleDownloadCSV = () => {
    const csvData = filteredData.map(detail => ({
      Age: detail.age,
      Birthday: new Date(detail.birthday).toLocaleDateString(),
      Gender: detail.gender
    }));
    return csvData;
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(detail => ({
      Age: detail.age,
      Birthday: new Date(detail.birthday).toLocaleDateString(),
      Gender: detail.gender
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, "details.xlsx");
  };

  const handleDownloadPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.default();
      let rowHeight = 10;
      doc.text("Details", 10, 10);
      filteredData.forEach((detail, index) => {
        doc.text(`Age: ${detail.age}, Birthday: ${new Date(detail.birthday).toLocaleDateString()}, Gender: ${detail.gender}`, 10, 20 + index * rowHeight);
      });
      doc.save("details.pdf");
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex mb-4 space-x-4">
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="From Birth Year"
          value={yearFilterFrom}
          onChange={e => setYearFilterFrom(e.target.value)}
        />

        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="To Birth Year"
          value={yearFilterTo}
          onChange={e => setYearFilterTo(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">NIC Number</th>
            <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Age</th>
            <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Birthday</th>
            <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-700">Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((detail, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-gray-700">{detail.nic_number}</td>
              <td className="py-2 px-4 border-b text-gray-700">{detail.age}</td>
              <td className="py-2 px-4 border-b text-gray-700">{new Date(detail.birthday).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-gray-700">{detail.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex space-x-4">
        <CSVLink data={handleDownloadCSV()} filename={"details.csv"} className="p-2 bg-blue-500 text-white rounded-md">Download CSV</CSVLink>
        <button onClick={handleDownloadExcel} className="p-2 bg-green-500 text-white rounded-md">Download Excel</button>
        <button onClick={handleDownloadPDF} className="p-2 bg-red-500 text-white rounded-md">Download PDF</button>
      </div>
    </div>
  );
};

export default Dashboard;
