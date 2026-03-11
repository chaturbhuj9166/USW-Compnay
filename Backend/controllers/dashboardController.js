import News from "../models/News.js";
import Journalist from "../models/Journalist.js";

export const getDashboardData = async (req, res) => {

  try {

    const totalNews = await News.countDocuments();

    const journalists = await Journalist.countDocuments();

    const categories = await News.distinct("category");

    const recentNews = await News
      .find()
      .populate("journalistId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalNews,
      journalists,
      categories: categories.length,
      recentNews
    });

  } catch (error) {

    res.status(500).json({
      message: "Dashboard error"
    });

  }

};