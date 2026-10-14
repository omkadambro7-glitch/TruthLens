import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ZeninIcon } from '../components/brand/Logo';
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
      setSuccessMsg('Account successfully registered! Redirecting to workspace...');
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
        <ZeninIcon size={52} />
        <h1 className="text-3xl font-black text-[#0B1B3D] font-display tracking-tight">
          {t('auth.register_title')}
        </h1>
        <p className="text-xs text-[#556987] max-w-xs">
          Free-first verification access for citizens, researchers & organizations
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#0B1B3D]/15 shadow-xl space-y-4">
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
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
                className="ml-6 text-xs font-bold text-[#0B1B3D] underline hover:text-[#C5A059]"
              >
                👉 Click here to Sign In with {email}
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
              {t('auth.fullname')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Eleanor Vance"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0B1B3D]/20 text-xs text-[#0B1B3D] focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-white"
              />
            </div>
          </div>

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
                placeholder="eleanor@university.edu"
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#0B1B3D]/20 text-xs text-[#0B1B3D] focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#0B1B3D]/20 bg-white text-xs font-bold text-[#0B1B3D]"
            >
              <option value="individual">Public Individual / Investigator</option>
              <option value="student">Student / Submissions</option>
              <option value="reviewer">University Reviewer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] font-bold text-xs py-3 rounded-xl shadow-md border border-[#C5A059]/50 disabled:opacity-50 transition-all cursor-pointer active:scale-95"
          >
            {loading ? "Creating Account..." : t('auth.register_btn')}
          </button>
        </form>

        <div className="pt-3 border-t border-[#0B1B3D]/10 text-center">
          <button
            type="button"
            onClick={() => {
              loginAsDemo('reviewer');
              navigate('/university');
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0B1B3D] hover:text-[#C5A059] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Or explore immediately via 1-Click Demo Mode →</span>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-[#556987]">
        {t('auth.have_account')}{' '}
        <Link to="/login" className="font-bold text-[#0B1B3D] hover:text-[#C5A059] underline">
          {t('auth.signin_btn')}
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
