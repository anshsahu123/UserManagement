// // import React from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// const UserDashboard = ({ currentUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear the current user from localStorage
//     localStorage.removeItem("currentUser");
//     navigate("/"); // Redirect to login page
//   };

//   return (
//     <div className="flex h-screen relative">
//     {/* Sidebar */}
//     <Sidebar setCurrentUser={setCurrentUser} />
  
//     {/* Main Content */}
//     <div className="bg-gray-100 flex-1 w-screen translate-x-32 -mt-8 p-4 relative z-10">
//       <div className="min-h-screen bg-gray-100 p-4">
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">User Dashboard</h1>
//         <div className="mb-4">
//           <p><strong>Name:</strong> {currentUser.name}</p>
//           <p><strong>Email:</strong> {currentUser.email}</p>
//           <p><strong>Role:</strong> {currentUser.role}</p>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mt-4"
//         >
//           Logout
//         </button>
//       </div>
//       </div>
//       </div>
//     </div>
//   </div>
    



//   );
// };

// export default UserDashboard;


