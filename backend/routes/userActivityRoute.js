import express from "express";
import {
  getUserActivity,
  logUserLogin,
  logUserLogout,
  logUserRegistration
} from "../controllers/userActivityController.js";

const router = express.Router();

// Route to fetch all user activities
router.get("/", getUserActivity);

// Route to log a login event
router.post("/login", logUserLogin);

// Route to log a logout event
router.post("/logout", logUserLogout);

// Route to log user registration activity
router.post('/register', logUserRegistration);

export default router;
