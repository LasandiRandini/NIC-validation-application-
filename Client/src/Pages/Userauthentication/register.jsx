// const register = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="text-center mb-6">
//           {/* <img src="/logo.png" alt="Logo" className="mx-auto w-20 h-20 mb-2" /> */}
//           <h2 className="text-3xl font-bold text-gray-900">Register</h2>
//           <p className="mt-2 text-sm text-gray-600">Create a new account</p>
//         </div>
//         <form className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default register;


// import  { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         user_name: '',
//         password: '',
//         terms: false,
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.terms) {
//             alert('You must agree to the terms and conditions');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3001/api/registerRoutes/register', formData);
//             alert(response.data.message);
//         } catch (error) {
//             alert('Registration failed: ' + error.response.data.error);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <div className="text-center mb-6">
//                     <h2 className="text-3xl font-bold text-gray-900">Register</h2>
//                     <p className="mt-2 text-sm text-gray-600">Create a new account</p>
//                 </div>
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//                         <input
//                             type="text"
//                             id="user_name"
//                             name="user_name"
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.user_name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <input
//                                 id="terms"
//                                 name="terms"
//                                 type="checkbox"
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 checked={formData.terms}
//                                 onChange={handleChange}
//                             />
//                             <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the terms and conditions</label>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;



import { useState } from 'react';
import axios from 'axios';

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
      alert('User added successfully');
      
    } catch (error) {
      
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Register</h2>
          <p className="mt-2 text-sm text-gray-600">Create a new account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
