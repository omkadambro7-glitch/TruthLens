import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TruthLensLogo } from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Building, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('individual');
  const [orgSlug, setOrgSlug] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const success = await register(fullName, email, password, role, orgSlug || undefined);
    if (success) {
      navigate('/university');
    } else {
      setErrorMsg('Registration failed. The email address may already be in use.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 w-full flex flex-col gap-6 text-left">
      <div className="text-center flex flex-col items-center gap-2">
        <TruthLensLogo variant="icon" size={48} />
        <h1 className="text-2xl font-extrabold text-[#20252B] font-display">Create TruthLens Account</h1>
        <p className="text-xs text-[#68717D]">Free-first access for students, researchers & institutions</p>
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
            <label className="block text-xs font-bold text-[#20252B] mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Eleanor Vance"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5D2C8] text-xs focus:outline-hidden focus:border-[#116B67]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20252B] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@university.edu"
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5D2C8] text-xs focus:outline-hidden focus:border-[#116B67]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20252B] mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#D5D2C8] bg-white text-xs font-semibold"
            >
              <option value="individual">Public Individual / Researcher</option>
              <option value="student">Student</option>
              <option value="reviewer">University Reviewer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full brand-gradient text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:opacity-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-[#68717D]">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#116B67] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
