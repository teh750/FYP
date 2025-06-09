import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import EditModal from './EditModal'; // Import the EditModal component

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For storing the product being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For controlling modal visibility

  // Fetch the product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove a product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Open the edit modal with the selected product
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <div className="flex justify-center gap-2">
              <p
                onClick={() => openEditModal(item)} 
                className="cursor-pointer text-lg text-blue-500"
              >
                Edit
              </p>
              <p
                onClick={() => removeProduct(item._id)} 
                className="cursor-pointer text-lg text-red-500"
              >
                X
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ----- Edit Modal ----- */}
      {isEditModalOpen && (
        <EditModal
          product={selectedProduct}
          token={token}
          onClose={closeEditModal}
          onUpdate={fetchList} // Refresh the list after updating
        />
      )}
    </>
  );
};

export default List;
