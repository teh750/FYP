import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const User = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError("No token found. Please login again.");
      setIsLoading(false);
      return;
    }

    const fetchUserActivity = async () => {
      try {
        // Make the API call with the token in headers
        const response = await axios.get(`${backendUrl}/api/user-activity`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Format the data for display
        const formattedData = response.data.map((activity) => ({
          ...activity,
          loginDateTime: new Date(activity.loginDateTime).toLocaleString(),
        }));
        setUserActivity(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load user activity data.");
        setIsLoading(false);
      }
    };

    fetchUserActivity();
  }, []); // Empty array ensures this runs only once after initial render

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Activity Log</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Login Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {userActivity.map((activity) => (
              <tr key={activity._id}>
                <td className="border p-2">{activity._id}</td>
                <td className="border p-2">{activity.email}</td>
                <td className="border p-2">{activity.loginDateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
