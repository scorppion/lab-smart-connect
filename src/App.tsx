
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Toaster } from "./components/ui/sonner";
import Index from "./pages/Index";
import Agenda from "./pages/Agenda";
import Chats from "./pages/Chats";
import Connect from "./pages/Connect";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserManagement from "./pages/Admin/UserManagement";
import Services from "./pages/Services";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <Index />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/agenda" element={
          <ProtectedRoute>
            <MainLayout>
              <Agenda />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/services" element={
          <ProtectedRoute>
            <MainLayout>
              <Services />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/chats" element={
          <ProtectedRoute>
            <MainLayout>
              <Chats />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/connect" element={
          <ProtectedRoute>
            <MainLayout>
              <Connect />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/clients" element={
          <ProtectedRoute>
            <MainLayout>
              <Clients />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/users" element={
          <AdminRoute>
            <MainLayout>
              <UserManagement />
            </MainLayout>
          </AdminRoute>
        } />
        
        <Route path="*" element={
          <ProtectedRoute>
            <MainLayout>
              <NotFound />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
      
      <Toaster />
    </Router>
  );
}

export default App;
