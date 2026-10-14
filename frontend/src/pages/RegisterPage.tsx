import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruthLensLogo } from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, User, AlertCircle, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('individual');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const result = await register(fullName, email, password, role);
    if (result.success) {
      setSuccessMsg('Account safalta-purvak ban gaya! Redirecting...');
      setTimeout(() => {
        if (role === 'reviewer') {
          navigate('/university');
        } else if (role === 'student') {
          navigate('/verify/certificate');
        } else {
          navigate('/verify/image');
        }
      }, 500);
    } else {
      setErrorMsg(result.error || 'Registration could not be completed. You can also explore instantly with Demo Mode.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 w-full flex flex-col gap-6 text-left">
      <div className="text-center flex flex-col items-center gap-2">
        <TruthLensLogo variant="icon" size={52} />
        <h1 className="text-3xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
          {t('auth.register_title')}
        </h1>
        <p className="text-xs text-[#687386] max-w-xs">
          Free-first verification access for students, researchers & institutions
        </p>
      </div>

      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-4">
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
            <span className="leading-relaxed font-bold">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
            {errorMsg.includes('registered') && (
              <Link 
                to={`/login?email=${encodeURIComponent(email)}`}
                className="ml-6 text-xs font-bold text-[#233F8C] underline hover:text-[#101B35]"
              >
                👉 Click here to Sign In with {email}
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#101B35] mb-1.5">
              {t('auth.fullname')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#737D90] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Eleanor Vance"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] focus:ring-2 focus:ring-[#233F8C]/10 bg-white"
              />
            </div>
          </div>

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
                placeholder="eleanor@university.edu"
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] focus:ring-2 focus:ring-[#233F8C]/10 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#101B35] mb-1.5">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#D8D4C7] bg-white text-xs font-bold text-[#101B35]"
            >
              <option value="individual">Public Individual / Researcher</option>
              <option value="student">Student</option>
              <option value="reviewer">University Reviewer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:shadow-md hover:border-[#C6A45C] border border-transparent disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? "Creating Account..." : t('auth.register_btn')}
          </button>
        </form>

        <div className="pt-3 border-t border-[#F1EFE8] text-center">
          <button
            type="button"
            onClick={() => {
              loginAsDemo('reviewer');
              navigate('/university');
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#233F8C] hover:text-[#101B35]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
            <span>Or explore immediately via 1-Click Demo Mode →</span>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-[#687386]">
        {t('auth.have_account')}{' '}
        <Link to="/login" className="font-bold text-[#233F8C] hover:underline">
          {t('auth.signin_btn')}
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
