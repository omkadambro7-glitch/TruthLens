import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  ShieldAlert, 
  ShieldCheck,
  Building,
  User as UserIcon,
  MessageSquare
} from 'lucide-react';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { ReviewCase } from '../types';
import { useAuth } from '../context/AuthContext';

export const UniversityPage: React.FC = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<ReviewCase[]>([]);
  const [stats, setStats] = useState<any>({ total_cases: 0, pending_cases: 0, resolved_cases: 0, high_priority_flags: 0 });
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState<string>('');
  const [decision, setDecision] = useState<string>('APPROVED_GENUINE');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'queue' | 'audit'>('queue');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchQueue();
    fetchStats();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/v1/university/queue', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('truthlens_token') || ''}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (e) {}
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/v1/university/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('truthlens_token') || ''}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {}
  };

  const handleOpenCase = async (caseId: string) => {
    try {
      const res = await fetch(`/api/v1/university/reviews/${caseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('truthlens_token') || ''}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedCase(data);
        setReviewerNotes(data.reviewer_notes || '');
      }
    } catch (e) {}
  };

  const handleRecordDecision = async () => {
    if (!selectedCase) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/university/reviews/${selectedCase.case_id}/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('truthlens_token') || ''}`
        },
        body: JSON.stringify({
          decision: decision,
          reviewer_notes: reviewerNotes
        })
      });
      if (res.ok) {
        setSelectedCase(null);
        fetchQueue();
        fetchStats();
      }
    } catch (e) {} finally {
      setIsSubmitting(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/v1/university/audit', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('truthlens_token') || ''}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#20252B] tracking-tight font-display flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[#116B67]" />
            University Verification Workspace
          </h1>
          <p className="text-sm text-[#68717D]">
            Human review queue with institutional tenant isolation, case notes, and immutable audit trails.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E8E6DF] text-xs font-bold">
          <button
            onClick={() => { setActiveTab('queue'); fetchQueue(); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'queue' ? 'bg-[#116B67] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
            }`}
          >
            Review Queue ({cases.length})
          </button>
          <button
            onClick={() => { setActiveTab('audit'); fetchAuditLogs(); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'audit' ? 'bg-[#116B67] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] block">Pending Reviews</span>
          <span className="text-2xl font-extrabold text-[#116B67] font-display block mt-1">
            {stats.pending_cases}
          </span>
          <span className="text-[10px] text-[#8A92A0]">Awaiting reviewer review</span>
        </div>

        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] block">High Priority Flags</span>
          <span className="text-2xl font-extrabold text-red-600 font-display block mt-1">
            {stats.high_priority_flags}
          </span>
          <span className="text-[10px] text-red-700">Chronological discrepancies</span>
        </div>

        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] block">Resolved Cases</span>
          <span className="text-2xl font-extrabold text-[#7663D8] font-display block mt-1">
            {stats.resolved_cases}
          </span>
          <span className="text-[10px] text-[#8A92A0]">Decisions recorded</span>
        </div>

        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] block">Tenant Isolation</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-display block mt-1">
            Active
          </span>
          <span className="text-[10px] text-[#8A92A0]">Isolated per institution</span>
        </div>
      </div>

      {/* REVIEW QUEUE VIEW */}
      {activeTab === 'queue' && (
        <div className="card-elevation bg-white border border-[#E8E6DF] overflow-hidden">
          <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between">
            <h3 className="text-base font-bold text-[#20252B] font-display">
              Submissions Requiring Human Review
            </h3>
            <span className="text-xs text-[#68717D]">
              Sorted by submission recency & risk priority
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#E8E6DF] text-[#68717D] font-bold">
                  <th className="p-4">Patient / Student</th>
                  <th className="p-4">Practitioner & Clinic</th>
                  <th className="p-4">Integrity Risk Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#68717D]">
                      No pending cases in queue.
                    </td>
                  </tr>
                ) : (
                  cases.map((c) => (
                    <tr key={c.id} className="border-b border-[#E8E6DF] hover:bg-[#FAF9F6] transition-colors">
                      <td className="p-4 font-bold text-[#20252B]">
                        {c.patient_name || "Unspecified Patient"}
                      </td>
                      <td className="p-4 text-[#4B5563]">
                        <div>{c.doctor_name || "Doctor unreadable"}</div>
                        <span className="text-[10px] text-[#8A92A0]">{c.hospital_name || "Hospital unstated"}</span>
                      </td>
                      <td className="p-4">
                        <VerdictBadge verdict={c.risk_category} size="sm" />
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          c.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-semibold text-[#4B5563]">
                          {c.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenCase(c.id)}
                          className="brand-gradient text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-2xs hover:opacity-95"
                        >
                          Review Case
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AUDIT TRAIL VIEW */}
      {activeTab === 'audit' && (
        <div className="card-elevation bg-white border border-[#E8E6DF] p-6">
          <h3 className="text-base font-bold text-[#20252B] font-display mb-4">
            Institutional Audit Logs
          </h3>
          <div className="space-y-3">
            {auditLogs.length === 0 ? (
              <p className="text-xs text-[#68717D]">No audit events logged yet.</p>
            ) : (
              auditLogs.map((log: any) => (
                <div key={log.id} className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] text-xs flex items-center justify-between">
                  <div>
                    <strong className="text-[#20252B]">{log.action}</strong>
                    <span className="text-[#68717D] ml-2">Resource: {log.resource_type} ({log.resource_id.slice(0, 8)}...)</span>
                  </div>
                  <span className="text-[10px] text-[#8A92A0]">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CASE REVIEW MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 card-elevation border border-[#E8E6DF] max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
              <div>
                <h3 className="text-lg font-bold text-[#20252B] font-display">
                  Review Case #{selectedCase.case_id.slice(0, 8)}
                </h3>
                <span className="text-xs text-[#68717D]">
                  Student / Patient: <strong>{selectedCase.certificate_extraction.patient_name}</strong>
                </span>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-[#68717D] hover:text-[#20252B] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Extracted Details */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div><strong>Physician:</strong> {selectedCase.certificate_extraction.doctor_name || "Unreadable"}</div>
                <div><strong>Registration No:</strong> {selectedCase.certificate_extraction.registration_number || "Unreadable"}</div>
                <div><strong>Hospital:</strong> {selectedCase.certificate_extraction.hospital_name || "Unreadable"}</div>
                <div><strong>Leave Interval:</strong> {selectedCase.certificate_extraction.leave_start} to {selectedCase.certificate_extraction.leave_end}</div>
              </div>
              <div className="pt-2 border-t border-[#E8E6DF] text-[#68717D]">
                <strong>Raw OCR:</strong> <em>{selectedCase.certificate_extraction.raw_ocr_snippet}</em>
              </div>
            </div>

            {/* Decision Select */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#20252B] mb-1">
                  Structured Reviewer Determination
                </label>
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#D5D2C8] bg-white text-xs font-semibold"
                >
                  <option value="APPROVED_GENUINE">Approve as Genuine (Leave Verified)</option>
                  <option value="CLARIFICATION_NEEDED">Request Clarification / Supplementary Discharge Note</option>
                  <option value="ESCALATED_BOARD">Escalate to Academic Disciplinary Board</option>
                  <option value="REJECTED_DISCREPANCY">Reject Due to Established Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#20252B] mb-1">
                  Reviewer Case Notes & Justification
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Record verification notes, registry lookups, or follow-up calls..."
                  className="w-full p-3 rounded-xl border border-[#D5D2C8] bg-[#FAF9F6] text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E6DF]">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-[#D5D2C8] hover:bg-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleRecordDecision}
                  className="brand-gradient text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs hover:opacity-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Recording..." : "Confirm Decision"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default UniversityPage;
