import News from "../models/News.js";

// ✅ न्यूज़ पोस्ट करने के लिए (Cloudinary के साथ)
export const postNews = async (req, res) => {
  try {
    const { title, description, category, journalistName } = req.body;
    
    // ✅ लोकल 'filename' की जगह क्लाउडनरी का पूरा 'path' (URL) लें
    const imageUrl = req.file ? req.file.path : ""; 

    const news = new News({
      title,
      description,
      category,
      image: imageUrl, // अब यहाँ https://res.cloudinary.com/... वाला लिंक सेव होगा
      contributor: journalistName || "Admin" 
    });

    await news.save();
    res.status(201).json({ message: "News Posted Successfully", news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting news" });
  }
};

// ✅ न्यूज़ अपडेट करने के लिए
export const updateNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let updateFields = { title, description, category };

    // ✅ अगर नई इमेज है, तो क्लाउडनरी का नया 'path' अपडेट करें
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

// ✅ डैशबोर्ड स्टेट्स (जो तेरे स्क्रीनशॉट में 3, 1, 2 दिख रहे हैं)
export const getDashboardStats = async (req, res) => {
  try {
    const totalNews = await News.countDocuments();
    // अलग मॉडल की जगह न्यूज़ से ही अलग-अलग रिपोर्टर्स के नाम गिन लो
    const journalists = await News.distinct("contributor"); 
    const categories = await News.distinct("category");

    res.json({
      totalNews,
      journalists: journalists.length, // अब यह सही काउंट दिखाएगा
      categories: categories.length
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// बाकी getNews, getNewsById, और deleteNews एकदम सही हैं
export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // नई न्यूज़ ऊपर दिखाने के लिए
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