import React, { useState } from "react";
import defaultImage from "../../assets/Truck.jpg"; // Import your default image here

const VehicleInfo = ({ vehicleName, vehicleRegNumber }) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Update the photo with the uploaded file
    }
  };

  const handleDelete = () => {
    setPhoto(null); // Remove the current photo, whether it's the default or uploaded
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">Vehicle Information</h3>
      <p className="mt-4">Vehicle Name: {vehicleName}</p>
      <p className="mt-2">Registration Number: {vehicleRegNumber}</p>
      <div className="mt-4">
        <label className="block text-gray-700">Upload Vehicle Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="mt-2 cursor-pointer hover:underline"
        />
        <div className="mt-4">
          <img
            src={photo || defaultImage} // Show uploaded photo or default image
            alt="Vehicle"
            className="w-32 h-32 object-cover"
          />
          <div className="mt-2">
            <button
              className="hover:underline cursor-pointer rounded-2xl mt-2.5 p-2"
              onClick={handleDelete}
            >
              {photo ? "Delete" : "Delete Image"} {/* Button text changes */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;