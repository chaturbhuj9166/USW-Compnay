import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Phone, Lock, AtSign, ChevronRight, Newspaper } from "lucide-react";
import API from "../config/api";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", username: "", phone: "", password: ""
  });

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length > 10) return;
      setForm({ ...form, phone: value });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      return toast.error("Phone number must be 10 digits");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/register`, form,);
      toast.success(res.data.message || "Account created!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-sans selection:bg-blue-100 p-4">
      

      <div className="w-full max-w-6xl h-auto lg:h-[750px] flex flex-col lg:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden border border-white bg-white">
        
      
        <div className="hidden lg:flex lg:w-2/5 bg-[#0F172A] p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white mb-12">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                <Newspaper size={20} />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-white">Press Portal</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white leading-tight">
              Join the <br />
              <span className="text-blue-500">Circle of</span> <br />
              Truth Seekers.
            </h1>
            <p className="text-slate-400 mt-6 text-sm leading-relaxed max-w-xs">
              दुनिया को सच दिखाने के लिए एक मज़बूत शुरुआत ज़रूरी है। हमारे साथ जुड़ें और अपनी पत्रकारिता को नई ऊँचाइयों पर ले जाएँ।
            </p>
          </div>

          <div className="relative z-10 border-l-2 border-blue-600 pl-4">
            <p className="text-white font-bold text-sm italic">"Journalism can never be silent: that is its greatest virtue and its greatest fault."</p>
          </div>
        </div>

        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-slate-400 font-medium mt-1 text-sm">Join our elite network of journalists.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input name="name" onChange={handleChange} required placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">Username</label>
              <div className="relative group">
                <AtSign className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input name="username" onChange={handleChange} required placeholder="Enter your username"
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input name="email" type="email" onChange={handleChange} required placeholder="Enter your email address"
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Enter your phone number"
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} required placeholder="•••••••• (At least 6 characters)"
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-300 hover:text-slate-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={loading} className="md:col-span-2 w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
              {loading ? "Creating Account..." : "Create My Account"}
              <ChevronRight size={16} />
            </button>
          </form>

          <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            Already a member? 
            <Link to="/login" className="text-blue-600 ml-2 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;