import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';



// placing order using cod method

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Check if items array is provided and not empty
       

       

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
           
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the user's cart after order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};





// placing order using stripe method

const placeOrderStripe = async (req,res) =>{

}







// placing order using stripe method

const placeOrderRazorpay = async (req,res) =>{

}


// all Orders data for admin panel
const allOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving orders' });
        
    }

}



// Controller function to get user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const orders = await orderModel.find({ userId });

        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving orders' });
    }
};


// update order status from admin panel

const updateStatus = async (req,res) =>{
    try {
        const {orderId,status} = req.body
         await orderModel.findByIdAndUpdate(orderId, {status})
         res.json({success:true,message:'Status Updated'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving orders' });
        
    }

}

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders };

