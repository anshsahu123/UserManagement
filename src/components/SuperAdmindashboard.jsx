import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import RegisterForm from "./RegisterForm";

const SuperAdminDashboard = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("dashboard");
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem("users")) || [];

    // Deduplicate and filter data
    const uniqueData = removeDuplicates(storedData);
    const filteredUsers = uniqueData.filter((user) => user.role.toLowerCase() === "user");
    const filteredClients = uniqueData.filter((user) => user.role.toLowerCase() === "client");
    const filteredProducts = uniqueData.filter((user) => user.role.toLowerCase() === "product");

    setUsers(filteredUsers);
    setClients(filteredClients);
    setProducts(filteredProducts);
  }, [currentUser, navigate]);

  const removeDuplicates = (data) => {
    const uniqueEmails = new Set();
    return data.filter((item) => {
      if (uniqueEmails.has(item.email)) {
        return false;
      }
      uniqueEmails.add(item.email);
      return true;
    });
  };

  const saveToLocalStorage = (updatedData) => {
    const uniqueData = removeDuplicates(updatedData);
    localStorage.setItem("users", JSON.stringify(uniqueData));

    const filteredUsers = uniqueData.filter((user) => user.role.toLowerCase() === "user");
    const filteredClients = uniqueData.filter((user) => user.role.toLowerCase() === "client");
    const filteredProducts = uniqueData.filter((user) => user.role.toLowerCase() === "product");

    setUsers(filteredUsers);
    setClients(filteredClients);
    setProducts(filteredProducts);
  };

  const handleDelete = (email, type) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!isConfirmed) return;

    const updatedData = JSON.parse(localStorage.getItem("users")) || [];
    const filteredData = updatedData.filter((user) => user.email !== email);
    saveToLocalStorage(filteredData);
  };

  const handleOpenForm = (formType) => {
    setModalContent(formType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = Object.fromEntries(formData.entries());
  
    // Input validation for all modal types
    if (modalContent === "registerUser" || modalContent === "registerClient") {
      if (!newEntry.address || newEntry.address.length < 5) {
        alert("Address must be at least 5 characters long.");
        return;
      }
  
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(newEntry.mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
  
      const pinCodeRegex = /^[0-9]{6}$/;
      if (!pinCodeRegex.test(newEntry.pinCode)) {
        alert("Please enter a valid 6-digit pin code.");
        return;
      }
    }
  
    if (modalContent === "registerProduct") {
      if (!newEntry.price || isNaN(newEntry.price) || Number(newEntry.price) <= 0) {
        alert("Price must be a valid positive number.");
        return;
      }
  
      if (!newEntry.productDescription || newEntry.productDescription.length < 10) {
        alert("Product description must be at least 10 characters long.");
        return;
      }
  
      if (!newEntry.productQuantity || isNaN(newEntry.productQuantity) || Number(newEntry.productQuantity) <= 0) {
        alert("Product quantity must be a valid positive number.");
        return;
      }
  
      if (!newEntry.productCategory || newEntry.productCategory === "") {
        alert("Please select a valid product category.");
        return;
      }
    }
  
    // Retrieve existing data from localStorage
    const updatedData = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check for duplicate email (only for users and clients)
    if ((modalContent === "registerUser" || modalContent === "registerClient") &&
      updatedData.some((entry) => entry.email === newEntry.email)) {
      alert("This email is already registered!");
      return;
    }
  
    // Check for duplicate mobile number (only for users and clients)
    if ((modalContent === "registerUser" || modalContent === "registerClient") &&
      updatedData.some((entry) => entry.mobile === newEntry.mobile)) {
      alert("This mobile number is already registered!");
      return;
    }
  
    // Determine the role based on modalContent
    const role =
      modalContent === "registerProduct"
        ? "product"
        : modalContent === "registerClient"
        ? "client"
        : "user";
  
    // Save the new entry with its role
    const newData = [...updatedData, { ...newEntry, role }];
    saveToLocalStorage(newData);
  
    handleCloseModal();
  };
  
  



  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <Sidebar
        setCurrentUser={setCurrentUser}
        onOpenForm={handleOpenForm}
        onManageUsers={() => setView("manageUsers")}
        onManageClients={() => setView("manageClients")}
        onManageProducts={() => setView("manageProducts")}
        ondashboard={() => setView("dashboard")}
      />

      {/* Main Content */}
      <div className=" flex-1 translate-x-32 -mt-8 w-screen p-4">
        {view === "dashboard" && (
          <div>
         
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border text-center border-gray-300 rounded-md shadow-md bg-blue-50">
                <h2 className="text-lg font-bold text-blue-700">Total Users</h2>
                <p className="text-2xl font-semibold">{users.length}</p>
              </div>
              <div className="p-4 border text-center border-gray-300 rounded-md shadow-md bg-green-50">
                <h2 className="text-lg font-bold text-green-700">Total Clients</h2>
                <p className="text-2xl font-semibold">{clients.length}</p>
              </div>
              <div className="p-4 border text-center border-gray-300 rounded-md shadow-md bg-yellow-50">
                <h2 className="text-lg font-bold text-yellow-700">Total Products</h2>
                <p className="text-2xl font-semibold">{products.length}</p>
              </div>
            </div>
          </div>
        )}


        {view === "manageUsers" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.email}
                    className="p-4 border text-left border-gray-300 rounded-md shadow-md bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {user.name}
                    </h3>
                    <p>
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-semibold">Address : </span> {user.address}
                    </p>
                    <p>
                      <span className="font-semibold">Mobile no : </span> {user.mobile}
                    </p>
                    <p>
                      <span className="font-semibold">Pin Code : </span> {user.pinCode}
                    </p>
                    <button
                      onClick={() => handleDelete(user.email, "user")}
                      className="bg-red-500 text-white px-4 py-2 ml-64 mt-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
        )}

        {view === "manageClients" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <div
                    key={client.email}
                    className="p-4 border text-left border-gray-300 rounded-md shadow-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {client.name}
                    </h3>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {client.email}
                    </p>
                    <p>
                      <span className="font-semibold">Address</span> {client.address}
                    </p>
                    <button
                      onClick={() => handleDelete(client.email, "client")}
                      className="bg-red-500 text-white px-4 py-2 ml-64 mt-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No clients found</p>
              )}
            </div>
          </div>
        )}

        {view === "manageProducts" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.email}
                    className="p-4 border text-left border-gray-300 rounded-md shadow-md bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {product.name}
                    </h3>
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {product.name}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span>{" "}
                      {product.price || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Cateogry:</span>{" "}
                      {product.productCategory || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity :</span> {product.productQuantity}
                    </p>
                    <p>
                      <span className="font-semibold">Description :</span> {product.productDescription}
                    </p>
                    <button
                      onClick={() => handleDelete(product.email, "product")}
                      className="bg-red-500 text-white px-4 py-2 mt-2 ml-64 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        )}

        {isModalOpen && (
          <RegisterForm
            modalContent={modalContent}
            handleCloseModal={handleCloseModal}
            handleRegisterSubmit={handleRegisterSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
