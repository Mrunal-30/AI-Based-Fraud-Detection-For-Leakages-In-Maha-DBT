import React, { useState, useEffect } from "react";

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    username: "admin",
  };

  const [profile, setProfile] = useState({
    username: storedUser.username || "admin",
    name: storedUser.name || "",
    surname: storedUser.surname || "",
    address: storedUser.address || "",
  });

  const [editing, setEditing] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user")),
      ...profile,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Settings</h2>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">User Profile</h3>
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />
            <input
              type="text"
              name="surname"
              value={profile.surname}
              onChange={handleProfileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address"
            />
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>First Name:</strong> {profile.name}</p>
            <p><strong>Last Name:</strong> {profile.surname}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 text-blue-600 underline hover:text-blue-700 focus:outline-none"
            >
              Edit Profile
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Settings;
