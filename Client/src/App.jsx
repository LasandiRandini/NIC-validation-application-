// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import { Outlet } from 'react-router-dom';


// import Login from './Pages/Userauthentication/login'
// import Register from './Pages/Userauthentication/register'
// import FileUplaod from './Pages/Csv_uploadpage';
// import DashNavbar from './components/dashboard_nav';
// import Dashboard from './Pages/dashboard';
// import Report from './Pages/report';



// const DashLayout = () => {
  
//   return (
//     <div>

//       <div className="flex">

//         <div className="w-[256px]">

//           <DashNavbar />
          
//         </div>

//         <div className="w-full">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// const router = createBrowserRouter([
//   { path: "/", element: <Login />, },
//   { path: "/register", element: <Register />, },

//   // { path: "/dashboard", element: <Dashboardpage/>, },
//   {
//     path: "/", element: <DashLayout />,
//     children: [
//       { path: "/dashboard", element: <Dashboard />, },
//       { path: "/fileupload", element: <FileUplaod />, },
//       { path: "/report", element: <Report />, },
//     ],
//   }
// ]);


// function App() {
//   return (
//     <div>
//       <RouterProvider router={router} />

//     </div>
//   )
// }

// export default App; // Add this line

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from 'react-router-dom';

import Login from './Pages/Userauthentication/login';
import Register from './Pages/Userauthentication/register';
import FileUpload from './Pages/Csv_uploadpage';
import DashNavbar from './components/dashboard_nav';
import Dashboard from './Pages/dashboard';
import Report from './Pages/report';

// Layout component for dashboard-related routes
const DashLayout = () => {
  return (
    <div className="flex">
      <div className="w-[256px]">
        <DashNavbar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

// Router configuration
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/", element: <DashLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "fileupload", element: <FileUpload /> },
      { path: "report", element: <Report /> },
    ],
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
