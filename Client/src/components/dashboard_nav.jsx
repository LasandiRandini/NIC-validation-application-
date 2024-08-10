import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  ArrowUturnLeftIcon,
  ChartBarIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";

const DashNav = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(() => {
    const savedState = localStorage.getItem("isJobDropdownOpen");
    return savedState === "true";
  });
  const [activeBar, setActiveBar] = useState("dashboard");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("jwtkey");
        localStorage.removeItem("user");
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        ).then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  const toggleDropdown = (dropdownSetter, dropdownState) => {
    setIsJobDropdownOpen(false);
    dropdownSetter(!dropdownState);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setActiveBar(currentPath);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 w-64  border-r-2 border-gray-300 bg-blue-50 h-screen p-4">
      <div className="flex flex-col items-center mt-5 mb-8">
        {user && (
          <p className="text-lg font-bold text-gray-700">
            {user.first_name} {user.last_name}
          </p>
        )}
      </div>

      <div className="font-inter text-gray-800 mt-5">
        <Link to="/dashboard">
          <div
            className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeBar === "dashboard"
                ? "text-white mb-2 bg-blue-400"
                : "hover:bg-blue-400 mb-2 hover:text-white"
            }`}
            onClick={() => setActiveBar("dashboard")}
          >
            <ChartBarIcon className="h-10 w-10" />
            <p className="text-sm font-bold">Dashboard</p>
          </div>
        </Link>

        <Link to="/fileupload">
          <div
            className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isJobDropdownOpen
                ? "text-white mb-2 bg-blue-400"
                : "hover:bg-blue-400 mb-2 hover:text-white"
            }`}
            onClick={() =>
              toggleDropdown(setIsJobDropdownOpen, isJobDropdownOpen)
            }
          >
            <ClipboardDocumentListIcon className="h-10 w-10" />
            <p className="text-sm font-bold">Upload Files</p>
          </div>
        </Link>

        <Link to="/reports">
          <div
            className={`flex items-center pl-4 gap-3 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeBar === "reports"
                ? "text-white mb-2 bg-blue-400"
                : "hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => setActiveBar("reports")}
          >
            <FolderPlusIcon className="h-10 w-10" />
            <p className="text-sm font-bold">Reports</p>
          </div>
        </Link>

        <Link to="/setting">
          <div
            className={`flex items-center pl-4 gap-3 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeBar === "setting"
                ? "text-white mb-2 bg-blue-400"
                : "hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => setActiveBar("setting")}
          >
            <Cog8ToothIcon className="h-10 w-10" />
            <p className="text-sm font-bold">Setting</p>
          </div>
        </Link>

        <div className="absolute bottom-4 w-full">
          <div
            className={`flex items-center pl-4 gap-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeBar === "logout"
                ? "text-white mb-2 bg-blue-400"
                : "hover:bg-blue-400 hover:text-white"
            }`}
            onClick={handleLogout}
          >
            <ArrowUturnLeftIcon className="h-8 w-8" />
            <p className="text-sm font-bold">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
