import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import PostNews from "./pages/PostNews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditNews from "./pages/EditNews";
import Profile from "./pages/Profile";
import Settings from "./pages/Setting";
import ViewNews from "./pages/ViewNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewsList />} /> {/* Sidebar link should point here */}
          <Route path="post-news" element={<PostNews />} />
          <Route path="news-management/:id" element={<EditNews />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Safety Redirect: If someone hits /news-management without ID, send to list */}
          <Route path="news-management" element={<Navigate to="/news" />} />
          <Route path="/view-news/:id" element={<ViewNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;