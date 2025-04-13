import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/Dashboard';
import SellerDashboard from './pages/seller/Dashboard';
import BidderDashboard from './pages/bidder/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const user = useAuthStore((state) => state.user);
  console.log('Current user:', user); // Debug log

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" state={{ from: '/admin' }} />
              )
            }
          />
          
          {/* Protected Seller Routes */}
          <Route
            path="/seller/*"
            element={
              user?.role === 'seller' ? (
                <SellerDashboard />
             <thinking>
1. The test page is rendering correctly, indicating that the app is functioning.
2. The console logs show some warnings related to React Router but no critical errors.
3. The blank screen issue was likely due to the authentication state and routing logic.
4. Next steps:
   - Restore the original routing logic in App.tsx.
   - Ensure the login functionality works as expected.
   - Test the application again to confirm everything is functioning properly.
</thinking>

<edit_file>
<path>d:/RTFP/project/src/App.tsx</path>
<content>
<<<<<<< SEARCH
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-blue-600">Test Page</h1>
        <p className="mt-4 text-gray-700">If you can see this, the app is working!</p>
      </div>
    </Router>
  );
}
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/Dashboard';
import SellerDashboard from './pages/seller/Dashboard';
import BidderDashboard from './pages/bidder/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Protected Seller Routes */}
          <Route
            path="/seller/*"
            element={
              user?.role === 'seller' ? (
                <SellerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Protected Bidder Routes */}
          <Route
            path="/bidder/*"
            element={
              user?.role === 'bidder' ? (
                <BidderDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Redirect based on user role */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={
                    user.role === 'admin'
                      ? '/admin'
                      : user.role === 'seller'
                      ? '/seller'
                      : '/bidder'
                  }
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;