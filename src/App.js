import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Documents from './pages/dashboard/Documents';
import News from './pages/dashboard/News';
import Community from './pages/dashboard/Community';
import Guidelines from './pages/dashboard/Guidelines';
import Budget from './pages/dashboard/Budget';
import Profile from './pages/dashboard/Profile';
import GuidelineDetail from './pages/dashboard/GuidelineDetail';
import Deals from './pages/dashboard/Deals';

// Layout component that conditionally renders Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="documents" element={<Documents />} />
              <Route path="news" element={<News />} />
              <Route path="community" element={<Community />} />
              <Route path="guidelines" element={<Guidelines />} />
              <Route path="guidelines/:slug" element={<GuidelineDetail />} />
              <Route path="budget" element={<Budget />} />
              <Route path="profile" element={<Profile />} />
              <Route path="deals" element={<Deals />} />
            </Route>
          </Routes>
        </Layout>
        <ToastContainer position="top-right" />
      </Router>
    </AuthProvider>
  );
};

export default App; 