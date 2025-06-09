import UserActivity from "../models/userActivityModel.js";

export const getUserActivity = async (req, res) => {
  try {
    console.log("Fetching user activities...");
    const activities = await UserActivity.find()
      .populate("userId", "email")
      .sort({ loginDateTime: -1 });
    console.log("Fetched activities:", activities); // Log fetched data
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching user activities:", error.message);
    res.status(500).json({ message: "Error fetching user activity data" });
  }
};

export const logUserLogin = async (req, res) => {
  const { userId, email } = req.body;

  // Validation
  if (!userId || !email) {
    return res.status(400).json({ message: "userId and email are required" });
  }

  try {
    const newActivity = new UserActivity({
      userId,
      email,
      loginDateTime: new Date(),
    });
    await newActivity.save();
    res.status(201).json({ message: "Login activity logged" });
  } catch (error) {
    console.error("Error logging login activity:", error.message || error);
    res.status(500).json({ message: "Error logging login activity" });
  }
};

export const logUserLogout = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const activity = await UserActivity.findOne({ userId }).sort({ loginDateTime: -1 });

    if (!activity || activity.logoutDateTime) {
      return res.status(400).json({ message: "No active session found for this user" });
    }

    activity.logoutDateTime = new Date();
    await activity.save();

    res.status(200).json({ message: "Logout activity logged successfully" });
  } catch (error) {
    console.error("Error in logUserLogout function:", error);
    res.status(500).json({ message: "Error logging logout activity" });
  }
};

export const logUserRegistration = async (req, res) => {
  const { userId, email } = req.body;

  // Validation
  if (!userId || !email) {
    return res.status(400).json({ message: "userId and email are required" });
  }

  try {
    const newActivity = new UserActivity({
      userId,
      email,
      loginDateTime: new Date(), // Log registration time as loginDateTime for simplicity
    });

    await newActivity.save();
    res.status(201).json({ message: "Registration activity logged" });
  } catch (error) {
    console.error("Error logging registration activity:", error.message || error);
    res.status(500).json({ message: "Error logging registration activity" });
  }
};
