import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

// Get user cart data (use GET for retrieval)
cartRouter.get('/get', authUser, getUserCart);  // Changed to GET

// Add a product to cart (use POST for creation)
cartRouter.post('/add', authUser, addToCart);

// Update cart item (use PUT or PATCH for updates)
cartRouter.put('/update', authUser, updateCart);


export default cartRouter;
