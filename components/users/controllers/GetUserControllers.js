const User = require("../models/User");

const listAllUsers = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let sort = req.query.sort || "desc";
        let search = req.query.q || "";

        let ofset = (page - 1) * limit;

        let items = await User.find()
            .limit(limit)
            .skip(ofset)
            .sort({ createdAt: sort });

        let total = await User.countDocuments();

        return res.status(200).json({
            message: "success",
            items,
            pagination: {
                total,
                page,
                limit
            }
        })
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            message: `${error},`
        })
    }
}
const userProfile = () => {

}

module.exports = {
    listAllUsers,
    userProfile
}