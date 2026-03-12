import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock, Mail, ChevronRight, Newspaper } from "lucide-react";
import API from "../config/api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/api/auth/login",
        form,
        { withCredentials: true }
      );

      console.log("Login response:", res.data);

      if (res.data && res.data.user) {

        // user info store (token cookie me hai backend par)
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login Successful!");

        navigate("/dashboard");

      } else {

        toast.error("Invalid response from server");

      }

    } catch (error) {

      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-sans selection:bg-blue-100">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl h-[600px] flex shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden border border-white m-4">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] p-12 flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white mb-12">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                <Newspaper size={20} />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase">Journalist CMS</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white leading-tight">
              Manage your <br />
              <span className="text-blue-500">Stories</span> with <br />
              Precision.
            </h1>

            <p className="text-slate-400 mt-6 max-w-sm leading-relaxed">
              सच्चाई को दुनिया के सामने लाना आपका काम है, उसे मैनेज करना हमारा।
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 bg-white p-10 md:p-16 flex flex-col justify-center">

          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 font-medium mt-2 text-sm">
              Please enter your credentials to log in.
            </p>
          </div>

          <form onSubmit={login} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">
                Official Email
              </label>

              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="name@portal.com"
                  required
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">

              <label className="text-[10px] uppercase tracking-[2px] font-black text-slate-400 block ml-1">
                Password
              </label>

              <div className="relative group">

                <Lock className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-12 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? "Authenticating..." : "Sign In"}
              <ChevronRight size={16} />
            </button>

          </form>

          <p className="text-center mt-10 text-slate-400 text-xs font-bold uppercase tracking-widest">
            New to the portal?
            <Link to="/register" className="text-blue-600 ml-2 hover:underline">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;