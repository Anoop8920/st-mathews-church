import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Priests from './pages/public/Priests';
import MassTimings from './pages/public/MassTimings';
import Announcements from './pages/public/Announcements';
import Events from './pages/public/Events';
import Gallery from './pages/public/Gallery';
import Ministries from './pages/public/Ministries';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';

// Protected Pages
import Directory from './pages/directory/Directory';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManageEvents from './pages/admin/ManageEvents';
import ManageGallery from './pages/admin/ManageGallery';
import ManageFamilies from './pages/admin/ManageFamilies';
import ManageMembers from './pages/admin/ManageMembers';
import ManagePriests from './pages/admin/ManagePriests';
import ManageMinistries from './pages/admin/ManageMinistries';
import ManageMassTimings from './pages/admin/ManageMassTimings';
import ManageDownloads from './pages/admin/ManageDownloads';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/priests"
            element={
              <Layout>
                <Priests />
              </Layout>
            }
          />
          <Route
            path="/mass-timings"
            element={
              <Layout>
                <MassTimings />
              </Layout>
            }
          />
          <Route
            path="/announcements"
            element={
              <Layout>
                <Announcements />
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <Events />
              </Layout>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout>
                <Gallery />
              </Layout>
            }
          />
          <Route
            path="/ministries"
            element={
              <Layout>
                <Ministries />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* Auth Route */}
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          {/* Protected Member Route */}
          <Route
            path="/directory"
            element={
              <Layout>
                <ProtectedRoute requiredRole="member">
                  <Directory />
                </ProtectedRoute>
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="announcements" element={<ManageAnnouncements />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="families" element={<ManageFamilies />} />
            <Route path="members" element={<ManageMembers />} />
            <Route path="priests" element={<ManagePriests />} />
            <Route path="ministries" element={<ManageMinistries />} />
            <Route path="mass-timings" element={<ManageMassTimings />} />
            <Route path="downloads" element={<ManageDownloads />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="container-section text-center pt-32">
                  <h1 className="text-6xl font-bold text-primary-200 mb-4">404</h1>
                  <h2 className="text-2xl font-bold text-primary-500 mb-2">
                    Page Not Found
                  </h2>
                  <p className="text-gray-500">
                    The page you are looking for does not exist.
                  </p>
                </div>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
