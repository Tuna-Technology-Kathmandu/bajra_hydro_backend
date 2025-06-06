const CV = require("../models/cv_model");

const listAllCVs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      job_type,
      location,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOption = { [sortBy]: order === "asc" ? 1 : -1 };

    const pipeline = [
      {
        $lookup: {
          from: "vacancies",
          localField: "vacancy",
          foreignField: "_id",
          as: "vacancy",
        },
      },
      { $unwind: "$vacancy" },
    ];

    const match = {};

    if (search) {
      match["vacancy.title"] = { $regex: search, $options: "i" };
    }

    if (job_type) {
    match["vacancy.job_type"] = { $regex: `^${job_type}$`, $options: "i" };
    }

    if (location) {
      match["vacancy.location"] = { $regex: location, $options: "i" };
    }

    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    pipeline.push(
      { $sort: sortOption },
      { $skip: skip },
      { $limit: parseInt(limit) }
    );

    const countPipeline = [...pipeline.filter(p => !p.$skip && !p.$limit)];
    countPipeline.push({ $count: "total" });

    const [cvs, countResult] = await Promise.all([
      CV.aggregate(pipeline),
      CV.aggregate(countPipeline),
    ]);

    const total = countResult[0]?.total || 0;

    return res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      cvs,
    });
  } catch (err) {
    console.error("List All CVs Error:", err);
    return res.status(500).json({ message: "Server error while fetching CVs" });
  }
};

module.exports = { listAllCVs };
