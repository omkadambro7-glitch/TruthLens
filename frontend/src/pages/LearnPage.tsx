import React, { useState } from 'react';
import { BookOpen, Gamepad2, CheckCircle2, XCircle, RotateCcw, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

interface GameQuestion {
  id: number;
  title: string;
  scenario: string;
  imageVisualDescription: string;
  options: { text: string; isCorrect: boolean; explanation: string }[];
}

export const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'game'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);

  // Spot-the-Fake Game state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const lessons = [
    {
      title: "1. Limitations of Visual Human Inspection",
      category: "Cognitive Bias & Forensics",
      summary: "Why our eyes are consistently deceived by modern diffusion models and how to look past surface realism.",
      content: (
        <div className="space-y-4 text-xs text-[#4B5563] leading-relaxed">
          <p>
            Human vision is optimized for semantic coherence—recognizing faces, lighting direction, and emotion—rather than pixel-level statistical consistency. State-of-the-art diffusion models (like Midjourney v6 and SDXL) generate photorealistic textures that easily fool human visual scrutiny.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E6DF] rounded-xl space-y-2">
            <strong className="text-[#20252B] block">Key Takeaway:</strong>
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
        <div className="space-y-4 text-xs text-[#4B5563] leading-relaxed">
          <p>
            When an image is saved in JPEG format, lossy discrete cosine transform (DCT) quantization discards imperceptible high-frequency color variations. If a photo is edited—for instance, inserting a face or modifying a signature—the modified section is compressed at a different generation than the background.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E6DF] rounded-xl space-y-2">
            <strong className="text-[#20252B] block">How ELA Works:</strong>
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
        <div className="space-y-4 text-xs text-[#4B5563] leading-relaxed">
          <p>
            A common misconception is that if an image lacks camera EXIF data (shutter speed, ISO, GPS, camera model), it must be an AI deepfake. In reality, almost all major social platforms (WhatsApp, X, Instagram, Facebook) automatically strip EXIF metadata for privacy and bandwidth reasons.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E6DF] rounded-xl space-y-2">
            <strong className="text-[#20252B] block">Forensic Rule of Thumb:</strong>
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
        <div className="space-y-4 text-xs text-[#4B5563] leading-relaxed">
          <p>
            Medical certificates require logical and jurisdictional verification, not just image forensics. A student might submit a genuine certificate captured on a budget smartphone with heavy camera noise and blurred text.
          </p>
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E6DF] rounded-xl space-y-2">
            <strong className="text-[#20252B] block">Mandatory Ethical Safeguard:</strong>
            <p>
              Never allow an automated algorithm to punish or reject a student based on a risk score. Algorithmic scores flag documents for human verification; they must never act as prosecutor, judge, or jury.
            </p>
          </div>
        </div>
      )
    }
  ];

  const gameQuestions: GameQuestion[] = [
    {
      id: 1,
      title: "Corneal Reflection Symmetry",
      scenario: "You are examining a high-resolution portrait photograph of an executive claimed to be a deepfake.",
      imageVisualDescription: "Zooming in on the eyes reveals that the left eye reflects a rectangular window, while the right eye reflects an outdoor sunlit tree canopy.",
      options: [
        {
          text: "Likely Synthetic / Deepfake",
          isCorrect: true,
          explanation: "Correct! Generative models frequently generate corneal light reflections independently in each eye without physical 3D scene consistency."
        },
        {
          text: "Definitively Real Photograph",
          isCorrect: false,
          explanation: "Incorrect. Optical cameras capture light from the same physical environment into both corneas. Conflicting reflections are a hallmark of deepfakes."
        }
      ]
    },
    {
      id: 2,
      title: "Social Media Image Without EXIF",
      scenario: "An investigative reporter downloads a viral image from Twitter. Inspection shows zero EXIF camera tags.",
      imageVisualDescription: "The file header contains standard JFIF markers but no camera make, model, or timestamp.",
      options: [
        {
          text: "Definitive Proof of Forgery",
          isCorrect: false,
          explanation: "Incorrect! Social media networks routinely strip EXIF metadata to protect user privacy and compress bandwidth."
        },
        {
          text: "Inconclusive Signal (Standard Social Recompression)",
          isCorrect: true,
          explanation: "Correct! Metadata absence is completely normal for web imagery and cannot be used alone as evidence of manipulation."
        }
      ]
    },
    {
      id: 3,
      title: "Medical Certificate Chronology",
      scenario: "A university reviewer examines a medical leave certificate for student sick leave.",
      imageVisualDescription: "The certificate states 'Leave from 25/11/2026 to 20/11/2026' for a stated duration of 5 days.",
      options: [
        {
          text: "High-Priority Human Review Flag (Chronological Impossibility)",
          isCorrect: true,
          explanation: "Correct! A leave start date occurring after the end date is a logical impossibility indicating template tampering or critical clerical error."
        },
        {
          text: "Automated Rejection & Student Suspension",
          isCorrect: false,
          explanation: "Incorrect! TruthLens safeguards require contacting the student or clinic for clarification first; automated discipline is strictly prohibited."
        }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (gameQuestions[currentQuestionIdx].options[index].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIdx + 1 < gameQuestions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setGameFinished(false);
  };

  const currentQ = gameQuestions[currentQuestionIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#20252B] tracking-tight font-display">
            Media Literacy Hub & Spot-the-Fake
          </h1>
          <p className="text-sm text-[#68717D]">
            Explore digital media forensics fundamentals and test your verification instincts.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E8E6DF] text-xs font-bold">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'lessons' ? 'bg-[#116B67] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Lessons
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'game' ? 'bg-[#7663D8] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Spot-the-Fake Game
          </button>
        </div>
      </div>

      {/* LESSONS VIEW */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Lesson Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {lessons.map((lesson, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLesson(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedLesson === idx
                    ? 'bg-white border-[#116B67] shadow-xs'
                    : 'bg-[#FAF9F6] border-[#E8E6DF] hover:bg-white text-[#68717D]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#116B67] block mb-1">
                  {lesson.category}
                </span>
                <strong className="text-sm text-[#20252B] font-display block">
                  {lesson.title}
                </strong>
                <p className="text-xs text-[#68717D] mt-1 line-clamp-2">
                  {lesson.summary}
                </p>
              </button>
            ))}
          </div>

          {/* Lesson Content Area */}
          <div className="lg:col-span-8 card-elevation p-8 bg-white border border-[#E8E6DF] flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#116B67] bg-[#E6F3F2] px-3 py-1 rounded-full w-fit">
              {lessons[selectedLesson].category}
            </span>
            <h2 className="text-2xl font-bold text-[#20252B] font-display">
              {lessons[selectedLesson].title}
            </h2>
            <div className="pt-2 border-t border-[#E8E6DF]">
              {lessons[selectedLesson].content}
            </div>
          </div>

        </div>
      )}

      {/* SPOT-THE-FAKE GAME VIEW */}
      {activeTab === 'game' && (
        <div className="max-w-3xl mx-auto w-full">
          <div className="card-elevation p-8 bg-white border border-[#E8E6DF] flex flex-col gap-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#7663D8]" />
                <span className="font-bold text-sm text-[#20252B] font-display">Spot-the-Fake Interactive Challenge</span>
              </div>
              <span className="text-xs font-bold text-[#7663D8] bg-[#EFEFFC] px-3 py-1 rounded-full">
                Score: {score} / {gameQuestions.length}
              </span>
            </div>

            {!gameFinished ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#68717D] tracking-wider block">
                    Question {currentQuestionIdx + 1} of {gameQuestions.length}: {currentQ.title}
                  </span>
                  <h3 className="text-lg font-bold text-[#20252B] font-display mt-1">
                    {currentQ.scenario}
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] text-xs text-[#4B5563] leading-relaxed">
                  <strong>Visual Observation:</strong> {currentQ.imageVisualDescription}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const showFeedback = selectedOption !== null;
                    return (
                      <button
                        key={idx}
                        disabled={showFeedback}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-start justify-between gap-3 ${
                          showFeedback
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : isSelected
                              ? 'bg-red-50 border-red-300 text-red-800'
                              : 'bg-white border-[#E8E6DF] text-[#68717D] opacity-60'
                            : 'bg-white border-[#E8E6DF] hover:border-[#7663D8] hover:bg-[#FAF9F6] text-[#20252B]'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {showFeedback && (
                          opt.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : isSelected ? <XCircle className="w-4 h-4 text-red-600 shrink-0" /> : null
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Callout */}
                {selectedOption !== null && (
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF] space-y-3 animate-fadeIn">
                    <p className="text-xs text-[#374151] leading-relaxed">
                      {currentQ.options[selectedOption].explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="brand-gradient text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                    >
                      {currentQuestionIdx + 1 < gameQuestions.length ? "Next Challenge →" : "Finish Game"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFEFFC] text-[#7663D8] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#20252B] font-display">Challenge Complete!</h3>
                <p className="text-sm text-[#68717D]">
                  You scored <strong>{score} out of {gameQuestions.length}</strong> on digital authenticity detection principles.
                </p>
                <button
                  onClick={restartGame}
                  className="brand-gradient text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default LearnPage;
