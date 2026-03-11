import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Newspaper, 
  PlusCircle, 
  UserCircle, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronRight
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) => `
    group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
    ${isActive 
      ? "bg-blue-600 text-white shadow-xl shadow-blue-500/40 translate-x-1" 
      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
    }
  `;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 z-[60] bg-[#0F172A] border-r border-white/5 flex flex-col shadow-[10px_0_40px_rgba(0,0,0,0.3)]">
      
      {/* 1. Brand Section */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Newspaper size={20} className="text-white" />
          </div>
          <div>
            <span className="block font-black text-lg tracking-tight text-white uppercase leading-none">Press Portal</span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[2px] mt-1 block">Journalist CMS</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Area */}
      <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1 custom-scrollbar">
        <div className="text-[10px] uppercase tracking-[3px] font-black text-slate-500 mb-4 mt-2 px-2">Main Menu</div>
        
        <NavLink to="/dashboard" className={linkClass}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} />
            <span className="font-bold text-[13px]">Dashboard Overview</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>

        <NavLink to="/news" className={linkClass}>
          <div className="flex items-center gap-3">
            <Newspaper size={18} />
            <span className="font-bold text-[13px]">News Management</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>

        {/* Note: Path matched with PostNews component */}
        <NavLink to="/post-news" className={linkClass}>
          <div className="flex items-center gap-3">
            <PlusCircle size={18} />
            <span className="font-bold text-[13px]">Publish Article</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>

        <div className="pt-10 text-[10px] uppercase tracking-[3px] font-black text-slate-500 mb-4 px-2">Account</div>

        {/* Fixed Profile Route */}
        <NavLink to="/profile" className={linkClass}>
          <div className="flex items-center gap-3">
            <UserCircle size={18} />
            <span className="font-bold text-[13px]">My Journalist Bio</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>

        {/* Fixed Settings Route */}
        <NavLink to="/settings" className={linkClass}>
          <div className="flex items-center gap-3">
            <Settings size={18} />
            <span className="font-bold text-[13px]">System Settings</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>
      </nav>

      {/* 3. Bottom Footer Area */}
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-400 mb-1.5">
              <Sparkles size={14} className="animate-pulse" />
              <span className="font-black text-[9px] uppercase tracking-widest">AI Tools</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Summarize long news reports instantly.
            </p>
          </div>
          <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-blue-500/10 rounded-full blur-xl transition-all duration-500 group-hover:bg-blue-500/20"></div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-black text-[11px] uppercase tracking-widest border border-red-500/10"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;