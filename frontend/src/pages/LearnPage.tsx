import React, { useState } from 'react';
import { BookOpen, Gamepad2, CheckCircle2, XCircle, RotateCcw, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GameQuestion {
  id: number;
  title: string;
  scenario: string;
  leftImg: string;
  rightImg: string;
  syntheticSide: 'left' | 'right';
  explanation: string;
}

const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 1,
    title: "Corneal Specular Reflection Test",
    scenario: "Look at the light reflection in the pupils of both portraits. Natural ambient lighting creates matching reflections in both eyes.",
    leftImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rightImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    syntheticSide: 'left',
    explanation: "The left portrait exhibits mismatched specular reflection geometries: the left pupil reflects an indoor window light while the right pupil reflects an outdoor studio softbox. Inconsistent light sources are a classic deepfake artifact."
  },
  {
    id: 2,
    title: "Background Lattice Coherence Test",
    scenario: "Inspect the architectural lines and background perspective behind the subject.",
    leftImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rightImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    syntheticSide: 'right',
    explanation: "The right image displays subtle melting background lines where the bookshelf disappears into wall texture. Generative latent models often lose semantic coherence in background perimeters."
  },
  {
    id: 3,
    title: "Earring & Bilateral Accessory Symmetry",
    scenario: "Compare earrings, collar stitching, and teeth alignment across the face midline.",
    leftImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    rightImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    syntheticSide: 'left',
    explanation: "The left subject has an earring on one lobe that merges directly into skin cartilage, while the other ear has none. Asymmetrical or morphing accessories are frequent indicators of generative synthesis."
  }
];

export const LearnPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'lessons' | 'game'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);

  // Spot-the-Fake Game state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<'left' | 'right' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const lessons = [
    {
      title: "1. Limitations of Visual Human Inspection",
      category: "Cognitive Bias & Forensics",
      summary: "Why human eyes are consistently deceived by modern diffusion models and how to look past surface realism.",
      content: (
        <div className="space-y-4 text-xs text-[#687386] leading-relaxed">
          <p>
            Human vision is biologically optimized for semantic coherence—recognizing faces, lighting direction, and emotion—rather than pixel-level statistical consistency. State-of-the-art diffusion models generate photorealistic textures that easily fool human visual scrutiny.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DC] rounded-xl space-y-2">
            <strong className="text-[#101B35] block">Forensic Principle:</strong>
            <p>
              Never rely on "gut feeling" or visual inspection alone. Forensic tools examine statistical signals undetectable to the naked eye, such as high-frequency 2D Fourier artifacts and localized compression quantization mismatches.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "2. Error Level Analysis (ELA) Explained",
      category: "Forensic Techniques",
      summary: "How JPEG quantization disparity reveals manipulated or inserted regions in an image.",
      content: (
        <div className="space-y-4 text-xs text-[#687386] leading-relaxed">
          <p>
            When an image is saved in JPEG format, lossy discrete cosine transform (DCT) quantization discards imperceptible high-frequency color variations. If a photo is edited—for instance, inserting a face or modifying a signature—the modified section is compressed at a different generation than the background.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DC] rounded-xl space-y-2">
            <strong className="text-[#101B35] block">How ELA Works:</strong>
            <p>
              ELA intentionally resaves the target image at a known quality level (e.g. 90%) and subtracts it from the original. Areas that have been repeatedly compressed display lower error rates, while newly inserted elements exhibit bright error halos.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "3. Metadata & The Social Media Trap",
      category: "Digital Preservation",
      summary: "Why the absence of camera EXIF is normal and NOT proof of forgery.",
      content: (
        <div className="space-y-4 text-xs text-[#687386] leading-relaxed">
          <p>
            A common misconception is that if an image lacks camera EXIF data (shutter speed, ISO, GPS, camera model), it must be an AI deepfake. In reality, almost all major social platforms (WhatsApp, X, Instagram, Facebook) automatically strip EXIF metadata for privacy and bandwidth reasons.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DC] rounded-xl space-y-2">
            <strong className="text-[#101B35] block">Forensic Rule of Thumb:</strong>
            <p>
              Metadata absence is neutral. However, the presence of explicit generative tags (like "parameters: negative prompt" or ComfyUI node graphs in PNG chunks) provides definitive evidence of synthetic origins.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "4. Medical Document Integrity & Safeguards",
      category: "Document Authentication",
      summary: "Why an image detector cannot verify a medical certificate, and why human review is non-negotiable.",
      content: (
        <div className="space-y-4 text-xs text-[#687386] leading-relaxed">
          <p>
            Medical certificates require specialized document-integrity assessments: physician registration verification against medical councils, date latency sequencing, and physical stamp detection.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DC] rounded-xl space-y-2">
            <strong className="text-[#101B35] block">Student Safeguard Policy:</strong>
            <p>
              Under our ethics framework, Zenin acts solely as a decision-support assistant. No automated system is authorized to penalize a student or declare fraud without human review and appeal rights.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleGuess = (side: 'left' | 'right') => {
    if (userGuess !== null) return;
    setUserGuess(side);
    const q = GAME_QUESTIONS[currentIdx];
    if (side === q.syntheticSide) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < GAME_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setUserGuess(null);
    } else {
      setFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setUserGuess(null);
    setScore(0);
    setFinished(false);
  };

  const currentQ = GAME_QUESTIONS[currentIdx];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {/* Header */}
      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
          <span>Educational Forensic Resources & Interactive Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
          {t('learn.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[#687386] max-w-3xl leading-relaxed">
          {t('learn.subtitle')}
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-[#F1EFE8] pt-2 gap-4">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'lessons' 
                ? 'border-[#101B35] text-[#101B35]' 
                : 'border-transparent text-[#737D90] hover:text-[#101B35]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#233F8C]" />
            <span>Forensic Modules</span>
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'game' 
                ? 'border-[#101B35] text-[#101B35]' 
                : 'border-transparent text-[#737D90] hover:text-[#101B35]'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-[#C6A45C]" />
            <span>Spot-the-Fake Interactive Game</span>
          </button>
        </div>
      </div>

      {activeTab === 'lessons' ? (
        /* Lessons Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            {lessons.map((lesson, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLesson(idx)}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedLesson === idx 
                    ? 'bg-white border-[#C6A45C] shadow-md' 
                    : 'bg-[#FAF9F6] border-[#E8E5DC] hover:bg-white'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-[#233F8C] block mb-1">
                  {lesson.category}
                </span>
                <h4 className="text-sm font-bold text-[#101B35]">{lesson.title}</h4>
                <p className="text-xs text-[#687386] mt-1 leading-relaxed">{lesson.summary}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-5">
              <div className="border-b border-[#F1EFE8] pb-4">
                <span className="text-[10px] uppercase font-bold text-[#233F8C] block mb-1">
                  {lessons[selectedLesson].category}
                </span>
                <h2 className="text-xl font-bold text-[#101B35] font-serif-display">
                  {lessons[selectedLesson].title}
                </h2>
              </div>
              <div>{lessons[selectedLesson].content}</div>
            </div>
          </div>
        </div>
      ) : (
        /* Spot-the-Fake Game */
        <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1EFE8]">
            <div>
              <h2 className="text-xl font-bold text-[#101B35] font-sans">
                {t('learn.game_title')}
              </h2>
              <p className="text-xs text-[#687386]">
                {t('learn.game_subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#101B35] bg-[#FBF8EE] border border-[#E6D5A2] px-3.5 py-1.5 rounded-xl">
                {t('learn.score')}: <strong className="text-[#A88234]">{score} / {GAME_QUESTIONS.length}</strong>
              </span>
              <button
                onClick={resetGame}
                className="p-2 rounded-xl text-[#737D90] hover:text-[#101B35] hover:bg-[#F6F4EE]"
                title="Restart Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!finished ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#233F8C] uppercase tracking-wide">
                  Challenge {currentIdx + 1} of {GAME_QUESTIONS.length}: {currentQ.title}
                </span>
                <p className="text-xs text-[#687386] leading-relaxed">{currentQ.scenario}</p>
              </div>

              {/* Side-by-side Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Card */}
                <div 
                  onClick={() => handleGuess('left')}
                  className={`royal-card p-4 bg-white border-2 transition-all cursor-pointer flex flex-col items-center ${
                    userGuess === 'left'
                      ? userGuess === currentQ.syntheticSide 
                        ? 'border-green-500 bg-green-50/30' 
                        : 'border-red-500 bg-red-50/30'
                      : 'border-[#E8E5DC] hover:border-[#233F8C]'
                  }`}
                >
                  <img src={currentQ.leftImg} alt="Option A" className="rounded-xl h-56 w-full object-cover mb-3" />
                  <button
                    disabled={userGuess !== null}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#101B35] text-white hover:bg-[#233F8C] transition-colors cursor-pointer"
                  >
                    {t('learn.guess_left')}
                  </button>
                </div>

                {/* Right Card */}
                <div 
                  onClick={() => handleGuess('right')}
                  className={`royal-card p-4 bg-white border-2 transition-all cursor-pointer flex flex-col items-center ${
                    userGuess === 'right'
                      ? userGuess === currentQ.syntheticSide 
                        ? 'border-green-500 bg-green-50/30' 
                        : 'border-red-500 bg-red-50/30'
                      : 'border-[#E8E5DC] hover:border-[#233F8C]'
                  }`}
                >
                  <img src={currentQ.rightImg} alt="Option B" className="rounded-xl h-56 w-full object-cover mb-3" />
                  <button
                    disabled={userGuess !== null}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#101B35] text-white hover:bg-[#233F8C] transition-colors cursor-pointer"
                  >
                    {t('learn.guess_right')}
                  </button>
                </div>
              </div>

              {/* Feedback Explanation */}
              {userGuess !== null && (
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  userGuess === currentQ.syntheticSide 
                    ? 'bg-[#EDF7F1] border-[#A3D9B8] text-[#1E824C]' 
                    : 'bg-[#FEF2F2] border-red-200 text-[#DC2626]'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {userGuess === currentQ.syntheticSide ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{t('learn.correct')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>{t('learn.incorrect')}</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed opacity-95">{currentQ.explanation}</p>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-3 bg-[#101B35] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-[#233F8C] transition-colors cursor-pointer"
                  >
                    {t('learn.next_challenge')} →
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Game Finished Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FBF8EE] border border-[#E6D5A2] text-[#A88234] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-[#C6A45C]" />
              </div>
              <h3 className="text-2xl font-bold text-[#101B35] font-serif-display">Challenge Complete!</h3>
              <p className="text-xs text-[#687386]">
                You scored <strong className="text-[#101B35]">{score}</strong> out of <strong className="text-[#101B35]">{GAME_QUESTIONS.length}</strong>.
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs hover:border-[#C6A45C] border border-transparent transition-all cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default LearnPage;
