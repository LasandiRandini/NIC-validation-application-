
// import { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     try {
//       await axios.post('http://localhost:3001/api/passwordRoutes/reset-password', { token, newPassword });
//       setMessage('Password has been reset successfully. You can now log in with your new password.');
//     } catch (err) {
//       setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label>New Password</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default ResetPassword;

import { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:3001/api/passwordRoutes/reset-password', { token, newPassword });
      setMessage('Password has been reset successfully. You can now log in with your new password.');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          {message && (
            <div className="text-center mt-4">
              <p className="text-green-600">{message}</p>
              <Link
                to="/"
                className="block mt-4 text-indigo-600 hover:text-indigo-700"
              >
                Go to Sign In
              </Link>
            </div>
          )}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
