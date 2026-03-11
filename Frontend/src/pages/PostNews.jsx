import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PenTool, Send, Loader2, Camera, Video } from "lucide-react";

function PostNews() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = user.name || "Admin"; // LocalStorage से नाम उठा रहा है
    
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category || "General");
    formData.append("journalistName", userName); // Backend के 'contributor' में जाएगा
    
    if (imageFile) {
      formData.append("image", imageFile); // 'image' backend multer से मैच होना चाहिए
    }

    try {
      await axios.post("http://localhost:5000/api/news/post-news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`Published as ${userName} 🔥`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error publishing news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 lg:p-12 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
        <div className="lg:col-span-4 bg-[#0F172A] p-10 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg">
              <PenTool size={28} />
            </div>
            <h2 className="text-4xl font-bold leading-tight">Write the <br/><span className="text-blue-400">Next Big</span> Story.</h2>
            <p className="text-slate-400 mt-6 text-sm font-medium italic">"Journalism is printing what someone else does not want printed."</p>
          </div>
        </div>

        <div className="lg:col-span-8 p-10 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-blue-600">Headline</label>
              <input name="title" required onChange={handleChange} className="w-full text-3xl font-bold outline-none border-none p-0 text-slate-800 placeholder:text-slate-200" placeholder="Title..." />
              <div className="h-[1px] w-full bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Category</label>
                <input name="category" onChange={handleChange} className="w-full font-semibold outline-none border-b border-slate-100 pb-2 focus:border-blue-400 transition-all" placeholder="e.g. Technology" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Media (Image/Video)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all flex items-center gap-2">
                    <Camera size={14} /> Upload File
                    <input type="file" accept="image/*,video/*" onChange={handleFile} className="hidden" />
                  </label>
                  {preview && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-blue-200">
                       {imageFile?.type.startsWith("video") ? <div className="bg-slate-800 w-full h-full flex items-center justify-center text-[8px] text-white">VID</div> : <img src={preview} className="w-full h-full object-cover" />}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Content</label>
              <textarea name="description" required onChange={handleChange} rows="6" className="w-full p-6 bg-slate-50 rounded-3xl outline-none resize-none text-slate-700 focus:bg-white border border-transparent focus:border-blue-100 transition-all" placeholder="Start writing your story here..."></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0F172A] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Publish Now <Send size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PostNews;