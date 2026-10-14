import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  PhoneCall, 
  Lock, 
  FileText,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getApiBaseUrl } from '../utils/apiClient';

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

const DEFAULT_TEMPLATES: TakedownTemplate[] = [
  {
    platform: 'Meta / Instagram',
    title: 'Non-Consensual Synthetic Media Removal Demand',
    portal_url: 'https://www.instagram.com/hacked',
    template_text: `SUBJECT: Immediate Takedown Demand: Non-Consensual Synthetic Intimate / Impersonation Media (Terms of Service Violation)

To Meta / Instagram Trust and Safety Team:

I am writing to formally request the immediate removal of non-consensual synthetic media depicting my likeness, posted without my consent in violation of your Community Standards on Synthetic and Manipulated Media and Adult Nudity/Bullying.

Target URL: [INSERT URL OF CONTENT]
Account Handle: [INSERT ACCOUNT USERNAME]
Date/Time Observed: [INSERT DATE/TIME]

This material is an unauthorized synthetic modification / deepfake. Under Section 230 safe harbor terms and regional legal frameworks, I demand this post be permanently removed and the publishing account reviewed for malicious impersonation.

Sincerely,
[Your Name or Authorized Representative]`
  },
  {
    platform: 'X (Twitter)',
    title: 'Synthetic Media Impersonation Report',
    portal_url: 'https://help.twitter.com/forms/safetyandawareness',
    template_text: `SUBJECT: Urgent Notice: Deceptive Synthetic Media Impersonation Takedown

To X Safety & Legal Operations:

This is a formal report regarding non-consensual synthetic media targeting my person. The content hosted at the following URL violates X's Policy on Synthetic and Manipulated Media:

Tweet / Media URL: [INSERT POST LINK]
Author Handle: @[INSERT USERNAME]

This content generates false attribution and targeted harassment. I request immediate disabling of access to this tweet and algorithmic downranking of duplicate re-uploads.

Contact: [Your Email]`
  },
  {
    platform: 'Reddit',
    title: 'Non-Consensual Sexual or Deepfake Media Notice',
    portal_url: 'https://www.reddit.com/report',
    template_text: `SUBJECT: Formal Report of Non-Consensual Intimate Synthetic Imagery (NCII)

To Reddit Safety Administration:

The submission at [INSERT REDDIT PERMALINK] contains synthetic / digitally manipulated imagery depicting my likeness without consent, violating Reddit Content Policy Rule 3 (Non-Consensual Sexual Content / Impersonation).

I request immediate removal and hash-blocking of the media file to prevent subreddit crossposting.

Thank you.`
  }
];

const DEFAULT_RESOURCES: SosResource[] = [
  {
    jurisdiction: 'India',
    name: 'National Cyber Crime Reporting Portal & Helpline',
    helpline: '1930 (Toll Free)',
    url: 'https://cybercrime.gov.in',
    description: 'Government of India central portal for reporting cyber harassment, deepfakes, and identity theft with immediate FIR filing.',
    category: 'Government Law Enforcement'
  },
  {
    jurisdiction: 'United States',
    name: 'NCMEC CyberTipline & Take It Down',
    helpline: '1-800-843-5678',
    url: 'https://takeitdown.ncmec.org',
    description: 'Anonymous hash-based removal for non-consensual imagery of minors and young adults.',
    category: 'Victim Advocacy'
  },
  {
    jurisdiction: 'United Kingdom',
    name: 'Revenge Porn Helpline UK',
    helpline: '0345 6000 459',
    url: 'https://revengepornhelpline.org.uk',
    description: 'Dedicated support service with 90%+ success rate in removing non-consensual intimate media from major platforms.',
    category: 'Specialized Takedown'
  },
  {
    jurisdiction: 'Global',
    name: 'StopNCII.org (Internet Watch Foundation & SWGfL)',
    helpline: null,
    url: 'https://stopncii.org',
    description: 'Privacy-first platform that creates secure cryptographic hashes of images on your device to prevent them from ever being shared on participating social platforms.',
    category: 'Preemptive Hash Blocking'
  }
];

export const SosPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [templates, setTemplates] = useState<TakedownTemplate[]>(DEFAULT_TEMPLATES);
  const [resources, setResources] = useState<SosResource[]>(DEFAULT_RESOURCES);
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
    const apiBase = getApiBaseUrl();
    fetch(`${apiBase}/api/v1/sos/takedown-templates`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length) setTemplates(data); })
      .catch(() => {});

    fetch(`${apiBase}/api/v1/sos/helpline-directory`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length) setResources(data); })
      .catch(() => {});
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setIncidentNotes(val);
    localStorage.setItem('truthlens_sos_notes', val);
  };

  const clearLocalNotes = () => {
    if (window.confirm('Clear all local incident notes and checklist from this browser?')) {
      setIncidentNotes('');
      localStorage.removeItem('truthlens_sos_notes');
      const resetChecklist = {
        urls_saved: false,
        screenshots_taken: false,
        account_usernames_recorded: false,
        timestamps_logged: false,
        offline_backup_made: false
      };
      setEvidenceChecklist(resetChecklist);
      localStorage.removeItem('truthlens_sos_checklist');
    }
  };

  const toggleChecklistItem = (key: string) => {
    const updated = { ...evidenceChecklist, [key]: !evidenceChecklist[key] };
    setEvidenceChecklist(updated);
    localStorage.setItem('truthlens_sos_checklist', JSON.stringify(updated));
  };

  const copyTemplateToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const filteredResources = selectedJurisdiction === 'All' 
    ? resources 
    : resources.filter(r => r.jurisdiction === selectedJurisdiction);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {/* Header Banner */}
      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#FEF2F2] border border-red-200 text-[#DC2626] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Victim Support & Deepfake Incident Response</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
          {t('sos.title')}
        </h1>

        <p className="text-xs sm:text-sm text-[#687386] max-w-3xl leading-relaxed">
          {t('sos.subtitle')}
        </p>

        {/* Heightened Privacy Notice */}
        <div className="bg-[#FAF9F6] border border-[#E8E5DC] p-4 rounded-xl flex items-start gap-3 text-xs text-[#101B35]">
          <Lock className="w-4 h-4 text-[#233F8C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('sos.privacy_banner')}
          </p>
        </div>
      </div>

      {/* Grid: Checklist & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Evidence Checklist */}
        <div className="lg:col-span-6 space-y-6">
          <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-4">
            <h2 className="text-base font-bold text-[#101B35] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
              <span>{t('sos.step1_title')}</span>
            </h2>
            <p className="text-xs text-[#687386] leading-relaxed">
              {t('sos.step1_sub')}
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { key: 'urls_saved', text: t('sos.check1') },
                { key: 'screenshots_taken', text: t('sos.check2') },
                { key: 'account_usernames_recorded', text: t('sos.check3') },
                { key: 'timestamps_logged', text: t('sos.check4') },
                { key: 'offline_backup_made', text: t('sos.check5') },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-3 p-3 rounded-xl border border-[#E8E5DC] hover:bg-[#FAF9F6] cursor-pointer transition-colors text-xs text-[#192338]"
                >
                  <input
                    type="checkbox"
                    checked={evidenceChecklist[item.key] || false}
                    onChange={() => toggleChecklistItem(item.key)}
                    className="mt-0.5 w-4 h-4 rounded text-[#233F8C] focus:ring-[#233F8C] cursor-pointer"
                  />
                  <span className="leading-relaxed select-none">{item.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Local Encrypted Incident Notes */}
          <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#101B35] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#233F8C]" />
                <span>{t('sos.local_notes_title')}</span>
              </h3>
              <button
                onClick={clearLocalNotes}
                className="text-[11px] font-bold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>{t('sos.clear_notes')}</span>
              </button>
            </div>
            <textarea
              value={incidentNotes}
              onChange={handleNotesChange}
              placeholder="Record target URLs, usernames, timestamps, and communications here. This data remains 100% inside your current browser session and is never sent to any server."
              className="w-full h-36 p-3 rounded-xl border border-[#D8D4C7] text-xs text-[#101B35] focus:outline-hidden focus:border-[#233F8C] leading-relaxed resize-none bg-[#FAF9F6]"
            />
          </div>
        </div>

        {/* Right Column: Takedown Templates */}
        <div className="lg:col-span-6 space-y-6">
          <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-4">
            <h2 className="text-base font-bold text-[#101B35] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#233F8C]" />
              <span>{t('sos.step2_title')}</span>
            </h2>
            <p className="text-xs text-[#687386] leading-relaxed">
              {t('sos.step2_sub')}
            </p>

            <div className="space-y-4 pt-2">
              {templates.map((tpl, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E8E5DC] bg-[#FAF9F6] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#101B35]">{tpl.platform}</span>
                    <a
                      href={tpl.portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#233F8C] hover:underline flex items-center gap-1"
                    >
                      <span>Report Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <pre className="text-[11px] text-[#687386] bg-white p-3 rounded-lg border border-[#E8E5DC] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                    {tpl.template_text}
                  </pre>
                  <button
                    onClick={() => copyTemplateToClipboard(tpl.template_text, idx)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#101B35] bg-white border border-[#D8D4C7] hover:border-[#C6A45C] hover:bg-[#FBF8EE] px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === idx ? t('sos.copied') : t('sos.copy_template')}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Official Helplines Directory */}
      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EFE8]">
          <div>
            <h2 className="text-lg font-bold text-[#101B35] font-sans">
              {t('sos.step3_title')}
            </h2>
            <p className="text-xs text-[#687386]">
              Direct contact pathways to cybercrime units and non-profit victim removal platforms.
            </p>
          </div>

          {/* Jurisdiction Filters */}
          <div className="flex items-center gap-1.5 bg-[#F6F4EE] p-1 rounded-xl border border-[#E8E5DC] text-xs font-bold text-[#687386]">
            {['All', 'India', 'United States', 'United Kingdom', 'Global'].map((jurisdiction) => (
              <button
                key={jurisdiction}
                onClick={() => setSelectedJurisdiction(jurisdiction)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedJurisdiction === jurisdiction 
                    ? 'bg-white text-[#101B35] font-extrabold shadow-xs' 
                    : 'hover:text-[#101B35]'
                }`}
              >
                {jurisdiction}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredResources.map((res, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E8E5DC] bg-[#FAF9F6] flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#233F8C] bg-[#EEF3FF] px-2 py-0.5 rounded">
                    {res.jurisdiction} • {res.category}
                  </span>
                  {res.helpline && (
                    <span className="text-xs font-extrabold text-[#DC2626] flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" />
                      <span>{res.helpline}</span>
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#101B35] mt-1">{res.name}</h4>
                <p className="text-xs text-[#687386] mt-1 leading-relaxed">{res.description}</p>
              </div>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#233F8C] hover:text-[#101B35] flex items-center gap-1 w-fit mt-1"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SosPage;
