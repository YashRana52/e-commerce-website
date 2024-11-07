import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  const statusHandler = async(event,orderId) =>{
    try {
        const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
        if (response.data.success) {
            await fetchAllOrders()
            
        }
        
    } catch (error) {
        console.log(error);
        toast.error(response.data.message)
        
        
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Order List</h3>

      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr_1fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 sm:gap-6 lg:gap-8 bg-white rounded-lg shadow-lg p-6 my-4"
            key={index}
          >
            {/* First Column: Order Name, Image, and Address */}
            <div className="sm:col-span-2 lg:col-span-2 flex items-start pl-4">
              {/* Image Tag */}
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-14 h-14 mr-4" />
              <div>
                <p className="text-xl font-semibold text-gray-800">{order.name}</p>
                <div className="mt-1 text-sm text-gray-600">
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {
                      return (
                        <p key={idx} className="font-semibold">
                        <span>{item.name}</span> x {item.quantity} <span>{item.size}</span>
                      </p>
                      
                      );
                    } else {
                      return (
                        <p key={idx} className="font-semibold">
                        <span>{item.name}</span> x {item.quantity} <span>{item.size}</span>
                      </p>
                      
                      );
                    }
                  })}
                </div>

                {/* Address details with reduced margin */}
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street},</p>
                  <p>{order.address.city + ", " + order.address.pincode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            {/* Second Column: Order Details */}
            <div className="flex flex-col justify-between">
              <p className="text-sm font-medium text-gray-600">Items: {order.items.length}</p>
              <p className="text-sm font-medium text-gray-600">Method: {order.paymentMethod}</p>
              <p className="text-sm font-medium text-gray-600">
                Payment: <span className={order.payment ? "text-green-600" : "text-red-600"}>{order.payment ? "Done" : "Pending"}</span>
              </p>
              <p className="text-sm font-medium text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Third Column: Order Price */}
            <div className="flex flex-col justify-between">
              <p className="text-xl font-semibold text-gray-900">{currency}{order.amount}</p>
            </div>

            {/* Fourth Column: Order Status */}
            <div className="flex flex-col justify-between items-start">
              <p className="text-sm font-medium text-gray-600">Status: {order.status}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}
                className="mt-2 p-2 border-2 border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For delivery">Out For delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;
