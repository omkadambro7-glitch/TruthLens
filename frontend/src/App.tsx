import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import LandingPage from './pages/LandingPage';
import ImageVerifyPage from './pages/ImageVerifyPage';
import CertificateVerifyPage from './pages/CertificateVerifyPage';
import AccuracyPage from './pages/AccuracyPage';
import LearnPage from './pages/LearnPage';
import SosPage from './pages/SosPage';
import UniversityPage from './pages/UniversityPage';
import ReportDetailPage from './pages/ReportDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AboutPage, PrivacyPage, TermsPage, AccessibilityPage } from './pages/PolicyPages';

const NotFoundPage: React.FC = () => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
    <h1 className="text-4xl font-extrabold text-[#116B67] font-display">404</h1>
    <h2 className="text-xl font-bold text-[#20252B]">Page Not Found</h2>
    <p className="text-xs text-[#68717D]">The verification artifact or page you are looking for does not exist.</p>
    <Link to="/" className="inline-block mt-4 text-xs font-bold text-white brand-gradient px-4 py-2.5 rounded-xl shadow-xs">
      Return Home
    </Link>
  </div>
);

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#20252B]">
            <Navbar />
            <main className="flex-1">
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
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
