import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setCurrentUser, onOpenForm, onManageUsers, onManageClients, onManageProducts, ondashboard }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName); // Toggle dropdown
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-cyan-600 text-white z-40">
      <div className="p-4 text-lg font-bold border-b border-gray-800">
        Super Admin Dashboard
      </div>
      <ul className="mt-4 space-y-2 text-left text-lg">
        <li className="p-2 hover:bg-gray-800 cursor-pointer" onClick={ondashboard}>Dashboard</li>

        <li>
          <div
            className="p-2 flex justify-between items-center hover:bg-gray-800 cursor-pointer"
            onClick={() => toggleDropdown("users")}
          >
            <span>Users</span>
            <span>{openDropdown === "users" ? "▲" : "▼"}</span>
          </div>
          {openDropdown === "users" && (
            <ul className="mx-5 mt-2 space-y-1 bg-gray-800 rounded-md">
              <li
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => onOpenForm("registerUser")}
              >
                Register User
              </li>
              <li
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={onManageUsers}
              >
                Manage user
              </li>
            </ul>
          )}
        </li>

        <li>
          <div
            className="p-2 flex justify-between items-center hover:bg-gray-800 cursor-pointer"
            onClick={() => toggleDropdown("clients")}
          >
            <span>Clients</span>
            <span>{openDropdown === "clients" ? "▲" : "▼"}</span>
          </div>
          {openDropdown === "clients" && (
            <ul className="mx-5 mt-2 space-y-1 bg-gray-800 rounded-md">
              <li
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => onOpenForm("registerClient")}
              >
                Register Client
              </li>
              <li className="p-2 hover:bg-gray-600 cursor-pointer" onClick={onManageClients}>Manage Client</li>
            </ul>
          )}
        </li>

        <li>
          <div
            className="p-2 flex justify-between items-center hover:bg-gray-800 cursor-pointer"
            onClick={() => toggleDropdown("products")}
          >
            <span>Products</span>
            <span>{openDropdown === "products" ? "▲" : "▼"}</span>
          </div>
          {openDropdown === "products" && (
            <ul className="mx-5 mt-2 space-y-1 bg-gray-800 rounded-md">
              <li
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => onOpenForm("registerProduct")}
              >
                Register Product
              </li>
              <li className="p-2 hover:bg-gray-600 cursor-pointer" onClick={onManageProducts}>Manage Product</li>
            </ul>
          )}
        </li>

        <li
          className="p-2 hover:bg-gray-800 cursor-pointer"
          onClick={() => setLogoutPopupOpen(true)}
        >
          Logout
        </li>
      </ul>

      {isLogoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4 text-black">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLogoutPopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setLogoutPopupOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
