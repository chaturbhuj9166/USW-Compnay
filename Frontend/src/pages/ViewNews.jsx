import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../config/api";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Film } from "lucide-react";

function ViewNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {

    API.get(`/api/news/single/${id}`).then((res) => setNews(res.data));

  }, [id]);

  if (!news)
    return (
      <div className="flex h-screen items-center justify-center font-black text-slate-300 animate-pulse">
        LOADING...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white p-12"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 font-black mb-10 uppercase text-[10px] tracking-widest hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Back to dashboard
      </button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {news.category}
          </span>
          <h1 className="text-6xl font-black text-slate-900 mb-8 mt-6 tracking-tighter leading-[0.95]">
            {news.title}
          </h1>
          <div className="flex gap-8 text-slate-400 text-xs font-bold mb-12 pb-8 border-b border-slate-50">
            <span className="flex items-center gap-2">
              <User size={16} className="text-slate-900" /> {news.contributor}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-900" />{" "}
              {new Date(news.createdAt).toLocaleDateString()}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-[3.5rem] overflow-hidden shadow-2xl bg-black mb-12 border border-slate-100"
        >
          {news.image &&
          (news.image.includes(".mp4") || news.image.includes(".mov")) ? (
            <video controls className="w-full h-auto max-h-[600px]">
              <source src={news.image} type="video/mp4" />
            </video>
          ) : news.image ? (
            <img
              src={news.image}
              className="w-full h-auto object-cover"
              alt="Article Media"
            />
          ) : (
            <div className="p-20 flex flex-col items-center text-slate-500 gap-4">
              <Film size={48} />{" "}
              <p className="font-black uppercase text-xs tracking-widest">
                No Media Found
              </p>
            </div>
          )}
        </motion.div>

        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="prose prose-slate max-w-none"
        >
          <p className="text-2xl text-slate-700 leading-relaxed font-medium whitespace-pre-wrap selection:bg-blue-100">
            {news.description}
          </p>
        </motion.article>
      </div>
    </motion.div>
  );
}
export default ViewNews;
