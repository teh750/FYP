import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";  // This imports the correct backend URL

const Revenue = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(`${backendUrl}/api/sales`);
        setSalesData(salesResponse.data);
  
        const productsResponse = await axios.get(`${backendUrl}/api/product/count`);
        setTotalProducts(productsResponse.data.total);
  
        const ordersResponse = await axios.get(`${backendUrl}/api/order/count`);
        setTotalOrders(ordersResponse.data.total);
  
        const usersResponse = await axios.get(`${backendUrl}/api/user/count`);
        setTotalUsers(usersResponse.data.total);
  
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load data', err);
        setError(`Failed to load data: ${err.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  

  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {/* 4-square layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-100 rounded shadow">
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-2xl font-bold">RM{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-green-100 rounded shadow">
              <h3 className="text-lg font-semibold">Total Product</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded shadow">
              <h3 className="text-lg font-semibold">Total Order</h3>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="p-4 bg-purple-100 rounded shadow">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
          </div>

          {/* Revenue Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Amount (RM)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale._id}>
                  <td className="border p-2">{sale._id}</td>
                  <td className="border p-2">{sale.userId?.email || "N/A"}</td>
                  <td className="border p-2">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="border p-2">{sale.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              Total Revenue: RM{totalRevenue.toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
