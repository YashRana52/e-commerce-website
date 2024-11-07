import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productcontroller.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

// Route for adding a product
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Route for removing a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route for fetching a single product by ID
productRouter.get('/single/:id', singleProduct); // Using '/single/:id' for single product route

// Route for listing all products
productRouter.get('/list', listProduct);

export default productRouter;
