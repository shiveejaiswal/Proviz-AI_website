import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // State to hold all applications fetched from the backend
  const [applications, setApplications] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch applications from the backend
    const fetchApplications = async () => {
      try {
        // Make a GET request to the backend to retrieve the applications
        const response = await axios.get('http://localhost:5000/api/applications');
        // Set the fetched applications in state
        setApplications(response.data);
      } catch (error) {
        // Log error if there's an issue fetching data
        console.error("Error fetching applications:", error);
      }
    };

    // Call the function to fetch applications
    fetchApplications();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="p-10">
      {/* Title for the dashboard */}
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      
      {/* Table to display application data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          {/* Table header with column titles */}
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Statement</th>
            </tr>
          </thead>
          {/* Table body with dynamic rows for each application */}
          <tbody>
            {/* Conditional rendering based on the applications array */}
            {applications.length === 0 ? (
              // Display a message if no applications are available
              <tr>
                <td colSpan="4" className="text-center py-4">No applications found</td>
              </tr>
            ) : (
              // Map through applications array and display each item
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
