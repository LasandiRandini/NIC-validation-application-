import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  ClipboardDocumentListIcon,
  CubeIcon,
  
  UserGroupIcon,
  Cog8ToothIcon,
  ArrowUturnLeftIcon,
  // BookmarkIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  InboxIcon,
  IdentificationIcon,
  ChartBarIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/solid';


const DashNav = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isWorkerDropdownOpen, setIsWorkerDropdownOpen] = useState(false);
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(() => {
    const savedState = localStorage.getItem('isJobDropdownOpen');
    return savedState === 'true';
  });
  const [activeBar, setActiveBar] = useState('dashboard');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('jwtkey');
        localStorage.removeItem('user');
        Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success').then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  const toggleDropdown = (dropdownSetter, dropdownState) => {
    setIsWorkerDropdownOpen(false);
    setIsJobDropdownOpen(false);
    dropdownSetter(!dropdownState);
  };

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setActiveBar(currentPath);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 w-64 border-r-2 border-gray-300 bg-blue-50 h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        
        {user && <p className="text-lg font-bold text-gray-700">{user.first_name} {user.last_name}</p>}
      </div>

      <div className="font-inter text-gray-800 mt-5">
        <Link to='/dashboard'>
          <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'dashboard' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 mb-2 hover:text-white'}`} onClick={() => setActiveBar('dashboard')}>
            <ClipboardDocumentListIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Dashboard</p>
          </div>
        </Link>

        {/* <Link to='/showbooking'>
          <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'showbooking' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 mb-2 hover:text-white'}`} onClick={() => setActiveBar('showbooking')}>
            <BookmarkIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Booking</p>
          </div>
        </Link> */}

        <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isJobDropdownOpen ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 mb-2 hover:text-white'}`} onClick={() => toggleDropdown(setIsJobDropdownOpen, isJobDropdownOpen)}>
          <BriefcaseIcon className='h-6 w-6' />
          <p className='text-sm font-bold'>Jobs</p>
        </div>

        {isJobDropdownOpen && (
          <div className="ml-4">
            <Link to='/openjob'>
              <div className={`flex items-center pl-8 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'openjob' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('openjob')}>
                <FolderPlusIcon className='h-5 w-5' />
                <p className='text-sm font-bold'>Open Job</p>
              </div>
            </Link>

            <Link to='/show_jobcard'>
              <div className={`flex items-center pl-8 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'show_jobcard' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('show_jobcard')}>
                <ChartBarIcon className='h-5 w-5' />
                <p className='text-sm font-bold'>Show Job Card</p>
              </div>
            </Link>

            <Link to='/finishedjobcard'>
              <div className={`flex items-center pl-8 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'finishedjobcard' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('finishedjobcard')}>
                <IdentificationIcon className='h-5 w-5' />
                <p className='text-sm font-bold'>Final Job Card</p>
              </div>
            </Link>
          </div>
        )}

        <Link to='/stock'>
          <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'stock' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('stock')}>
            <CubeIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Stock</p>
          </div>
        </Link>

        <Link to='/show_services'>
          <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'show_services' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 mb-2 hover:text-white'}`} onClick={() => setActiveBar('show_services')}>
            <WrenchScrewdriverIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Services</p>
          </div>
        </Link>

        <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isWorkerDropdownOpen ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => toggleDropdown(setIsWorkerDropdownOpen, isWorkerDropdownOpen)}>
          <UserGroupIcon className='h-6 w-6' />
          <p className='text-sm font-bold'>Workers</p>
        </div>

        {isWorkerDropdownOpen && (
          <div className="ml-4">
            <Link to='/show_workers'>
              <div className={`flex items-center pl-8 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'show_workers' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('show_workers')}>
                <IdentificationIcon className='h-5 w-5' />
                <p className='text-sm font-bold'>Employees</p>
              </div>
            </Link>

            <Link to='/ShowUsers'>
              <div className={`flex items-center pl-8 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'ShowUsers' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('ShowUsers')}>
                <InboxIcon className='h-5 w-5' />
                <p className='text-sm font-bold'>Users</p>
              </div>
            </Link>
          </div>
        )}

        <Link to='/pastjobcard'>
          <div className={`flex items-center pl-4 gap-3 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'pastjobcard' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('pastjobcard')}>
            <ChartBarIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Past Service records</p>
          </div>
        </Link>

        <Link to='/reports'>
          <div className={`flex items-center pl-4 gap-3 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'reports' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('reports')}>
            <FolderPlusIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Reports</p>
          </div>
        </Link>

        <Link to='/setting'>
          <div className={`flex items-center pl-4 gap-3 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'setting' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={() => setActiveBar('setting')}>
            <Cog8ToothIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Setting</p>
          </div>
        </Link>

        <div className="absolute bottom-4 w-full">
          <div className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeBar === 'logout' ? 'text-white mb-2 bg-blue-400' : 'hover:bg-blue-400 hover:text-white'}`} onClick={handleLogout}>
            <ArrowUturnLeftIcon className='h-6 w-6' />
            <p className='text-sm font-bold'>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;




// const UploadCSV = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-900">Upload CSV Files</h2>
//           <p className="mt-2 text-sm text-gray-600">Please upload four CSV files</p>
//         </div>
//         <form className="space-y-6">
//           <div>
//             <label htmlFor="csv1" className="block text-sm font-medium text-gray-700">CSV File 1</label>
//             <input
//               type="file"
//               id="csv1"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               accept=".csv"
//             />
//           </div>
//           <div>
//             <label htmlFor="csv2" className="block text-sm font-medium text-gray-700">CSV File 2</label>
//             <input
//               type="file"
//               id="csv2"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               accept=".csv"
//             />
//           </div>
//           <div>
//             <label htmlFor="csv3" className="block text-sm font-medium text-gray-700">CSV File 3</label>
//             <input
//               type="file"
//               id="csv3"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               accept=".csv"
//             />
//           </div>
//           <div>
//             <label htmlFor="csv4" className="block text-sm font-medium text-gray-700">CSV File 4</label>
//             <input
//               type="file"
//               id="csv4"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               accept=".csv"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Upload Files
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadCSV;


// import React, { useState } from 'react';

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState({});

//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles([...files, ...newFiles]);
//   };

//   const handleUpload = (file) => {
//     // Simulate file upload
//     setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }));
//     setTimeout(() => {
//       const success = Math.random() > 0.5; // Random success/failure
//       setUploadStatus(prev => ({ ...prev, [file.name]: success ? 'success' : 'failed' }));
//     }, 2000);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
//         <input
//           type="file"
//           multiple
//           className="hidden"
//           id="file-input"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="file-input" className="cursor-pointer text-blue-500">
//           Click here to upload your file or drag and drop.
//         </label>
//         <p className="text-sm text-gray-500">Supported Format: SVG, JPG, PNG (10mb each)</p>
//       </div>
//       <div className="mt-4 space-y-2">
//         {files.map((file) => (
//           <div key={file.name} className="flex items-center justify-between p-2 border rounded">
//             <span>{file.name}</span>
//             <button
//               onClick={() => handleUpload(file)}
//               className={`text-white py-1 px-3 rounded ${
//                 uploadStatus[file.name] === 'success' ? 'bg-green-500' : 
//                 uploadStatus[file.name] === 'failed' ? 'bg-red-500' : 'bg-blue-500'
//               }`}
//             >
//               {uploadStatus[file.name] === 'uploading' ? 'Uploading...' :
//                uploadStatus[file.name] === 'success' ? 'Success' :
//                uploadStatus[file.name] === 'failed' ? 'Failed. Try Again' : 'Upload'}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
