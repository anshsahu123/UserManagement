// import React from "react";
// import { Link } from "react-router-dom";

const AdminDashboard = ({ currentUser }) => {
  // Example users (this should be fetched from your localStorage or backend)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Registered Users</h2>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-gray-600">Role</th>
                <th className="px-6 py-4 text-left text-gray-600">Registration Time</th>
                <th className="px-6 py-4 text-left text-gray-600">Login Time</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-200 border-black border-solid border-1">
                    <td className="px-6 py-4 text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.role}</td>
                    <td className="px-6 py-4 text-gray-700">{user.registrationTime}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.loginTime ? new Date(user.loginTime).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
