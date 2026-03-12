import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/api";

import { motion } from "framer-motion";
import {
  Newspaper,
  Users,
  Layers,
  TrendingUp,
  Plus,
  Search,
  Edit3,
  Image as ImageIcon,
  Loader2,
  ArrowUpRight,
  PlayCircle,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({
    totalNews: 0,
    journalists: 1,
    categories: 0,
    recentNews: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/api/dashboard");
        const newsList = res.data || [];

        setData({
          totalNews: res.data.totalNews,
          journalists: res.data.journalists,
          categories: res.data.categories,
          recentNews: res.data.recentNews,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const filteredNews = data.recentNews.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] pl-[280px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Syncing Data...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full overflow-x-hidden">
      <main className="max-w-[1400px] mx-auto p-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 font-medium">
              Monitoring your news ecosystem in real-time.
            </p>
          </div>
          <button
            onClick={() => navigate("/post-news")}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
          >
            <Plus size={20} /> Create New Post
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Total Articles",
              value: data.totalNews,
              color: "blue",
              icon: <Newspaper size={24} />,
            },
            {
              title: "Active Team",
              value: data.journalists,
              color: "emerald",
              icon: <Users size={24} />,
            },
            {
              title: "Categories",
              value: data.categories,
              color: "purple",
              icon: <Layers size={24} />,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-8 border-b flex justify-between items-center bg-white">
            <h2 className="text-2xl font-black text-slate-800">
              Article Pipeline
            </h2>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-slate-50 border border-slate-100 pl-12 pr-6 py-3 rounded-2xl w-96 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[2px]">
              <tr>
                <th className="text-left px-8 py-6">Story Title & Preview</th>
                <th className="text-left px-8 py-6">Contributor</th>
                <th className="text-left px-8 py-6">Category</th>
                <th className="text-center px-8 py-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((news, idx) => (
                <motion.tr
                  key={news._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50/40 transition-colors"
                >
                  <td className="px-8 py-5 flex items-center gap-4">
                    <div className="w-14 h-10 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 shadow-sm flex-shrink-0">
                      {news.image &&
                      (news.image.includes(".mp4") ||
                        news.image.includes(".mov")) ? (
                        <div className="bg-slate-900 w-full h-full flex items-center justify-center">
                          <PlayCircle className="text-white" size={16} />
                        </div>
                      ) : news.image ? (
                        <img
                          src={news.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <ImageIcon size={18} className="text-slate-300" />
                      )}
                    </div>
                    <div className="max-w-[250px]">
                      <p className="font-bold text-slate-700 truncate text-sm">
                        {news.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                        Published{" "}
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-600 text-xs">
                    {news.contributor}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
                      {news.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/news-management/${news._id}`)}
                        className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/view-news/${news._id}`)}
                        className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-start transition-all"
    >
      <div>
        <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
          {title}
        </p>
        <h2 className="text-5xl font-black mt-2 text-slate-900 tracking-tighter">
          {value}
        </h2>
      </div>
      <div className={`p-4 rounded-2xl ${colors[color]}`}>{icon}</div>
    </motion.div>
  );
}
export default Dashboard;
