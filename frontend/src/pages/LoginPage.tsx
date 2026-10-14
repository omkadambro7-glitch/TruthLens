import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MahiraIcon } from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, AlertCircle, Sparkles, GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, login, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const qEmail = searchParams.get('email');
    if (qEmail) {
      setEmail(qEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const result = await login(email, password);
    if (result.success) {
      // Check stored user role for redirection
      const savedUserStr = localStorage.getItem('truthlens_user');
      const savedRole = savedUserStr ? JSON.parse(savedUserStr)?.role : 'individual';
      if (savedRole === 'reviewer') {
        navigate('/university');
      } else if (savedRole === 'student') {
        navigate('/verify/certificate');
      } else {
        navigate('/verify/image');
      }
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
        <MahiraIcon size={48} />
        <h1 className="text-3xl font-black text-[#0B1B3D] font-display tracking-tight">
          {t('auth.signin_title')}
        </h1>
        <p className="text-xs text-[#556987] max-w-xs">
          Access the Mahira forensic intelligence desk & review records
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#0B1B3D]/15 shadow-xl space-y-5">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0B1B3D]/20 text-xs text-[#0B1B3D] focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0B1B3D]/20 text-xs text-[#0B1B3D] focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] font-bold text-xs py-3 rounded-xl shadow-md border border-[#C5A059]/50 disabled:opacity-50 transition-all cursor-pointer active:scale-95"
          >
            {loading ? t('auth.signing_in') : t('auth.signin_btn')}
          </button>
        </form>

        {/* 1-Click Instant Demo Experience */}
        <div className="pt-5 border-t border-[#0B1B3D]/10 text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0B1B3D]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Instant Demo Session</span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleInstantDemo('reviewer')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-2.5 rounded-xl hover:bg-[#F2ECE0] transition-all cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                <div>
                  <div className="font-bold text-[11px] text-[#0B1B3D]">Dr. Eleanor Vance (Reviewer)</div>
                  <div className="text-[10px] text-[#64748B] font-medium">National Metropolitan University</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#9A7B38] bg-white px-2 py-0.5 rounded-md border border-[#C5A059]/30">
                Open Queue →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemo('student')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#0B1B3D] bg-[#F0F4FA] border border-[#0B1B3D]/15 px-3.5 py-2.5 rounded-xl hover:bg-[#E2E8F0] transition-all cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#0B1B3D]" />
                <div>
                  <div className="font-bold text-[11px] text-[#0B1B3D]">Karan Malhotra (Student)</div>
                  <div className="text-[10px] text-[#64748B] font-medium">Self-Check & Submissions</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#0B1B3D] bg-white px-2 py-0.5 rounded-md border border-[#0B1B3D]/15">
                Verify Cert →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemo('individual')}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-[#0B1B3D] bg-white border border-[#0B1B3D]/10 px-3.5 py-2 rounded-xl hover:bg-[#F0F4FA] transition-all cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-semibold text-[#556987]">Aarav Sharma (Investigator)</span>
              </div>
              <span className="text-[10px] font-bold text-[#556987]">Check Media →</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#556987]">
        {t('auth.no_account')}{' '}
        <Link to="/register" className="font-bold text-[#0B1B3D] hover:text-[#C5A059] underline">
          {t('auth.register_btn')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
