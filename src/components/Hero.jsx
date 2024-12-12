import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Loginpage";
import SignupPage from "./signuppage";
import SuperAdminDashboard from "./SuperAdmindashboard";
import AdminDashboard from "./AdminDashboard";
// import UserDashboard from "./UserDashboard"

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    // Check if there's a logged-in user in localStorage when the app starts
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  return (
  <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/superadmin-dashboard"
          element={<SuperAdminDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        />
        {/* <Route
          path="/User-dashboard"
          element={<UserDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
