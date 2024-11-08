import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch the applications from the backend
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Statement</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No applications found</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td className="py-2 px-4">{app.name}</td>
                  <td className="py-2 px-4">{app.phone}</td>
                  <td className="py-2 px-4">{app.email}</td>
                  <td className="py-2 px-4">{app.statement}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
