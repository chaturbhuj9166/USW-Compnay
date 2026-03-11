import { useState } from "react";
import { Lock, Bell, Moon, Globe, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";

function Settings() {
  const [passwords, setPasswords] = useState({ old: "", new: "" });

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    toast.success("Security settings updated!");
  };

  return (
    <div className="p-6 lg:p-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <Lock className="text-blue-600" /> Account Settings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-white text-blue-600 rounded-2xl font-bold shadow-sm border border-blue-100">
              <Lock size={18} /> Password & Security
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-slate-500 hover:bg-white rounded-2xl font-bold transition-all">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-slate-500 hover:bg-white rounded-2xl font-bold transition-all">
              <Globe size={18} /> Language
            </button>
          </div>

        
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Change Password</h3>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                  <input type="password" required className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <input type="password" required className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all" />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2">
                  <Save size={18} /> Update Password
                </button>
              </form>
            </div>

            <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
              <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                <Trash2 size={20} /> Danger Zone
              </h3>
              <button className="mt-4 bg-white text-red-600 border border-red-200 px-6 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;