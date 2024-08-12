

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
    <div className="relative min-h-screen  flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
       
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-300 p-8 opacity-90 rounded-3xl shadow-lg w-full max-w-md">
   
        <h2 className="text-3xl font-bold text-center text-black mb-4">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please enter your details.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-gray-600 mb-2">Username</label>
            <input
              onChange={handleInput}
              id="user_name"
              name="user_name"
              type="text"
              autoComplete="user_name"
              required
              className="w-full px-3 py-2 border rounded bg-gray-400 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-00 mb-2">Password</label>
            <input
              onChange={handleInput}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border rounded bg-gray-400 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="text-sm text-center mb-4">
            <a>
            <Link to="/PasswordForgot" className="font-semibold text-blue-600 hover:text-indigo-500">Forgot password?</Link></a>
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
          <Link to="/register" className="font-semibold text-sky-600 hover:text-blue-400">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
