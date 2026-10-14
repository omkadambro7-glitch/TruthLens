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
const VideoVerifyPage = lazy(() => import('./pages/VideoVerifyPage'));
const VoiceVerifyPage = lazy(() => import('./pages/VoiceVerifyPage'));
const TextVerifyPage = lazy(() => import('./pages/TextVerifyPage'));
const InvoiceVerifyPage = lazy(() => import('./pages/InvoiceVerifyPage'));
const KycVerifyPage = lazy(() => import('./pages/KycVerifyPage'));
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
    <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
    <span className="text-xs text-[#556987] font-bold block">Loading Zenin interface...</span>
  </div>
);

const NotFoundPage: React.FC = () => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
    <h1 className="text-5xl font-black text-[#0B1B3D] font-display">404</h1>
    <h2 className="text-xl font-bold text-[#0B1B3D]">Page Not Found</h2>
    <p className="text-xs text-[#556987]">The verification artifact or page you are looking for does not exist.</p>
    <Link to="/" className="inline-block mt-4 text-xs font-bold text-[#FAFBFD] bg-[#0B1B3D] hover:bg-[#142A5C] px-6 py-3 rounded-full shadow-lg border border-[#C5A059]/40 transition-all">
      Return to Scanner
    </Link>
  </div>
);

function AppContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFD] text-[#0B1B3D]">
      {/* Top Glass Navbar with drawer trigger and quick links */}
      <Navbar onToggleDrawer={() => setDrawerOpen(true)} />

      {/* Slide-Over Floating Glass Drawer */}
      <Sidebar 
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Main Workspace: 100% full-width, luminous, editorial */}
      <main className="flex-1 overflow-x-hidden min-w-0 pb-16">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/verify/image" element={<ImageVerifyPage />} />
            <Route path="/verify/certificate" element={<CertificateVerifyPage />} />
            <Route path="/verify/video" element={<VideoVerifyPage />} />
            <Route path="/verify/deepfake" element={<VideoVerifyPage />} />
            <Route path="/verify/voice" element={<VoiceVerifyPage />} />
            <Route path="/verify/audio" element={<VoiceVerifyPage />} />
            <Route path="/verify/text" element={<TextVerifyPage />} />
            <Route path="/verify/invoice" element={<InvoiceVerifyPage />} />
            <Route path="/verify/receipt" element={<InvoiceVerifyPage />} />
            <Route path="/verify/kyc" element={<KycVerifyPage />} />
            <Route path="/verify/id" element={<KycVerifyPage />} />
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
