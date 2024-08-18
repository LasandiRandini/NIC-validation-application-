// import { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     user_name: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3001/api/registerRoutes/register', { ...formData });
//       console.log('User added:', response.data);

//       Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful',
//         text: 'User added successfully',
//       });

//     } catch (error) {
//       console.error('Error adding user:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: error.response?.data?.error || 'An error occurred during registration',
//       });
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center  ">
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
//       >
//         <div className="absolute top-0 left-0 w-full h-full opacity-70  "></div>
//       </div>
//       <div className="relative z-10 bg-gray-300 p-8 opacity-90 rounded-3xl shadow-lg w-full max-w-md">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-black">Register</h2>
//           <p className="mt-2 text-sm text-gray-600">Create a new account</p>
//         </div>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full px-3 py-2 bg-gray-400 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="user_name" className="block text-sm font-medium text-gray-600">Username</label>
//             <input
//               type="text"
//               id="user_name"
//               name="user_name"
//               className="mt-1 block w-full px-3 py-2 bg-gray-400 border 0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={formData.user_name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="mt-1 block w-full px-3 py-2 bg-gray-400 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-500">
//             Already have an account?{' '}
//             <Link to="/" className="text-blue-600 hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
//import "../App.css"; 
import CLASS from '../images/back.png';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    user_name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/registerRoutes/register', { ...formData });
      console.log('User added:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'User added successfully',
      });

    } catch (error) {
      console.error('Error adding user:', error);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.error || 'An error occurred during registration',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${CLASS})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 opacity-70 rounded-3xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Register</h2>
          <p className="mt-2 text-sm text-gray-400">Create a new account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-200">Username</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
