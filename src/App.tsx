
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
import UserManagement from "./pages/Admin/UserManagement";
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
              <Routes>
                <Route index element={<Index />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="chats" element={<Chats />} />
                <Route path="connect" element={<Connect />} />
                <Route path="clients" element={<Clients />} />
                
                {/* Admin routes */}
                <Route path="admin">
                  <Route path="users" element={
                    <AdminRoute>
                      <UserManagement />
                    </AdminRoute>
                  } />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
      
      <Toaster />
    </Router>
  );
}

export default App;
