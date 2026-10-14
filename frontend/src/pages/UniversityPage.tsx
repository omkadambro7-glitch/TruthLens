import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  ShieldCheck,
  Building,
  User as UserIcon,
  MessageSquare,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { Modal } from '../components/ui/Modal';
import { ReviewCase } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_REVIEW_CASES, getApiBaseUrl } from '../utils/apiClient';

export const UniversityPage: React.FC = () => {
  const { user, isDemo, loginAsDemo } = useAuth();
  const { t } = useLanguage();

  const [cases, setCases] = useState<ReviewCase[]>(SAMPLE_REVIEW_CASES);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<ReviewCase | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const apiBase = getApiBaseUrl();
      const token = localStorage.getItem('truthlens_token');
      if (!token) return;

      const res = await fetch(`${apiBase}/api/v1/university/queue`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setCases(data);
        }
      }
    } catch {
      // Fallback to seeded demo cases
      setCases(SAMPLE_REVIEW_CASES);
    }
  };

  const handleOpenCase = (c: ReviewCase) => {
    setSelectedCase(c);
    setReviewerNotes(c.reviewer_notes || '');
    setActionNotice(null);
  };

  const handleDecision = (newStatus: 'resolved' | 'escalated' | 'under_review', noteText: string) => {
    if (!selectedCase) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const updated = cases.map(c => {
        if (c.id === selectedCase.id) {
          return {
            ...c,
            status: newStatus,
            reviewer_notes: noteText,
            resolution_date: newStatus === 'resolved' ? new Date().toISOString() : undefined
          };
        }
        return c;
      });

      setCases(updated);
      setSelectedCase(prev => prev ? { ...prev, status: newStatus, reviewer_notes: noteText } : null);
      setIsSubmitting(false);
      setActionNotice(`Case ${selectedCase.id} updated: Status changed to ${newStatus.toUpperCase()}`);
      setTimeout(() => setActionNotice(null), 3500);
    }, 500);
  };

  const filteredCases = cases.filter(c => {
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch = !searchQuery.trim() || 
      (c.patient_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.doctor_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.hospital_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const pendingCount = cases.filter(c => c.status === 'pending').length;
  const resolvedCount = cases.filter(c => c.status === 'resolved').length;
  const escalatedCount = cases.filter(c => c.status === 'escalated').length;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      
      {/* Reviewer Header */}
      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] px-3.5 py-1 rounded-full text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-[#C6A45C]" />
              <span>National Metropolitan University Academic Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
              {t('univ.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#687386] max-w-2xl leading-relaxed">
              {t('univ.subtitle')}
            </p>
          </div>

          {!user && (
            <button
              onClick={() => loginAsDemo('reviewer')}
              className="flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#F5EFD7] transition-all cursor-pointer w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
              <span>Sign in as Dr. Eleanor Vance (Demo)</span>
            </button>
          )}
        </div>

        {/* Active Reviewer Profile Banner */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#101B35]">
          <div className="flex items-center gap-2.5 font-medium">
            <UserIcon className="w-4 h-4 text-[#233F8C]" />
            <span>
              Active Reviewer: <strong className="font-extrabold text-[#101B35]">{user?.full_name || 'Dr. Eleanor Vance'}</strong> ({user?.role || 'Senior Academic Reviewer'})
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#737D90]">
            Tenant Isolation: NMU-2026-PROD-ENC
          </span>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="royal-card p-5 bg-white border border-[#E8E5DC]">
          <span className="text-xs font-bold text-[#737D90] uppercase tracking-wide">
            {t('univ.pending')}
          </span>
          <div className="text-3xl font-black text-[#101B35] mt-1 font-sans">{pendingCount}</div>
          <span className="text-[11px] text-[#A88234] font-bold mt-1 block">Requires manual determination</span>
        </div>

        <div className="royal-card p-5 bg-white border border-[#E8E5DC]">
          <span className="text-xs font-bold text-[#737D90] uppercase tracking-wide">
            {t('univ.approved')}
          </span>
          <div className="text-3xl font-black text-[#1E824C] mt-1 font-sans">{resolvedCount}</div>
          <span className="text-[11px] text-[#1E824C] font-semibold mt-1 block">Verified & leave granted</span>
        </div>

        <div className="royal-card p-5 bg-white border border-[#E8E5DC]">
          <span className="text-xs font-bold text-[#737D90] uppercase tracking-wide">
            {t('univ.escalated')}
          </span>
          <div className="text-3xl font-black text-[#DC2626] mt-1 font-sans">{escalatedCount}</div>
          <span className="text-[11px] text-[#DC2626] font-semibold mt-1 block">Clarification requested</span>
        </div>
      </div>

      {/* Queue Filter & Search Bar */}
      <div className="royal-card p-5 bg-white border border-[#E8E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-[#F6F4EE] p-1 rounded-xl border border-[#E8E5DC] text-xs font-bold text-[#687386]">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterStatus === 'all' ? 'bg-white text-[#101B35] font-extrabold shadow-xs' : 'hover:text-[#101B35]'}`}
          >
            {t('univ.all_cases')} ({cases.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterStatus === 'pending' ? 'bg-white text-[#101B35] font-extrabold shadow-xs' : 'hover:text-[#101B35]'}`}
          >
            {t('univ.pending')} ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterStatus === 'resolved' ? 'bg-white text-[#101B35] font-extrabold shadow-xs' : 'hover:text-[#101B35]'}`}
          >
            {t('univ.approved')} ({resolvedCount})
          </button>
          <button
            onClick={() => setFilterStatus('escalated')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterStatus === 'escalated' ? 'bg-white text-[#101B35] font-extrabold shadow-xs' : 'hover:text-[#101B35]'}`}
          >
            {t('univ.escalated')} ({escalatedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#737D90] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or clinic..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] bg-white"
          />
        </div>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Cases Queue Table */}
      <div className="royal-card bg-white border border-[#E8E5DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#E8E5DC] text-[#737D90] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">{t('univ.case_id')}</th>
                <th className="p-4">{t('univ.student')}</th>
                <th className="p-4">{t('univ.physician')}</th>
                <th className="p-4">{t('univ.risk')}</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">{t('univ.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFE8]">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-4 font-mono font-bold text-[#101B35]">
                    {c.id}
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold text-[#101B35] block">{c.patient_name || 'Anonymous Student'}</span>
                    <span className="text-[11px] text-[#737D90]">NMU Matriculation 2026</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#101B35] block">{c.doctor_name || 'Physician'}</span>
                    <span className="text-[11px] text-[#737D90] block truncate max-w-xs">{c.hospital_name}</span>
                  </td>
                  <td className="p-4">
                    <VerdictBadge verdict={c.risk_category} size="sm" />
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      c.status === 'resolved' 
                        ? 'text-[#1E824C] bg-[#EDF7F1]' 
                        : c.status === 'escalated'
                        ? 'text-[#DC2626] bg-[#FEF2F2]'
                        : 'text-[#A88234] bg-[#FBF8EE]'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenCase(c)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#233F8C] bg-[#EEF3FF] hover:bg-[#DDE7FF] border border-[#C5D5F9] transition-colors cursor-pointer"
                    >
                      {t('univ.inspect')} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Inspection Modal */}
      {selectedCase && (
        <Modal
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          title={`Case Assessment: ${selectedCase.id}`}
          subtitle={`Reviewing documentation for ${selectedCase.patient_name}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-left text-xs">
            {/* Meta summary */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#737D90] block">Student Patient</span>
                <span className="font-bold text-[#101B35] text-sm">{selectedCase.patient_name}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#737D90] block">Attending Physician</span>
                <span className="font-bold text-[#101B35] text-sm">{selectedCase.doctor_name}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase font-bold text-[#737D90] block">Hospital / Institution</span>
                <span className="font-medium text-[#101B35]">{selectedCase.hospital_name}</span>
              </div>
            </div>

            {/* Assessment Result */}
            <div>
              <span className="text-[10px] uppercase font-bold text-[#737D90] block mb-1">Pre-Check Determination</span>
              <VerdictBadge verdict={selectedCase.risk_category} size="md" />
            </div>

            {/* Reviewer Confidential Notes Area */}
            <div>
              <label className="block text-xs font-bold text-[#101B35] mb-1.5">
                {t('univ.notes_label')}
              </label>
              <textarea
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="Enter formal justification, clinic verification call logs, or request notes..."
                className="w-full h-24 p-3 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] bg-white resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#F1EFE8] flex flex-wrap items-center justify-between gap-3">
              <button
                disabled={isSubmitting}
                onClick={() => handleDecision('resolved', reviewerNotes || 'Approved: Validated medical documentation meets university policy.')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E824C] hover:bg-green-700 shadow-xs cursor-pointer"
              >
                ✓ {t('univ.approve_case')}
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => handleDecision('escalated', reviewerNotes || 'Clarification requested regarding date latency.')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#DC2626] bg-[#FEF2F2] border border-red-200 hover:bg-red-100 cursor-pointer"
              >
                ⚠ {t('univ.request_info')}
              </button>

              <button
                onClick={() => setSelectedCase(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#687386] hover:bg-[#F6F4EE] cursor-pointer"
              >
                {t('univ.close')}
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default UniversityPage;
