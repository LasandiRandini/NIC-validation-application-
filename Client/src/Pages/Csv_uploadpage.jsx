// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   const onDrop = (acceptedFiles) => {
//     if (acceptedFiles.length !== 4) {
//       setErrorMessage('Please upload exactly four CSV files.');
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
//     files.forEach((file, index) => {
//       formData.append(`file${index + 1}`, file);
//     });

//     try {
//       const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Files uploaded successfully:', response.data);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
//       <div
//         {...getRootProps({
//           className: `border-2 border-dashed p-8 rounded-md text-center cursor-pointer transition-colors duration-300 ${
//             isDragActive
//               ? 'border-blue-400 bg-blue-50'
//               : 'border-gray-300 bg-gray-100'
//           }`,
//         })}
//       >
//         <input {...getInputProps()} />
//         <p className="text-gray-600">
//           {isDragActive
//             ? 'Drop the files here...'
//             : 'Drag & drop exactly four CSV files here, or click to select files'}
//         </p>
//       </div>
//       {errorMessage && (
//         <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//       )}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2 text-gray-700">Selected Files:</h4>
//         <ul className="list-disc list-inside text-gray-600">
//           {files.map((file, index) => (
//             <li key={index}>{file.name}</li>
//           ))}
//         </ul>
//       </div>
//       <button
//         onClick={handleUpload}
//         disabled={files.length !== 4}
//         className={`mt-6 w-full py-3 px-4 rounded-md font-semibold transition-colors duration-300 ${
//           files.length === 4
//             ? 'bg-blue-500 text-white hover:bg-blue-600'
//             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         }`}
//       >
//         Upload Files
//       </button>
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

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 4) {
      setErrorMessage('Please upload exactly four CSV files.');
      setSuccessMessage(''); // Clear any success message
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
    files.forEach((file, index) => {
      formData.append('files', file); // Ensure the key is 'files' to match multer's array field
    });

    try {
      const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
      setSuccessMessage('Files uploaded and sent for validation successfully.');
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error('Error uploading files:', error);
      setErrorMessage('Failed to upload files. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div
        {...getRootProps({
          className: `border-2 border-dashed p-8 rounded-md text-center cursor-pointer transition-colors duration-300 ${
            isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-100'
          }`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop exactly four CSV files here, or click to select files'}
        </p>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2 text-gray-700">Selected Files:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleUpload}
        disabled={files.length !== 4}
        className={`mt-6 w-full py-3 px-4 rounded-md font-semibold transition-colors duration-300 ${
          files.length === 4
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;






