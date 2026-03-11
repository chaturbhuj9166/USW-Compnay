import { useState, useEffect } from "react";
import { User, Mail, Shield, Calendar, Edit3, Camera } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
   
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  return (
    <div className="p-6 lg:p-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
    
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full -mr-20 -mt-20"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                {user.name?.charAt(0) || "U"}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-slate-800">{user.name || "Journalist Name"}</h1>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">Verified Press Member</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </span>
                <span className="bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 flex items-center gap-2">
                  <Shield size={16} /> Role: {user.role || "Editor"}
                </span>
              </div>
            </div>
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Stories</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">124</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Monthly Views</p>
            <h3 className="text-3xl font-black text-blue-600 mt-2">45.2K</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Experience</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2">2 yrs</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;