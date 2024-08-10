import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from 'react-router-dom';


import Login from './Pages/Userauthentication/login'
import Register from './Pages/Userauthentication/register'
import Dashboardpage from './Pages/Csv_uploadpage';
import DashNavbar from './components/dashboard_nav';




const DashLayout = () => {
  
  return (
    <div>

      <div className="flex">

        <div className="w-[256px]">

          <DashNavbar />
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Login />, },
  { path: "/register", element: <Register />, },

  // { path: "/dashboard", element: <Dashboardpage/>, },
  {
    path: "/", element: <DashLayout />,
    children: [
      { path: "/dashboard", element: <Dashboardpage />, },
    ],
  }
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />

    </div>
  )
}

export default App; // Add this line
