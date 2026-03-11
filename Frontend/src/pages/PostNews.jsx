import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PenTool, Send, Loader2, Camera, X } from "lucide-react";
import API from "../config/api";

function PostNews() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 10MB से बड़ी फाइल को रोकना (Cloudinary Free Tier limit)
      if (file.size > 10 * 1024 * 1024) {
        return toast.error("File size too large! Max 10MB allowed.");
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getUserName = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return "Admin";
      const user = JSON.parse(storedUser);
      return user?.name || "Admin";
    } catch {
      return "Admin";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = getUserName();
    
    // ✅ FormData का सही इस्तेमाल
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category || "General");
    formData.append("journalistName", userName);

    if (imageFile) {
      // Backend में 'image' नाम से ही पकड़ा जाएगा
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      
      // ✅ API Call: इसमें headers में Content-Type देने की ज़रूरत नहीं होती, Axios खुद संभाल लेता है
      await API.post("/api/news/post-news", formData);

      toast.success(`Published as ${userName} 🔥`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "Error publishing news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 lg:p-12 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
        
        {/* LEFT SIDE: Info */}
        <div className="lg:col-span-4 bg-[#0F172A] p-10 flex flex-col justify-between text-white">
          <div>
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-blue-500/20">
              <PenTool size={28}/>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Write the <br/>
              <span className="text-blue-400">Next Big</span> Story.
            </h2>
            <p className="text-slate-400 mt-6 text-sm italic border-l-2 border-blue-600 pl-4">
              "Journalism is printing what someone else does not want printed."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="lg:col-span-8 p-10 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Headline */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-blue-600">Headline</label>
              <input
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="What happened today?"
                className="w-full text-3xl font-bold outline-none border-none placeholder:text-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Technology, Sports"
                  className="w-full border-b border-slate-200 pb-2 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Media (Image/Video)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-100 transition-colors">
                    <Camera size={14}/>
                    Upload File
                    <input type="file" accept="image/*,video/*" onChange={handleFile} className="hidden" />
                  </label>
                  
                  {preview && (
                    <div className="relative">
                      <img src={preview} alt="preview" className="w-12 h-12 object-cover rounded-lg shadow-md" />
                      <button 
                        type="button" 
                        onClick={() => {setPreview(null); setImageFile(null);}}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X size={10}/>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Full Content</label>
              <textarea
                name="description"
                required
                rows="6"
                value={form.description}
                onChange={handleChange}
                className="w-full p-6 bg-slate-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                placeholder="Describe the full story here..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20}/> : (
                <>Publish Now <Send size={18}/></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostNews;