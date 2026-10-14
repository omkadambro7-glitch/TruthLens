import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  PhoneCall, 
  Lock, 
  HelpCircle,
  FileText,
  AlertTriangle,
  Plus
} from 'lucide-react';

interface TakedownTemplate {
  platform: string;
  title: string;
  portal_url: string;
  template_text: string;
}

interface SosResource {
  jurisdiction: string;
  name: string;
  helpline: string | null;
  url: string;
  description: string;
  category: string;
}

export const SosPage: React.FC = () => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [templates, setTemplates] = useState<TakedownTemplate[]>([]);
  const [resources, setResources] = useState<SosResource[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Local Incident Notes (persisted exclusively in user's browser localStorage)
  const [incidentNotes, setIncidentNotes] = useState<string>(() => {
    return localStorage.getItem('truthlens_sos_notes') || '';
  });
  
  const [evidenceChecklist, setEvidenceChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('truthlens_sos_checklist');
    return saved ? JSON.parse(saved) : {
      urls_saved: false,
      screenshots_taken: false,
      account_usernames_recorded: false,
      timestamps_logged: false,
      offline_backup_made: false
    };
  });

  useEffect(() => {
    fetch('/api/v1/sos/takedown-templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(() => {});

    fetch('/api/v1/sos/resources')
      .then(res => res.json())
      .then(data => setResources(data.resources || []))
      .catch(() => {});
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIncidentNotes(e.target.value);
    localStorage.setItem('truthlens_sos_notes', e.target.value);
  };

  const toggleChecklist = (key: string) => {
    const updated = { ...evidenceChecklist, [key]: !evidenceChecklist[key] };
    setEvidenceChecklist(updated);
    localStorage.setItem('truthlens_sos_checklist', JSON.stringify(updated));
  };

  const clearLocalData = () => {
    if (window.confirm("Are you sure you want to completely erase your locally stored notes and checklist? This cannot be undone.")) {
      setIncidentNotes('');
      setEvidenceChecklist({
        urls_saved: false,
        screenshots_taken: false,
        account_usernames_recorded: false,
        timestamps_logged: false,
        offline_backup_made: false
      });
      localStorage.removeItem('truthlens_sos_notes');
      localStorage.removeItem('truthlens_sos_checklist');
    }
  };

  const copyTemplate = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const filteredResources = selectedJurisdiction === 'All' 
    ? resources 
    : resources.filter(r => r.jurisdiction.includes(selectedJurisdiction) || r.jurisdiction.includes('Global'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Calm, Supportive Hero Banner */}
      <div className="card-elevation p-8 bg-white border border-[#E8E6DF] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#DC2626] px-3.5 py-1 rounded-full text-xs font-bold">
            <HeartHandshake className="w-4 h-4" />
            <span>Victim Support & Deepfake Incident Response</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#20252B] tracking-tight font-display">
            You are not alone. We are here to help you respond.
          </h1>

          <p className="text-sm text-[#4B5563] leading-relaxed">
            If you or someone you know has been targeted with non-consensual deepfakes, manipulated media, or digital impersonation, this center provides evidence preservation guidance, official takedown notice templates, and verified helplines.
          </p>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] text-xs text-[#68717D] flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#116B67] shrink-0 mt-0.5" />
            <span>
              <strong>Heightened Privacy Safeguard:</strong> You do <strong>NOT</strong> need to upload intimate or sensitive material to this website. Notes and checklists below remain stored 100% locally inside your own browser and are never transmitted to our servers.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Evidence Preservation & Notes Tool */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Checklist Card */}
          <div className="card-elevation p-6 bg-white border border-[#E8E6DF]">
            <h3 className="text-base font-bold text-[#20252B] font-display mb-1 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
              Step 1: Evidence Preservation Checklist
            </h3>
            <p className="text-xs text-[#68717D] mb-4">
              Before reporting or requesting a takedown, safely preserve digital evidence for potential legal recourse.
            </p>

            <div className="space-y-3">
              {[
                { key: 'urls_saved', label: 'Save exact URLs where the manipulated media is hosted' },
                { key: 'screenshots_taken', label: 'Capture full-screen screenshots (including web browser address bar and date/time)' },
                { key: 'account_usernames_recorded', label: 'Record account handles, profile links, and sender user IDs' },
                { key: 'timestamps_logged', label: 'Log dates and times messages or posts were first observed' },
                { key: 'offline_backup_made', label: 'Store preserved files onto a secure offline USB drive' },
              ].map(item => (
                <label key={item.key} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={!!evidenceChecklist[item.key]}
                    onChange={() => toggleChecklist(item.key)}
                    className="accent-[#116B67] mt-0.5"
                  />
                  <span className="text-xs font-semibold text-[#20252B]">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Incident Timeline Notes (Client-Side Only) */}
          <div className="card-elevation p-6 bg-white border border-[#E8E6DF] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#20252B] font-display">
                Confidential Incident Notes (Stored in your browser only)
              </h3>
              <button
                onClick={clearLocalData}
                className="text-xs text-[#DC2626] hover:underline flex items-center gap-1 font-semibold"
                title="Wipe notes and checklist from this browser"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Local Data
              </button>
            </div>
            <p className="text-xs text-[#68717D]">
              Record details, chronology, or links for your records. This information never leaves your device.
            </p>
            <textarea
              rows={6}
              value={incidentNotes}
              onChange={handleNotesChange}
              placeholder="e.g., Oct 14, 2026: Observed deepfake video posted on Telegram group at 4:30 PM..."
              className="w-full p-3.5 rounded-xl border border-[#D5D2C8] bg-[#FAF9F6] text-xs font-mono focus:outline-hidden focus:border-[#116B67]"
            />
          </div>

        </div>

        {/* Right Column: Platform Takedown Templates */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="card-elevation p-6 bg-white border border-[#E8E6DF]">
            <h3 className="text-base font-bold text-[#20252B] font-display mb-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#116B67]" />
              Step 2: Formal Takedown Request Templates
            </h3>
            <p className="text-xs text-[#68717D] mb-4">
              Copy standard takedown notices citing platform terms and community policies against non-consensual synthetic media.
            </p>

            <div className="space-y-4">
              {templates.map((tpl, idx) => (
                <div key={idx} className="border border-[#E8E6DF] rounded-xl p-4 bg-[#FAF9F6] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-[#20252B] block">{tpl.platform}</strong>
                      <span className="text-[11px] text-[#68717D]">{tpl.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={tpl.portal_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#116B67] hover:underline flex items-center gap-1"
                      >
                        Portal <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => copyTemplate(tpl.template_text, idx)}
                        className="bg-white border border-[#D5D2C8] text-[#20252B] hover:bg-[#FAF9F6] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <pre className="text-[11px] font-mono text-[#4B5563] bg-white p-3 rounded-lg border border-[#E8E6DF] max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {tpl.template_text}
                  </pre>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Official Jurisdictional Cybercrime & Helplines */}
      <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF] mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6DF] mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#20252B] font-display flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#116B67]" />
              Step 3: Official Support Helplines & Reporting Portals
            </h3>
            <p className="text-xs text-[#68717D]">
              Verified statutory authorities and trusted global non-profits assisting survivors.
            </p>
          </div>

          {/* Jurisdiction Filter */}
          <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E6DF] text-xs font-bold">
            {['All', 'India', 'United States', 'United Kingdom'].map(j => (
              <button
                key={j}
                onClick={() => setSelectedJurisdiction(j)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedJurisdiction === j ? 'bg-[#116B67] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E8E6DF] bg-[#FAF9F6] flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#116B67] mb-1">
                  <span>{res.jurisdiction}</span>
                  <span className="bg-[#E6F3F2] px-2 py-0.5 rounded-full">{res.category}</span>
                </div>
                <h4 className="font-bold text-sm text-[#20252B] font-display">
                  {res.name}
                </h4>
                <p className="text-xs text-[#68717D] mt-1 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8E6DF] flex items-center justify-between text-xs">
                {res.helpline ? (
                  <span className="font-bold text-[#DC2626] flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" /> Helpline: {res.helpline}
                  </span>
                ) : (
                  <span className="text-[#68717D]">Online Service</span>
                )}

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#116B67] hover:underline flex items-center gap-1"
                >
                  Visit Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SosPage;
