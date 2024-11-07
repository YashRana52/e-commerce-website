import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        
        // Find the user and update their cart
        const userData = await userModel.findById(userId);
        
        // Initialize the cartData if not already present
        let cartData = userData.cartData || {};
        
        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increase quantity if size exists
            } else {
                cartData[itemId][size] = 1; // Add size with quantity 1 if size doesn't exist
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Add item with size and quantity 1 if item doesn't exist
        }

        // Remove the item from cart if quantity is 0
        for (const itemId in cartData) {
            for (const size in cartData[itemId]) {
                if (cartData[itemId][size] === 0) {
                    delete cartData[itemId][size];
                }
            }
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]; // Remove the item if no sizes are left
            }
        }

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        
        // Find the user data
        const userData = await userModel.findById(userId);
        
        // If cartData doesn't exist, return an error
        if (!userData.cartData) {
            return res.json({ success: false, message: "No cart data found" });
        }

        let cartData = userData.cartData;

        // Check if the item exists in the cart
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity; // Update the quantity for the specific item and size

            // If quantity is 0, remove the item
            if (quantity === 0) {
                delete cartData[itemId][size];

                // If no sizes left for this item, remove the item entirely
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            return res.json({ success: false, message: "Item or size not found in the cart" });
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        
        // Find the user data
        const userData = await userModel.findById(userId);

        // Check if user has cartData
        if (!userData.cartData) {
            return res.json({ success: false, message: "No cart data found" });
        }

        const cartData = userData.cartData;

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, getUserCart, updateCart };
