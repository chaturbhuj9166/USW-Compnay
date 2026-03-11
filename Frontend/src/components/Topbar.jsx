import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

function Topbar() {

const navigate = useNavigate();

// SAFE USER FETCH FROM LOCALSTORAGE
let user = null;

try {
const storedUser = localStorage.getItem("user");

```
if (storedUser && storedUser !== "undefined") {
  user = JSON.parse(storedUser);
}
```

} catch (error) {
user = null;
}

const userName = user?.name || "Admin";

return ( <nav className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-10 flex items-center justify-between">

```
  {/* Search */}
  <div className="relative w-96 group">
    <Search
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500"
      size={18}
    />

    <input
      type="text"
      placeholder="Quick Search"
      className="w-full bg-slate-50 border border-transparent focus:border-blue-100 focus:bg-white pl-12 pr-4 py-2.5 rounded-xl outline-none transition-all font-medium text-sm text-slate-600 shadow-sm"
    />
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-6">

    {/* Notification */}
    <button className="relative p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
      <Bell size={20} />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
    </button>

    {/* Settings */}
    <button
      className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
      onClick={() => navigate("/settings")}
    >
      <Settings size={20} />
    </button>

    <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

    {/* Profile */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 cursor-pointer group"
    >

      <div className="text-right hidden md:block">
        <p
          className="text-sm font-black text-slate-800 tracking-tight"
          onClick={() => navigate("/profile")}
        >
          {userName}
        </p>

        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
          Verified Editor
        </p>
      </div>

      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 border-2 border-white group-hover:rotate-6 transition-transform">
        <User size={20} />
      </div>

    </motion.div>

  </div>

</nav>
```

);
}

export default Topbar;
