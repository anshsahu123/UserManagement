import React from 'react'

const RegisterForm = ({ modalContent, handleCloseModal, handleRegisterSubmit }) => {
    return (
        <div>
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4 capitalize text-center">
          {modalContent}
        </h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="text-gray-500 hover:text-gray-800 p-2"
        >
          ✖
        </button>
      </div>
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-left">Name:</label>
          <input
            name="name"
            type="text"
            className="w-2/3 p-2 border rounded"
            required
            pattern="[A-Za-z\s]+"
            title="Name can only contain letters and spaces"
          />
        </div>

        {/* Conditional Rendering for User Fields */}
        {modalContent !== "registerProduct" && (
          <>
            {/* Email */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Email:</label>
              <input
                name="email"
                type="email"
                className="w-2/3 p-2 border rounded"
                required
              />
            </div>
            {/* Mobile */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Mobile:</label>
              <input
                name="mobile"
                type="tel"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit mobile number"
                className="w-2/3 p-2 border rounded"
                required
              />
            </div>
            {/* Address */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Address:</label>
              <input
                type="text"
                name="address"
                className="w-2/3 p-2 border rounded"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
                <label className="w-1/3 text-left">Pin Code:</label>
                <input
                  type="text"
                  name="pinCode"
                  className="w-2/3 p-2 border rounded"
                  required
                />
              </div> 
          </>
        )}

        {/* Product Fields */}
        {modalContent === "registerProduct" && (
          <>
            {/* Price */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Price:</label>
              <input
                name="price"
                type="number"
                className="w-2/3 p-2 border rounded"
                required
              />
            </div>
            {/* Description */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Description:</label>
              <textarea
                id="productDescription"
                name="productDescription"
                className="w-2/3 p-2 border rounded"
                placeholder="Enter product description"
              ></textarea>
            </div>
            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Quantity:</label>
              <input
                type="number"
                id="productQuantity"
                name="productQuantity"
                className="w-2/3 p-2 border rounded"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
            {/* Category */}
            <div className="flex items-center space-x-4">
              <label className="w-1/3 text-left">Category:</label>
              <select
                id="productCategory"
                name="productCategory"
                className="w-2/3 p-2 border rounded"
                required
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
          </>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</div>




      
    )
}

export default RegisterForm
