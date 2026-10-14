import React, { useState, useEffect } from 'react';
import { BarChart3, ShieldCheck, AlertCircle, CheckCircle2, Info, Layers, Sliders } from 'lucide-react';

interface Benchmark {
  dataset_name: string;
  sample_size: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  abstention_rate: number;
  confusion_matrix: {
    true_real: number;
    false_fake: number;
    true_fake: number;
    false_real: number;
    abstained_inconclusive: number;
  };
  domain: string;
}

export const AccuracyPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedBenchmark, setSelectedBenchmark] = useState<number>(0);

  useEffect(() => {
    fetch('/api/v1/accuracy/metrics')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#116B67] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#68717D]">Loading versioned evaluation artifacts...</p>
      </div>
    );
  }

  const bm: Benchmark = data.benchmarks[selectedBenchmark];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-[#20252B] tracking-tight font-display">
          Model Accuracy, Calibration & Evaluation Limits
        </h1>
        <p className="text-sm text-[#68717D]">
          Transparent, verifiable benchmark evaluation results across standardized deepfake and forensic datasets.
        </p>
      </div>

      {/* Honest Scientific Disclosure Banner */}
      <div className="p-5 rounded-2xl bg-[#FEF8EC] border border-[#FDE68A] flex items-start gap-4">
        <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="text-xs text-[#92400E] leading-relaxed">
          <strong>Methodological Disclosure:</strong> Research benchmarks (FaceForensics++, SynthBuster) reflect controlled lab test splits. Real-world social media media performance will be lower due to heavy re-compression, aggressive resizing, and unobserved generative architectures. TruthLens operates with a dedicated <strong>Abstention Region (33% – 67%)</strong> where our engine deliberately returns "NEEDS HUMAN REVIEW" rather than guessing.
        </div>
      </div>

      {/* Engine & Threshold Config Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] tracking-wider block">Engine Architecture</span>
          <strong className="text-sm text-[#20252B] font-display block mt-1">{data.engine_version}</strong>
          <span className="text-xs text-[#8A92A0] block mt-1">Evaluated on: {data.evaluation_date}</span>
        </div>

        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] tracking-wider block">Decision Thresholds</span>
          <strong className="text-sm text-[#20252B] font-display block mt-1">
            Fake: ≥ 0.68 | Real: ≤ 0.32
          </strong>
          <span className="text-xs text-amber-700 block mt-1">Abstention Zone: 0.33 – 0.67</span>
        </div>

        <div className="card-elevation p-5 bg-white border border-[#E8E6DF]">
          <span className="text-[10px] uppercase font-bold text-[#68717D] tracking-wider block">Evaluation Governance</span>
          <strong className="text-sm text-[#116B67] font-display block mt-1">Open Authenticity Standard</strong>
          <span className="text-xs text-[#68717D] block mt-1">Zero Fabricated Certifications</span>
        </div>
      </div>

      {/* Benchmark Selector Tabs */}
      <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6DF] mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#20252B] font-display flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#116B67]" />
              Evaluation Benchmark Results
            </h3>
            <p className="text-xs text-[#68717D]">
              Select a benchmark dataset to inspect precision, recall, and confusion matrix.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E6DF] text-xs font-bold">
            {data.benchmarks.map((b: Benchmark, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedBenchmark(idx)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedBenchmark === idx ? 'bg-[#116B67] text-white shadow-2xs' : 'text-[#68717D] hover:text-[#20252B]'
                }`}
              >
                {b.dataset_name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Benchmark Metrics */}
        {bm && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E6DF]">
              <div>
                <strong className="text-base text-[#20252B] font-display">{bm.dataset_name}</strong>
                <span className="text-xs text-[#68717D] block mt-0.5">{bm.domain}</span>
              </div>
              <span className="text-xs font-bold text-[#116B67] bg-[#E6F3F2] px-3 py-1 rounded-full">
                Sample Size: {bm.sample_size.toLocaleString()} artifacts
              </span>
            </div>

            {/* Metric Score Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-center">
                <span className="text-[10px] uppercase font-bold text-[#68717D] block">Precision</span>
                <span className="text-2xl font-extrabold text-[#116B67] font-display block mt-1">
                  {(bm.precision * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-[#8A92A0]">Low false alarms</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-center">
                <span className="text-[10px] uppercase font-bold text-[#68717D] block">Recall</span>
                <span className="text-2xl font-extrabold text-[#7663D8] font-display block mt-1">
                  {(bm.recall * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-[#8A92A0]">True manipulation detected</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-center">
                <span className="text-[10px] uppercase font-bold text-[#68717D] block">F1-Score</span>
                <span className="text-2xl font-extrabold text-[#20252B] font-display block mt-1">
                  {(bm.f1_score * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-[#8A92A0]">Harmonic mean</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-center">
                <span className="text-[10px] uppercase font-bold text-[#68717D] block">ROC-AUC</span>
                <span className="text-2xl font-extrabold text-[#116B67] font-display block mt-1">
                  {bm.roc_auc.toFixed(3)}
                </span>
                <span className="text-[10px] text-[#8A92A0]">Separability</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-[#68717D] block">Abstention Rate</span>
                <span className="text-2xl font-extrabold text-amber-600 font-display block mt-1">
                  {(bm.abstention_rate * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-amber-700">Sent to human review</span>
              </div>
            </div>

            {/* Confusion Matrix Table */}
            <div className="border border-[#E8E6DF] rounded-2xl p-6 bg-[#FAF9F6]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#68717D] mb-4">
                Confusion Matrix (With Explicit Abstention Cell)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8E6DF] text-[#68717D]">
                      <th className="p-3 text-left">Ground Truth</th>
                      <th className="p-3 bg-[#E6F3F2]/50">Pred: LIKELY REAL</th>
                      <th className="p-3 bg-[#FEF2F2]/50">Pred: LIKELY FAKE</th>
                      <th className="p-3 bg-[#FFFBEB]/60">Pred: NEEDS HUMAN REVIEW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E8E6DF]">
                      <td className="p-3 font-bold text-left text-[#20252B]">Actual Genuine</td>
                      <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50">
                        {bm.confusion_matrix.true_real} (True Real)
                      </td>
                      <td className="p-3 font-mono text-red-700 bg-red-50">
                        {bm.confusion_matrix.false_fake} (False Fake)
                      </td>
                      <td className="p-3 font-mono text-amber-700 bg-amber-50" rowSpan={2}>
                        {bm.confusion_matrix.abstained_inconclusive} (Abstained)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-left text-[#20252B]">Actual Manipulated</td>
                      <td className="p-3 font-mono text-amber-700 bg-amber-50">
                        {bm.confusion_matrix.false_real} (False Real)
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50">
                        {bm.confusion_matrix.true_fake} (True Fake)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Documented Real-World Limitations */}
      <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF]">
        <h3 className="text-base font-bold text-[#20252B] font-display mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          Documented Technical Limitations
        </h3>

        <ul className="space-y-3 text-xs text-[#4B5563]">
          {data.known_limitations.map((limit: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{limit}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default AccuracyPage;
