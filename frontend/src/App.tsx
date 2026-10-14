import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Route-level code splitting with React.lazy
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ImageVerifyPage = lazy(() => import('./pages/ImageVerifyPage'));
const CertificateVerifyPage = lazy(() => import('./pages/CertificateVerifyPage'));
const AccuracyPage = lazy(() => import('./pages/AccuracyPage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const SosPage = lazy(() => import('./pages/SosPage'));
const UniversityPage = lazy(() => import('./pages/UniversityPage'));
const ReportDetailPage = lazy(() => import('./pages/ReportDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

import { AboutPage, PrivacyPage, TermsPage, AccessibilityPage } from './pages/PolicyPages';

const PageFallback: React.FC = () => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-3">
    <div className="w-8 h-8 border-3 border-[#DC052D] border-t-transparent rounded-full animate-spin mx-auto" />
    <span className="text-xs text-[#001F4D] font-bold block">Loading TruthLens interface...</span>
  </div>
);

const NotFoundPage: React.FC = () => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
    <h1 className="text-5xl font-black text-[#001F4D] font-display">404</h1>
    <h2 className="text-xl font-bold text-[#001F4D]">Page Not Found</h2>
    <p className="text-xs text-slate-500">The verification artifact or page you are looking for does not exist.</p>
    <Link to="/" className="inline-block mt-4 text-xs font-bold text-white bg-gradient-to-r from-[#DC052D] to-[#990000] px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all">
      Return to Scanner
    </Link>
  </div>
);

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0F172A]">
      {/* Top Navbar with pinned Logo and action controls */}
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Workspace: Sidebar on left + Content on right */}
      <div className="flex flex-1 w-full relative">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <main className={`flex-1 overflow-x-hidden min-w-0 pb-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'
        }`}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/verify/image" element={<ImageVerifyPage />} />
              <Route path="/verify/certificate" element={<CertificateVerifyPage />} />
              <Route path="/accuracy" element={<AccuracyPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/:slug" element={<LearnPage />} />
              <Route path="/sos" element={<SosPage />} />
              <Route path="/university" element={<UniversityPage />} />
              <Route path="/university/review-queue" element={<UniversityPage />} />
              <Route path="/dashboard/reports/:id" element={<ReportDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
