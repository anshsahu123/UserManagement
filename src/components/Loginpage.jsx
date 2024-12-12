import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const predefinedUsers = [
    { email: "superadmin.com", password: "123", role: "superadmin" },
    { email: "admin.com", password: "admin123", role: "admin" }
  ];

  const handleLogin = () => {
    // First check predefined users (superadmin, admin)
    const foundUser = predefinedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      if (foundUser.role === "superadmin") {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } else {
      // Now check for registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
      const registeredUser = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (registeredUser) {
        setCurrentUser(registeredUser);
        localStorage.setItem("currentUser", JSON.stringify(registeredUser));
        navigate("/user-dashboard");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
