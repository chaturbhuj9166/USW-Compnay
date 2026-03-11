import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2"; // 1. SweetAlert2 इम्पोर्ट करें

function NewsList() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // 2. अपडेटेड डिलीट फंक्शन
  const deleteNews = (id) => {
    Swal.fire({
      title: "क्या आप वाकई डिलीट करना चाहते हैं?",
      text: "एक बार डिलीट होने पर यह न्यूज़ वापस नहीं आएगी!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e293b", // डार्क थीम कलर
      cancelButtonColor: "#f8fafc",
      confirmButtonText: "हाँ, डिलीट करें",
      cancelButtonText: "नहीं",
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[2rem]', // डैशबोर्ड की तरह राउंडेड
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold text-slate-500 border border-slate-100'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/news/${id}`);
          
          // सफलता का मैसेज
          Swal.fire({
            title: "डिलीट कर दिया गया!",
            text: "आपकी न्यूज़ सफलतापूर्वक हटा दी गई है।",
            icon: "success",
            confirmButtonColor: "#1e293b",
            customClass: { popup: 'rounded-[2rem]' }
          });
          
          getNews(); // लिस्ट रिफ्रेश करें
        } catch (error) {
          Swal.fire("Error!", "डिलीट करने में कोई समस्या आई।", "error");
        }
      }
    });
  };

  const filtered = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">News Management</h2>
            <p className="text-slate-400 text-sm">Manage and edit your published stories.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
              <tr>
                <th className="px-8 py-5 text-left">Title</th>
                <th className="px-8 py-5 text-left">Category</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50/30 transition-all">
                  <td className="px-8 py-6">
                    <span className="text-slate-700 font-bold block truncate max-w-xs">{item.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">{item.category}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => navigate(`/news-management/${item._id}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteNews(item._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewsList;