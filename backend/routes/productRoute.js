// In productRoute.js
import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, getProductCount, updateProduct } from '../controllers/productController.js';  // Ensure `getProductCount` is imported
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Other product routes
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.get('/count', getProductCount);
productRouter.post('/update', adminAuth, updateProduct);

export default productRouter;
