import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruthLensLogo } from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const success = await login(email, password);
    if (success) {
      navigate('/university');
    } else {
      setErrorMsg('Invalid email or password. You can also sign in with demo accounts.');
      setLoading(false);
    }
  };

  const fillDemoAccount = (role: 'reviewer' | 'student') => {
    if (role === 'reviewer') {
      setEmail('reviewer@truthlens.org');
      setPassword('truthlens2026!');
    } else {
      setEmail('student@truthlens.org');
      setPassword('truthlens2026!');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 w-full flex flex-col gap-6 text-left">
      <div className="text-center flex flex-col items-center gap-2">
        <TruthLensLogo variant="icon" size={48} />
        <h1 className="text-2xl font-extrabold text-[#20252B] font-display">Sign In to TruthLens</h1>
        <p className="text-xs text-[#68717D]">Access university review queue and history</p>
      </div>

      <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF] space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#20252B] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5D2C8] text-xs focus:outline-hidden focus:border-[#116B67]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20252B] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5D2C8] text-xs focus:outline-hidden focus:border-[#116B67]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full brand-gradient text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:opacity-95 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Fast-fill */}
        <div className="pt-4 border-t border-[#E8E6DF] text-center space-y-2">
          <span className="text-[11px] text-[#68717D] block">Fast Demo Accounts:</span>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('reviewer')}
              className="text-[11px] font-bold text-[#116B67] bg-[#E6F3F2] px-3 py-1 rounded-lg hover:bg-[#BCE3E0]"
            >
              Demo Reviewer
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('student')}
              className="text-[11px] font-bold text-[#7663D8] bg-[#EFEFFC] px-3 py-1 rounded-lg hover:bg-[#DDD6FE]"
            >
              Demo Student
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#68717D]">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-[#116B67] hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
