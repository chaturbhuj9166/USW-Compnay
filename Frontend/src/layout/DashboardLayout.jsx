import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 1. Sidebar: ये हमेशा Fixed रहेगा और Width 72 (288px) लेगा */}
      <Sidebar />

      {/* 2. Main Content Wrapper: यहाँ ml-72 लगाना सबसे ज़रूरी है */}
      <div className="flex-1 flex flex-col ml-72 transition-all duration-300">
        
        {/* Topbar: ये ऊपर चिपका रहेगा */}
        <Topbar />

        {/* 3. Page Content Area: जहाँ सारे Pages दिखेंगे */}
        <main className="p-8 mt-4">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;