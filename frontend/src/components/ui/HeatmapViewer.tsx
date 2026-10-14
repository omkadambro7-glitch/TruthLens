import React, { useState } from 'react';
import { Layers, Sliders, Info, Eye, Image as ImageIcon } from 'lucide-react';

interface HeatmapViewerProps {
  originalImageUrl: string;
  heatmapUrl?: string;
  title?: string;
}

export const HeatmapViewer: React.FC<HeatmapViewerProps> = ({
  originalImageUrl,
  heatmapUrl,
  title = "Forensic Error Level Analysis (ELA) Saliency Overlay"
}) => {
  const [opacity, setOpacity] = useState<number>(60);
  const [viewMode, setViewMode] = useState<'overlay' | 'split' | 'original' | 'heatmap'>('overlay');

  return (
    <div className="card-elevation p-5 bg-white flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6DF] pb-3">
        <div>
          <h3 className="text-base font-bold text-[#20252B] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#116B67]" />
            {title}
          </h3>
          <p className="text-xs text-[#68717D] mt-0.5">
            Bright regions indicate compression inconsistencies or localized synthetic variance across 8×8 blocks.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E6DF] text-xs font-semibold">
          <button
            onClick={() => setViewMode('overlay')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'overlay' ? 'bg-[#116B67] text-white shadow-xs' : 'text-[#68717D] hover:text-[#20252B]'}`}
          >
            Overlay
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'split' ? 'bg-[#116B67] text-white shadow-xs' : 'text-[#68717D] hover:text-[#20252B]'}`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'original' ? 'bg-[#116B67] text-white shadow-xs' : 'text-[#68717D] hover:text-[#20252B]'}`}
          >
            Original
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'heatmap' ? 'bg-[#116B67] text-white shadow-xs' : 'text-[#68717D] hover:text-[#20252B]'}`}
          >
            ELA Difference
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative rounded-xl overflow-hidden bg-[#1A1D20] min-h-[340px] max-h-[500px] flex items-center justify-center border border-[#E8E6DF]">
        {viewMode === 'overlay' && (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            {/* Base original image */}
            <img
              src={originalImageUrl}
              alt="Original target"
              className="max-h-[460px] max-w-full object-contain rounded-lg"
            />
            {/* Heatmap overlay */}
            {heatmapUrl && (
              <img
                src={heatmapUrl}
                alt="ELA Overlay"
                className="absolute max-h-[460px] max-w-full object-contain rounded-lg pointer-events-none mix-blend-screen"
                style={{ opacity: opacity / 100 }}
              />
            )}
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full p-2">
            <div className="flex flex-col items-center justify-center relative bg-black/40 rounded-lg p-1">
              <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">
                Original Input
              </span>
              <img
                src={originalImageUrl}
                alt="Original target"
                className="max-h-[380px] max-w-full object-contain rounded-sm"
              />
            </div>
            <div className="flex flex-col items-center justify-center relative bg-black/40 rounded-lg p-1">
              <span className="absolute top-2 left-2 bg-[#7663D8] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">
                Forensic ELA Map
              </span>
              {heatmapUrl ? (
                <img
                  src={heatmapUrl}
                  alt="Forensic ELA Map"
                  className="max-h-[380px] max-w-full object-contain rounded-sm"
                />
              ) : (
                <div className="text-white/60 text-xs">Heatmap unavailable for current input</div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'original' && (
          <div className="p-2 flex items-center justify-center w-full">
            <img
              src={originalImageUrl}
              alt="Original target"
              className="max-h-[460px] max-w-full object-contain rounded-lg"
            />
          </div>
        )}

        {viewMode === 'heatmap' && (
          <div className="p-2 flex items-center justify-center w-full">
            {heatmapUrl ? (
              <img
                src={heatmapUrl}
                alt="Forensic ELA Map"
                className="max-h-[460px] max-w-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-white/60 text-xs">Heatmap calculation in progress...</div>
            )}
          </div>
        )}
      </div>

      {/* Controls & Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        {viewMode === 'overlay' && (
          <div className="flex items-center gap-3 w-full sm:w-64">
            <Sliders className="w-4 h-4 text-[#68717D]" />
            <span className="text-xs font-semibold text-[#68717D] min-w-16">
              Opacity: {opacity}%
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-[#116B67] cursor-pointer h-1.5 bg-[#E8E6DF] rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-[#68717D] bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-[#E8E6DF]">
          <Info className="w-3.5 h-3.5 text-[#116B67]" />
          <span>
            <strong>Legend:</strong> Uniform dark background = authentic single-source compression. Glowing patches = compression disparity.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapViewer;
