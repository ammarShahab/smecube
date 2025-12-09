import React, { useState } from "react";
import {
  Save,
  Settings,
  Globe,
  Mail,
  User,
  Lock,
  RefreshCcw,
} from "lucide-react";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    companyName: "SME Cube",
    companyEmail: "info@smecube.com",
    website: "https://www.smecube.com",
    adminName: "Md. Real",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this with backend API (PUT /api/settings)
    console.log("Settings Updated:", formData);
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-blue-600" size={26} />
        <h2 className="text-2xl font-bold text-gray-800">Admin Settings</h2>
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Company Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <Globe size={18} />
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Company Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <Mail size={18} />
            Company Email
          </label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Website URL */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <Globe size={18} />
            Website URL
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Admin Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <User size={18} />
            Admin Name
          </label>
          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <Lock size={18} />
            Change Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>

      {/* Service Update Section */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCcw className="text-green-600" size={22} />
          <h3 className="text-lg font-bold text-gray-800">Service Updates</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Manage and refresh the list of services displayed on the SME Cube
          website. You can trigger a sync from the latest backend data to keep
          the public site updated.
        </p>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
          <RefreshCcw size={18} />
          Refresh Services
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
