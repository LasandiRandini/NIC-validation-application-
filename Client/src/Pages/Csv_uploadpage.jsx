



// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [uploadedDetails, setUploadedDetails] = useState([]);

//   const onDrop = (acceptedFiles) => {
//     setSuccessMessage('');
//     if (acceptedFiles.length < 4) {
//       setErrorMessage('Please upload at least four CSV files.');
//       return;
//     }
//     setFiles(acceptedFiles);
//     setErrorMessage('');
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: '.csv',
//     multiple: true,
//   });

//   const handleUpload = async () => {
//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append('files', file);
//     });

//     try {
//       const response = await axios.post('http://localhost:5000/api/fileupload/files/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccessMessage('Files uploaded and sent for validation successfully.');
//       setUploadedDetails(response.data.data.results || []);
//       setFiles([]);
//     } catch (error) {
//       console.log('Error:', error);
//       setErrorMessage('Failed to upload files. Please try again.');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     date.setDate(date.getDate() - 1);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-6">
    
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        
//       >
//         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
//       </div>

//       <div className="relative w-full max-w-2xl bg-gray-800 bg-opacity-90 border rounded-3xl shadow-xl p-8">
//         {/* Background behind the upload area */}
//         <div 
//           className="p-8 rounded-md" 
//           style={{ 
//             backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div
//             {...getRootProps({
//               className: `border-2 border-dashed p-8 rounded-md text-center cursor-pointer transition-colors duration-300 ${
//                 isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-600 bg-gray-700'
//               }`,
//               'aria-label': 'File drop area',
//             })}
//           >
//             <input {...getInputProps()} aria-label="File input" />
//             <p className="text-gray-300">
//               {isDragActive ? 'Drop the files here...' : 'Drag & drop at least four CSV files here, or click to select files'}
//             </p>
//           </div>
//           {errorMessage && (
//             <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
//           )}
//           {successMessage && (
//             <p className="text-green-500 text-sm mt-4">{successMessage}</p>
//           )}
//           <div className="mt-6">
//             <h4 className="text-lg font-semibold mb-2 text-gray-200">Selected Files:</h4>
//             <ul className="list-disc list-inside text-gray-300">
//               {files.map((file, index) => (
//                 <li key={index}>{file.name}</li>
//               ))}
//             </ul>
//           </div>
//           <button
//             onClick={handleUpload}
//             disabled={files.length < 4}
//             className={`mt-6 w-full py-3 px-4 rounded-full font-semibold transition-colors duration-300 ${
//               files.length >= 4 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
//             }`}
//             aria-label="Upload files button"
//           >
//             Upload Files
//           </button>

//           {uploadedDetails.length > 0 && (
//             <div className="mt-8">
//               <h4 className="text-lg font-semibold mb-4 text-gray-200">Uploaded CSV Details:</h4>
//               {uploadedDetails.map((fileDetail, index) => (
//                 <div key={index} className="mb-6">
//                   <h5 className="text-md font-semibold text-gray-300 mb-2">{fileDetail.file}</h5>
//                   <ul className="list-disc list-inside text-gray-400">
//                     {fileDetail.data && fileDetail.data.map((detail, detailIndex) => (
//                       <li key={detailIndex} className="mb-1">
//                         <span className="font-semibold">NIC:</span> {detail.nicNumber}, 
//                         <span className="font-semibold"> Birthday:</span> {formatDate(detail.birthday)}, 
//                         <span className="font-semibold"> Age:</span> {detail.age}, 
//                         <span className="font-semibold"> Gender:</span> {detail.gender}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadedDetails, setUploadedDetails] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSuccessMessage('');
    if (acceptedFiles.length < 4) {
      setErrorMessage('Please upload at least four CSV files.');
      return;
    }
    setFiles(acceptedFiles);
    setErrorMessage('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv',
    multiple: true,
  });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/fileupload/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Files uploaded and sent for validation successfully.');
      setUploadedDetails(response.data.data.results || []);
      setFiles([]);
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Failed to upload files. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className=" min-h-screen flex items-center justify-center p-6 bg-gray-800">
     
      <div className="relative w-full max-w-2xl bg-gray-700 bg-opacity-80 border border-gray-600 rounded-3xl shadow-xl p-8">
        <div 
          className="p-8 rounded-md" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', // Lightening the background color
          }}
        >
          <div
            {...getRootProps({
              className: `border-2 border-dashed p-8 rounded-md text-center cursor-pointer transition-colors duration-300 ${
                isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-500 bg-gray-600'
              }`,
              'aria-label': 'File drop area',
            })}
          >
            <input {...getInputProps()} aria-label="File input" />
            <p className="text-gray-300">
              {isDragActive ? 'Drop the files here...' : 'Drag & drop at least four CSV files here, or click to select files'}
            </p>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-200">Selected Files:</h4>
            <ul className="list-disc list-inside text-gray-300">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleUpload}
            disabled={files.length < 4}
            className={`mt-6 w-full py-3 px-4 rounded-full font-semibold transition-colors duration-300 ${
              files.length >= 4 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Upload files button"
          >
            Upload Files
          </button>

          {uploadedDetails.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Uploaded CSV Details:</h4>
              {uploadedDetails.map((fileDetail, index) => (
                <div key={index} className="mb-6">
                  <h5 className="text-md font-semibold text-gray-300 mb-2">{fileDetail.file}</h5>
                  <ul className="list-disc list-inside text-gray-400">
                    {fileDetail.data && fileDetail.data.map((detail, detailIndex) => (
                      <li key={detailIndex} className="mb-1">
                        <span className="font-semibold">NIC:</span> {detail.nicNumber}, 
                        <span className="font-semibold"> Birthday:</span> {formatDate(detail.birthday)}, 
                        <span className="font-semibold"> Age:</span> {detail.age}, 
                        <span className="font-semibold"> Gender:</span> {detail.gender}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
