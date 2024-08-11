
// import { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Assuming you're using React Router

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:3001/api/loginRoutes/login', { user_name: username, password });
//       console.log(response.data);
//       // Handle successful login here, e.g., storing the token, redirecting, etc.
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setError(error.response.data.error);
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
//           <p className="mt-2 text-sm text-gray-600">Welcome back! Please login to your account.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember_me"
//                 name="remember_me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
//             </div>
//             <div className="text-sm">
//               <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
//             </div>
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Sign In
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">
//             Dont have an account?{' '}
//             <Link to="/register" className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setError('');

  //   try {
  //     await login(values); 
  //     navigate('/'); 
  //   } catch (err) {
  //     setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    console.log("Submitting values:", values); 
    
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err); 
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
       
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 opacity-90 rounded-3xl shadow-lg w-full max-w-md">
   
        <h2 className="text-3xl font-bold text-center text-white mb-4">Sign In</h2>
        <p className="text-center text-gray-300 mb-6">Welcome back! Please enter your details.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-gray-200 mb-2">Username</label>
            <input
              onChange={handleInput}
              id="user_name"
              name="user_name"
              type="text"
              autoComplete="user_name"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input
              onChange={handleInput}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="text-sm text-center mb-4">
            <a href="#" className="font-semibold text-blue-400 hover:text-indigo-500">Forgot password?</a>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-sky-500 hover:text-blue-400">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
