import News from "../models/News.js";


export const postNews = async (req, res) => {
  try {
    const { title, description, category, journalistName } = req.body;
    
    const imageUrl = req.file ? req.file.path : ""; 

    const news = new News({
      title,
      description,
      category,
      image: imageUrl,
      contributor: journalistName || "Admin" 
    });

    await news.save();
    res.status(201).json({ message: "News Posted Successfully", news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting news" });
  }
};


export const updateNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let updateFields = { title, description, category };

   
    if (req.file) {
      updateFields.image = req.file.path;
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id, 
      updateFields, 
      { new: true } 
    );

    res.json({ message: "News Updated Successfully", updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Error updating news" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {

    const totalNews = await News.countDocuments();

    const journalists = await News.distinct("contributor");

    const categories = await News.distinct("category");

    const recentNews = await News
      .find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalNews,
      journalists: journalists.length,
      categories: categories.length,
      recentNews
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching stats"
    });

  }
};

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); 
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news" });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news details" });
  }
};