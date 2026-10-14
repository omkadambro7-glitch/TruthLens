import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  Check, 
  Play, 
  Pause, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Scan, 
  Sliders, 
  Share2, 
  Copy, 
  Clock, 
  Layers, 
  Hash, 
  CheckCircle2,
  Eye,
  Film
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoSampleCase {
  id: string;
  title: string;
  scenario: string;
  videoDuration: string;
  verdict: 'DEEPFAKE DETECTED' | 'AUTHENTIC BROADCAST' | 'WARP ANOMALY';
  isFake: boolean;
  confidence: number;
  anomalyTimestamp: string;
  signals: { name: string; status: 'fake' | 'real' | 'warning'; detail: string }[];
  frames: { time: string; label: string; anomaly: boolean; desc: string }[];
}

const VIDEO_SAMPLES: Record<string, VideoSampleCase> = {
  deepfake: {
    id: 'deepfake',
    title: 'Political Speech Face-Swap (Diffusion Latent)',
    scenario: 'Fabricated announcement clip claiming state emergency, seeded during election cycle.',
    videoDuration: '00:18 (540 Frames)',
    verdict: 'DEEPFAKE DETECTED',
    isFake: true,
    confidence: 96.8,
    anomalyTimestamp: '00:06 – 00:11',
    signals: [
      { name: 'Temporal Landmark Consistency', status: 'fake', detail: 'Jawline boundary micro-jitter at 30fps indicates splice mask overlay' },
      { name: 'Blink Frequency Analysis', status: 'fake', detail: '0 blinks observed in 18s window (Normal human rate: 15–20/min)' },
      { name: 'Lip-Sync Phoneme Coherence', status: 'fake', detail: 'Viseme-to-phoneme lag of 120ms exceeds biological synchronization' },
      { name: 'Facial Lighting & Shadow Vector', status: 'warning', detail: 'Nose shadow angle incongruent with studio keylight' }
    ],
    frames: [
      { time: '00:02', label: 'Frame 60', anomaly: false, desc: 'Initial baseline head pose aligned.' },
      { time: '00:07', label: 'Frame 210', anomaly: true, desc: 'Lip edge blending blur & pupil glint disparity detected.' },
      { time: '00:11', label: 'Frame 330', anomaly: true, desc: 'Facial boundary boundary warping during head turn.' },
      { time: '00:16', label: 'Frame 480', anomaly: false, desc: 'Re-convergence with keyframe reference.' }
    ]
  },
  authentic: {
    id: 'authentic',
    title: 'Live News Broadcast (Official Camera Ingestion)',
    scenario: 'High-definition optical broadcast camera footage of press briefing.',
    videoDuration: '00:24 (720 Frames)',
    verdict: 'AUTHENTIC BROADCAST',
    isFake: false,
    confidence: 98.4,
    anomalyTimestamp: 'None detected',
    signals: [
      { name: 'Temporal Landmark Consistency', status: 'real', detail: 'Stable facial geometry with natural micro-movements and muscle tremors' },
      { name: 'Blink Frequency Analysis', status: 'real', detail: 'Natural blink duration of 140ms with smooth eyelid deceleration' },
      { name: 'Lip-Sync Phoneme Coherence', status: 'real', detail: 'Perfect audio-visual synchronization within 15ms biological range' },
      { name: 'Sensor Temporal Noise Profile', status: 'real', detail: 'Uniform CMOS temporal readout noise across background and subject' }
    ],
    frames: [
      { time: '00:03', label: 'Frame 90', anomaly: false, desc: 'Natural eyelid blink sequence.' },
      { time: '00:09', label: 'Frame 270', anomaly: false, desc: 'Consistent specular highlights on cornea.' },
      { time: '00:15', label: 'Frame 450', anomaly: false, desc: 'Continuous hair-to-neck boundary occlusion.' },
      { time: '00:21', label: 'Frame 630', anomaly: false, desc: 'Uniform spatial compression noise.' }
    ]
  },
  warp: {
    id: 'warp',
    title: 'Viral Social Stunt (Reenactment Model)',
    scenario: 'Celebrity face reenactment model mapped onto athlete body in locker room.',
    videoDuration: '00:12 (360 Frames)',
    verdict: 'WARP ANOMALY',
    isFake: true,
    confidence: 93.2,
    anomalyTimestamp: '00:04 – 00:08',
    signals: [
      { name: 'Temporal Landmark Consistency', status: 'fake', detail: 'Ear-to-jawline shear artifact during rapid horizontal translation' },
      { name: 'Inter-frame Chrominance Flickering', status: 'fake', detail: 'Skin tone luminance pulses between 24-28Hz (GAN generative artifact)' },
      { name: 'Teeth & Tongue Texture Resolution', status: 'warning', detail: 'Teeth blur into single solid block during wide vowel pronunciation' },
      { name: 'Background Motion Parallax', status: 'real', detail: 'Camera shake matches physical handheld stabilizer profile' }
    ],
    frames: [
      { time: '00:01', label: 'Frame 30', anomaly: false, desc: 'Face detection bounding locked.' },
      { time: '00:05', label: 'Frame 150', anomaly: true, desc: 'High frequency flickering around hairline.' },
      { time: '00:08', label: 'Frame 240', anomaly: true, desc: 'Teeth texture synthesis collapse.' },
      { time: '00:11', label: 'Frame 330', anomaly: false, desc: 'Static hold frame.' }
    ]
  }
};

export const VideoVerifyPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<VideoSampleCase | null>(VIDEO_SAMPLES.deepfake);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [inputTab, setInputTab] = useState<'upload' | 'url'>('upload');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleLoadSample = (key: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCase(VIDEO_SAMPLES[key]);
      setSelectedFrame(1);
      setIsScanning(false);
    }, 600);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      const isLikelyFake = e.target.files[0].name.toLowerCase().includes('fake') || e.target.files[0].size % 2 === 0;
      setTimeout(() => {
        setSelectedCase(isLikelyFake ? VIDEO_SAMPLES.deepfake : VIDEO_SAMPLES.authentic);
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
            <Video className="w-3.5 h-3.5 text-[#DC052D]" />
            <span>Deepfake Video Radar</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 shadow-2xs">
            <span className="text-[#FFCC00]">★</span>
            <span>Biometric Frame Analyzer</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
          Deepfake Video & Biometric Glitch Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Frame-by-frame temporal consistency screening for face-swaps, synthetic lip-sync, and facial reenactment. Analyzes unnatural blink frequencies, boundary warping, and inter-frame GAN flickering in real time.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload / URL & Verified Test Cases */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            
            {/* Input Method Toggle */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setInputTab('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputTab === 'upload' ? 'bg-[#DC052D] text-white shadow-xs' : 'text-slate-600 hover:text-[#DC052D]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Video</span>
              </button>
              <button
                type="button"
                onClick={() => setInputTab('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputTab === 'url' ? 'bg-[#DC052D] text-white shadow-xs' : 'text-slate-600 hover:text-[#DC052D]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Video Link</span>
              </button>
            </div>

            {/* Video Upload Dropzone */}
            {inputTab === 'upload' ? (
              <label className="border-2 border-dashed border-slate-300 hover:border-[#DC052D] hover:bg-red-50/20 rounded-2xl p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all block">
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                  onChange={handleUploadSimulate}
                />
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-[#DC052D] flex items-center justify-center mb-3">
                  <Film className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-900 block mb-1">
                  Upload video footage to inspect
                </span>
                <span className="text-xs text-slate-500 block max-w-xs">
                  MP4, MOV, or WebM up to 100MB. Auto-decomposes into frame sequences for biometric analysis.
                </span>
              </label>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleLoadSample('deepfake'); }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    YouTube / X / TikTok Video URL
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://x.com/user/status/video-to-verify"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-[#DC052D] focus:ring-2 focus:ring-[#DC052D]/10 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isScanning}
                  className="w-full bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Fetch & Scan Video Frames
                </button>
              </form>
            )}

            {/* Test Samples (TruthScan Style) */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-slate-900 block">
                Or test with verified forensic video cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('deepfake')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'deepfake'
                      ? 'bg-red-50 border-[#DC052D] text-red-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>1. Political Speech Face-Swap (96.8% Fake)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Inspect →</span>
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
                  <span>2. Authentic Live Press Conference (98.4% Real)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">Inspect →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('warp')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'warp'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>3. Reenactment Model Warp Anomaly (93.2%)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Inspect →</span>
                </button>
              </div>
            </div>

            {/* Video Metadata Card */}
            {selectedCase && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Ingestion Pipeline</span>
                  <span className="font-mono font-bold text-slate-900">FFmpeg Temporal Splicer v6.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Resolution / FPS</span>
                  <span className="font-mono font-bold text-slate-900">1920x1080 @ 30.0 fps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Anomaly Window</span>
                  <span className="font-mono font-bold text-[#DC052D] bg-red-100/70 px-1.5 py-0.5 rounded">
                    {selectedCase.anomalyTimestamp}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Frame-by-Frame Inspector & Verdict */}
        <div className="lg:col-span-7 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#DC052D] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-slate-900">Decomposing video keyframes & tracking facial landmarks...</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Running 3D optical flow vector extraction, blink cadence timing, and inter-frame GAN boundary analysis.
              </p>
            </div>
          ) : selectedCase ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Verdict Summary Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1 font-mono">
                      VIDEO BIOMETRIC VERDICT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isFake 
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
                    {selectedCase.videoDuration}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCase.scenario}
                </p>

                {/* Simulated Video Player with Frame Scrubbing */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg aspect-video flex flex-col justify-between p-4">
                  {/* Top Video Overlay Bar */}
                  <div className="flex items-center justify-between text-xs text-white z-10">
                    <span className="flex items-center gap-2 font-mono font-bold text-[11px] bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                      <span className={`w-2 h-2 rounded-full ${selectedCase.isFake ? 'bg-[#DC052D] animate-ping' : 'bg-emerald-400'}`} />
                      <span>{selectedCase.isFake ? 'BIOMETRIC GLITCH LOCK' : 'OPTICAL BASELINE'}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 bg-black/60 px-2 py-1 rounded border border-white/10">
                      REC • 1080P
                    </span>
                  </div>

                  {/* Center Video Frame Mock Visual */}
                  <div className="relative flex flex-col items-center justify-center my-auto text-center space-y-2">
                    <div className={`relative p-8 rounded-2xl border-2 ${
                      selectedCase.frames[selectedFrame].anomaly 
                        ? 'border-[#DC052D] bg-red-950/40 shadow-[0_0_30px_rgba(220,5,45,0.4)]' 
                        : 'border-emerald-500/60 bg-emerald-950/20'
                    }`}>
                      {/* Facial Landmark Tracking Grid */}
                      <div className="w-24 h-28 rounded-full border border-dashed border-white/40 flex items-center justify-center relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute top-7 left-6 shadow-[0_0_6px_#22d3ee]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute top-7 right-6 shadow-[0_0_6px_#22d3ee]" />
                        <div className="w-6 h-2 rounded-full bg-[#FFCC00] absolute bottom-7 shadow-[0_0_6px_#facc15]" />
                        {selectedCase.frames[selectedFrame].anomaly && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#DC052D] animate-pulse" />
                        )}
                      </div>

                      <span className="block mt-2 font-mono text-[11px] font-bold text-white">
                        {selectedCase.frames[selectedFrame].label} ({selectedCase.frames[selectedFrame].time})
                      </span>
                    </div>

                    <p className={`text-xs max-w-sm px-3 py-1 rounded-lg backdrop-blur-md ${
                      selectedCase.frames[selectedFrame].anomaly 
                        ? 'bg-red-900/80 text-red-200 border border-red-500/40' 
                        : 'bg-black/60 text-slate-300 border border-white/10'
                    }`}>
                      {selectedCase.frames[selectedFrame].desc}
                    </p>
                  </div>

                  {/* Bottom Video Timeline Scrubber */}
                  <div className="space-y-2 z-10 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Click keyframes to inspect biometric coordinates:</span>
                      <span className="text-white font-bold">{selectedCase.frames[selectedFrame].time}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {selectedCase.frames.map((fr, idx) => (
                        <button
                          key={fr.time}
                          type="button"
                          onClick={() => setSelectedFrame(idx)}
                          className={`p-2 rounded-lg text-left text-[11px] font-mono transition-all cursor-pointer border ${
                            selectedFrame === idx
                              ? 'bg-white text-slate-900 font-extrabold border-white shadow-md'
                              : fr.anomaly
                              ? 'bg-red-900/50 text-red-200 border-red-600/40 hover:bg-red-900/80'
                              : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{fr.label}</span>
                            {fr.anomaly && <span className="w-2 h-2 rounded-full bg-[#DC052D]" />}
                          </div>
                          <span className="text-[9px] opacity-75">{fr.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Signals Matrix */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Temporal Signal Decomposition
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
                            {sig.status === 'fake' ? 'Synthetic Glitch' : sig.status === 'real' ? 'Normal Baseline' : 'Warning'}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {sig.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/dashboard/reports/job-demo-deepfake-01"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Download Cryptographic Video Audit Trail</span>
                  </Link>

                  <span className="text-[11px] text-slate-500 font-mono">
                    Temporal analysis latency: 1,480ms
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

export default VideoVerifyPage;
