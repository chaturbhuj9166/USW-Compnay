import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../config/api"

import { Save, ArrowLeft, Loader2, Tag, Type, AlignLeft, Camera, X } from "lucide-react";
import { toast } from "react-toastify";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", category: "" });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/news/single/${id}`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            category: res.data.category || ""
          });
          /* ✅ पुरानी इमेज को सीधा सेट करें क्योंकि वो Cloudinary URL है */
          if (res.data.image) {
            setPreview(res.data.image); 
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Article not found!");
        navigate("/news");
      } finally { setLoading(false); }
    };
    fetchSingleNews();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("category", formData.category || "General");
    if (imageFile) { dataToSend.append("image", imageFile); }

    try {


      await API.put(`/api/news/update/${id}`, dataToSend, {

        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Article Updated Successfully! ✨");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Update failed!");
    } finally { setIsUpdating(false); }
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-blue-600" size={40} /><p className="font-bold mt-4 text-slate-600 tracking-wider">Fetching Article Data...</p></div>;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      <button onClick={() => navigate("/dashboard")} className="group flex items-center gap-2 text-slate-500 mb-8 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Cover Media</label>
            <div className="relative aspect-[16/6] rounded-3xl overflow-hidden group border border-slate-100 bg-slate-50 shadow-inner">
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="w-full h-full object-cover transition-all" />
                  <button type="button" onClick={() => { setImageFile(null); setPreview(null); }} className="absolute top-4 right-4 bg-red-600/80 p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"><X size={18} /></button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300"><Camera size={32} /><span className="text-xs font-bold uppercase tracking-widest">No Media</span></div>
              )}
              <label className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-all cursor-pointer font-black text-sm uppercase tracking-widest">
                <Camera size={24} /> Change Media
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[2px]"><Type size={14} /> Headline</label>
            <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-lg font-bold text-slate-700" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[2px]"><Tag size={14} /> Category</label>
            <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-700" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[2px]"><AlignLeft size={14} /> Article Content</label>
            <textarea rows="10" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-600 leading-relaxed font-medium" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
          </div>

          <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 disabled:bg-slate-300">
            {isUpdating ? <><Loader2 className="animate-spin" size={20} /> Updating News...</> : <><Save size={18} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditNews;