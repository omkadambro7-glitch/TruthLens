import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  Activity, 
  AlertOctagon, 
  ShieldCheck, 
  ShieldAlert, 
  Share2, 
  Waves, 
  Radio, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VoiceSampleCase {
  id: string;
  title: string;
  scenario: string;
  duration: string;
  speaker: string;
  verdict: 'AI VOICE CLONE DETECTED' | 'AUTHENTIC HUMAN SPEECH' | 'SYNTHETIC TTS';
  isClone: boolean;
  confidence: number;
  engineSignature: string;
  signals: { name: string; status: 'fake' | 'real' | 'warning'; detail: string }[];
}

const VOICE_SAMPLES: Record<string, VoiceSampleCase> = {
  ceo_clone: {
    id: 'ceo_clone',
    title: 'Urgent Wire Transfer Authorization Call',
    scenario: 'Finance department received a voicemail allegedly from CEO authorizing an emergency $240,000 offshore payment.',
    duration: '00:14 (44.1 kHz, 16-bit Mono)',
    speaker: 'Target Executive (Synthetic Voice Profile)',
    verdict: 'AI VOICE CLONE DETECTED',
    isClone: true,
    confidence: 97.6,
    engineSignature: 'ElevenLabs Multilingual v2 (Diffusion Waveform)',
    signals: [
      { name: 'Harmonic Decay & Cut-off (>16 kHz)', status: 'fake', detail: 'Sharp spectral truncation at 16,000Hz indicative of neural vocoder loss' },
      { name: 'Micro-Aspiration & Breath Inhalation', status: 'fake', detail: 'Total absence of physiological inhalation pauses between sentence clauses' },
      { name: 'Pitch Jitter & Glottal Pulse Variance', status: 'fake', detail: 'Pitch variance coefficient of 0.008 (Robotic pitch quantization baseline)' },
      { name: 'Acoustic Room Impulse Response', status: 'warning', detail: 'Dry studio reverberation mismatched with mobile cellular microphone profile' }
    ]
  },
  authentic: {
    id: 'authentic',
    title: 'Executive Conference Call (Authentic Ingestion)',
    scenario: 'Routine quarterly investor check-in recording captured over cellular mobile network.',
    duration: '00:22 (44.1 kHz, 16-bit Stereo)',
    speaker: 'Chief Financial Officer',
    verdict: 'AUTHENTIC HUMAN SPEECH',
    isClone: false,
    confidence: 98.9,
    engineSignature: 'Natural Human Vocal Cord Acoustic Profile',
    signals: [
      { name: 'Harmonic Decay & Cut-off (>16 kHz)', status: 'real', detail: 'Continuous organic harmonic decay extending up to 21,500Hz ceiling' },
      { name: 'Micro-Aspiration & Breath Inhalation', status: 'real', detail: 'Natural 180ms diaphragm inhalation audio preceding consonant plosives' },
      { name: 'Pitch Jitter & Glottal Pulse Variance', status: 'real', detail: 'Healthy pitch micro-jitter (1.2% perturbation) characteristic of human larynx' },
      { name: 'Formant Transition Dynamics', status: 'real', detail: 'Smooth vowel-to-consonant formant trajectories (F1/F2 frequency curve verified)' }
    ]
  },
  robocall: {
    id: 'robocall',
    title: 'Automated Tax Audit Extortion Robocall',
    scenario: 'Automated phone message threatening immediate legal warrants unless gift cards are provided.',
    duration: '00:19 (22.05 kHz, 8-bit)',
    speaker: 'Generic Synthetic Voice Model',
    verdict: 'SYNTHETIC TTS',
    isClone: true,
    confidence: 95.2,
    engineSignature: 'Concatenative WaveNet Speech Synthesizer',
    signals: [
      { name: 'Harmonic Decay & Cut-off (>16 kHz)', status: 'fake', detail: 'Aggressive low-pass filtering at 8,000Hz (telephony compression masking)' },
      { name: 'Prosodic Cadence Flatness', status: 'fake', detail: 'Zero emotional pitch inflection on urgency keywords ("Arrest", "Immediate")' },
      { name: 'Syllabic Duration Uniformity', status: 'fake', detail: 'Fixed 120ms syllable spacing without natural human rhythmic variation' },
      { name: 'Background Noise Floor Discontinuity', status: 'warning', detail: 'Audio noise gate opens/closes unnaturally around speech bursts' }
    ]
  }
};

export const VoiceVerifyPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<VoiceSampleCase | null>(VOICE_SAMPLES.ceo_clone);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [inputTab, setInputTab] = useState<'upload' | 'record'>('upload');

  const handleLoadSample = (key: string) => {
    setIsScanning(true);
    setIsPlaying(false);
    setTimeout(() => {
      setSelectedCase(VOICE_SAMPLES[key]);
      setIsScanning(false);
    }, 600);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setIsPlaying(false);
      const isLikelyClone = e.target.files[0].name.toLowerCase().includes('clone') || e.target.files[0].size % 2 === 0;
      setTimeout(() => {
        setSelectedCase(isLikelyClone ? VOICE_SAMPLES.ceo_clone : VOICE_SAMPLES.authentic);
        setIsScanning(false);
      }, 900);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {/* Header Bar */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#DC052D] bg-red-50 border border-red-200 shadow-2xs">
            <Mic className="w-3.5 h-3.5 text-[#DC052D]" />
            <span>AI Voice Clone Radar</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 shadow-2xs">
            <span className="text-[#FFCC00]">★</span>
            <span>Acoustic Spectrogram Engine</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
          AI Voice Clone & Synthetic Audio Detector
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Verify voice notes, executive telephone calls, and customer audio submissions. Detect ElevenLabs, Tortoise, and TTS voice clones via high-frequency harmonic truncation, glottal jitter loss, and breath cadence profiling.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Audio Upload & Test Cases */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            
            {/* Input Toggle */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setInputTab('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputTab === 'upload' ? 'bg-[#DC052D] text-white shadow-xs' : 'text-slate-600 hover:text-[#DC052D]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Audio File</span>
              </button>
              <button
                type="button"
                onClick={() => setInputTab('record')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputTab === 'record' ? 'bg-[#DC052D] text-white shadow-xs' : 'text-slate-600 hover:text-[#DC052D]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Record Voice Note</span>
              </button>
            </div>

            {/* Upload Zone */}
            {inputTab === 'upload' ? (
              <label className="border-2 border-dashed border-slate-300 hover:border-[#DC052D] hover:bg-red-50/20 rounded-2xl p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all block">
                <input
                  type="file"
                  accept="audio/mp3,audio/wav,audio/m4a,audio/aac,audio/ogg"
                  className="hidden"
                  onChange={handleUploadSimulate}
                />
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-[#DC052D] flex items-center justify-center mb-3">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-900 block mb-1">
                  Upload audio clip or voicemail
                </span>
                <span className="text-xs text-slate-500 block max-w-xs">
                  WAV, MP3, M4A, or AAC up to 50MB. High-precision 20Hz–20kHz acoustic spectrogram analysis.
                </span>
              </label>
            ) : (
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-100 text-[#DC052D] flex items-center justify-center animate-pulse">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-900">Live Microphone Listening Mode</span>
                <p className="text-[11px] text-slate-500">Record 5–10 seconds of speech for instant synthetic vocal analysis.</p>
                <button
                  type="button"
                  onClick={() => handleLoadSample('ceo_clone')}
                  className="px-4 py-2 bg-gradient-to-r from-[#DC052D] to-[#990000] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Record 5s Sample
                </button>
              </div>
            )}

            {/* Test Cases (TruthScan Style) */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-slate-900 block">
                Or test with verified audio fraud cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('ceo_clone')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'ceo_clone'
                      ? 'bg-red-50 border-[#DC052D] text-red-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>1. CEO Wire Transfer Clone (97.6% Fake)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('authentic')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'authentic'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>2. Natural Human Telephone Call (98.9% Real)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('robocall')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'robocall'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>3. Extortion TTS Robocall Scam (95.2%)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Load Case →</span>
                </button>
              </div>
            </div>

            {/* Vocal Pipeline Status */}
            {selectedCase && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Acoustic Pipeline</span>
                  <span className="font-mono font-bold text-slate-900">Librosa FFT + ResNeXt-Audio</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Model Match</span>
                  <span className="font-mono text-[11px] font-bold text-[#DC052D] truncate max-w-[200px]">
                    {selectedCase.engineSignature}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Audio Spectrogram & Verdict Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#DC052D] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-slate-900">Computing Short-Time Fourier Transform (STFT)...</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Extracting mel-frequency cepstral coefficients (MFCCs), fundamental frequency contour, and vocoder phase residual.
              </p>
            </div>
          ) : selectedCase ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Verdict Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1 font-mono">
                      ACOUSTIC BIOMETRIC VERDICT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isClone 
                          ? 'text-red-700 bg-red-50 border-red-200' 
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        {selectedCase.verdict}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Confidence: <strong className="text-slate-900 font-mono">{selectedCase.confidence}%</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                    {selectedCase.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCase.scenario}
                </p>

                {/* Simulated Audio Player & Dynamic Waveform Bar */}
                <div className="p-5 rounded-2xl bg-[#001433] border border-[#002B66] text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-11 h-11 rounded-full bg-gradient-to-r from-[#DC052D] to-[#990000] hover:scale-105 transition-all text-white flex items-center justify-center shadow-md cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                      <div>
                        <span className="text-xs font-bold block">{selectedCase.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">00:06 / 00:14 • 44.1 kHz</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#FFCC00] bg-[#FFCC00]/10 px-2 py-0.5 rounded border border-[#FFCC00]/30">
                      {isPlaying ? 'PLAYING BACK' : 'AUDIO READY'}
                    </span>
                  </div>

                  {/* Frequency Waveform Animation Bars */}
                  <div className="flex items-end justify-between gap-1 h-16 pt-2 px-1">
                    {[40, 65, 80, 45, 90, 70, 30, 85, 100, 75, 40, 95, 60, 30, 80, 50, 90, 35, 70, 85, 40, 60, 90, 50, 30, 75, 90, 45, 60, 80, 35, 70].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          i > 24 && selectedCase.isClone 
                            ? 'bg-slate-700/60' 
                            : selectedCase.isClone
                            ? 'bg-gradient-to-t from-[#DC052D] to-[#FF4D6D]'
                            : 'bg-gradient-to-t from-emerald-500 to-cyan-400'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(15, (h * (i % 3 + 1)) % 100)}%` : `${h * 0.6}%`
                        }}
                      />
                    ))}
                  </div>

                  {selectedCase.isClone && (
                    <div className="flex items-center justify-between text-[10px] font-mono text-red-300 bg-red-950/60 p-2 rounded-lg border border-red-500/30">
                      <span>⚠️ High-Frequency Harmonic Absence: Frequencies above 16kHz truncated</span>
                      <span className="font-bold">Neural Vocoder Flag</span>
                    </div>
                  )}
                </div>

                {/* Acoustic Signal Breakdown */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Acoustic Biometric Signals
                  </h3>

                  <div className="space-y-2">
                    {selectedCase.signals.map((sig) => (
                      <div 
                        key={sig.name}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col gap-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{sig.name}</span>
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${
                            sig.status === 'fake'
                              ? 'text-red-700 bg-red-50 border-red-200'
                              : sig.status === 'real'
                              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                              : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}>
                            {sig.status === 'fake' ? 'Synthetic Anomaly' : sig.status === 'real' ? 'Organic Human' : 'Warning'}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {sig.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Audit Certificate */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/dashboard/reports/job-demo-deepfake-01"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Download Cryptographic Audio Audit Report</span>
                  </Link>

                  <span className="text-[11px] text-slate-500 font-mono">
                    Spectrogram processing: 840ms
                  </span>
                </div>

              </div>
            </motion.div>
          ) : null}
        </div>

      </div>

    </div>
  );
};

export default VoiceVerifyPage;
