import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
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
    <div className="w-8 h-8 border-3 border-[#233F8C] border-t-transparent rounded-full animate-spin mx-auto" />
    <span className="text-xs text-[#737D90] font-bold block">Loading TruthLens interface...</span>
  </div>
);

const NotFoundPage: React.FC = () => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
    <h1 className="text-5xl font-extrabold text-[#101B35] font-serif-display">404</h1>
    <h2 className="text-xl font-bold text-[#101B35]">Page Not Found</h2>
    <p className="text-xs text-[#687386]">The verification artifact or page you are looking for does not exist.</p>
    <Link to="/" className="inline-block mt-4 text-xs font-bold text-white bg-gradient-to-r from-[#101B35] to-[#233F8C] px-5 py-3 rounded-xl shadow-xs hover:border-[#C6A45C] border border-transparent transition-all">
      Return Home
    </Link>
  </div>
);

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#192338]">
            <Navbar />
            <main className="flex-1">
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
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
