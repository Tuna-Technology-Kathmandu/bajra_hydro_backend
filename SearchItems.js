const Blogs = require("./components/blogs/models/blog_model");
const Reports = require("./components/report/models/report_model");

const searchItem = async (req, res) => {
  try {
    const title = req.query.q;

    if (!title) {
      return res.status(400).json({ message: "Title is required for search." });
    }

    const regex = new RegExp(title, "i");

    const [blogs, reports] = await Promise.all([
      Blogs.find({ title: { $regex: regex } }),
      Reports.find({ title: { $regex: regex } }),
    ]);

    return res.status(200).json({ blogs, reports });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

module.exports = searchItem;
