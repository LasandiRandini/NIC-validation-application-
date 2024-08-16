

// import { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setLoading(true);

//     try {
//       await axios.post('http://localhost:3001/api/passwordRoutes/forgot-password', { email });
//       setMessage('Password reset email sent. Please check your inbox.');
//     } catch (err) {
//       setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//         {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
//         {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// import { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setLoading(true);

//     // Gmail validation using regex
//     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     if (!gmailRegex.test(email)) {
//       setError('Please enter a valid Gmail address.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post('http://localhost:3001/api/passwordRoutes/forgot-password', { email });
//       setMessage('Password reset email sent. Please check your inbox.');
//     } catch (err) {
//       setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter your Gmail address"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//         {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
//         {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Gmail validation using regex
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      setError('Please enter a valid Gmail address.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/user/passwordRoutes/forgot-password', { email });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-300 p-8 opacity-90 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-black mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your Gmail address to reset your password.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              onChange={handleInput}
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded bg-gray-400 text-white focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your Gmail address"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
          {message && <div className="text-green-500 text-center mt-2">{message}</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
