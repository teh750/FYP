import express from 'express';
import { getSalesData } from '../controllers/salesController.js'; 

const router = express.Router();

// GET sales data
router.get('/', getSalesData);

export default router;
