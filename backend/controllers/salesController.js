import Order from '../models/orderModel.js';

export const getSalesData = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'email')
      .select('id userId date amount');

    console.log("Fetched Orders:", orders); // Log the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error Fetching Sales Data:", error); // Log the error
    res.status(500).json({ message: 'Error fetching sales data' });
  }
};

