import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruthLensLogo } from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, AlertCircle, Sparkles, GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const result = await login(email, password);
    if (result.success) {
      navigate('/university');
    } else {
      setErrorMsg(result.error || t('auth.error_invalid'));
      setLoading(false);
    }
  };

  const handleInstantDemo = (role: 'reviewer' | 'student' | 'individual') => {
    loginAsDemo(role);
    if (role === 'reviewer') {
      navigate('/university');
    } else if (role === 'student') {
      navigate('/verify/certificate');
    } else {
      navigate('/verify/image');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 w-full flex flex-col gap-6 text-left">
      <div className="text-center flex flex-col items-center gap-2">
        <TruthLensLogo variant="icon" size={52} />
        <h1 className="text-3xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
          {t('auth.signin_title')}
        </h1>
        <p className="text-xs text-[#687386] max-w-xs">
          {t('auth.signin_sub')}
        </p>
      </div>

      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-5">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#101B35] mb-1.5">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#737D90] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] focus:ring-2 focus:ring-[#233F8C]/10 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#101B35] mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#737D90] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] focus:ring-2 focus:ring-[#233F8C]/10 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:shadow-md hover:border-[#C6A45C] border border-transparent disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? t('auth.signing_in') : t('auth.signin_btn')}
          </button>
        </form>

        {/* 1-Click Instant Demo Experience */}
        <div className="pt-5 border-t border-[#F1EFE8] text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#101B35]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
            <span>{t('auth.or_demo')}</span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleInstantDemo('reviewer')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#101B35] bg-[#FBF8EE] border border-[#E6D5A2] px-3.5 py-2.5 rounded-xl hover:bg-[#F5EFD7] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C6A45C]" />
                <div>
                  <div className="font-extrabold text-[11px] text-[#101B35]">Dr. Eleanor Vance (Reviewer)</div>
                  <div className="text-[10px] text-[#737D90] font-medium">National Metropolitan University</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-extrabold text-[#A88234] bg-white px-2 py-0.5 rounded-md border border-[#E6D5A2]">
                Open Queue →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemo('student')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#101B35] bg-[#EEF3FF] border border-[#C5D5F9] px-3.5 py-2.5 rounded-xl hover:bg-[#DDE7FF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#233F8C]" />
                <div>
                  <div className="font-extrabold text-[11px] text-[#101B35]">Karan Malhotra (Student)</div>
                  <div className="text-[10px] text-[#737D90] font-medium">Self-Check & Submissions</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-extrabold text-[#233F8C] bg-white px-2 py-0.5 rounded-md border border-[#C5D5F9]">
                Verify Cert →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemo('individual')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#101B35] bg-white border border-[#E8E5DC] px-3.5 py-2 rounded-xl hover:bg-[#F6F4EE] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E824C]" />
                <span className="text-[11px] font-semibold text-[#687386]">Aarav Sharma (Investigator)</span>
              </div>
              <span className="text-[10px] font-bold text-[#687386]">Check Media →</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#687386]">
        {t('auth.no_account')}{' '}
        <Link to="/register" className="font-bold text-[#233F8C] hover:underline">
          {t('auth.register_btn')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
