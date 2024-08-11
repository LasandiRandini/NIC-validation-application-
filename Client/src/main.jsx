import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AuthContextProvider } from './Pages/context/authContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
);
