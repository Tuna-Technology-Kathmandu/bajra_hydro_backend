const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const searchQuery = {
      fullname: { $regex: search, $options: "i" }
    };

    const users = await User.find(searchQuery, "-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      pagination: {
        currentPage: page,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        usersPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = getAllUsers;
