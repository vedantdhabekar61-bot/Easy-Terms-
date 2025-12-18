import React, { useEffect, useState } from 'react';
import { ScanStatus } from '../types';

interface ScanningScreenProps {
  onCancel: () => void;
  status: ScanStatus;
}

export const ScanningScreen: React.FC<ScanningScreenProps> = ({ onCancel, status }) => {
  return (
    <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center p-6 gap-10 relative z-10 h-full">
      
      {/* Status Chip */}
      <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#1A2C22] border border-primary/20 pl-3 pr-4 shadow-glow-sm">
        <span className="material-symbols-outlined text-primary text-[20px] animate-pulse">auto_awesome</span>
        <p className="text-primary text-sm font-semibold tracking-wide">AI Processing</p>
      </div>

      {/* Document Scan Visual */}
      <div className="relative w-72 aspect-[3/4] bg-[#1c2e25] rounded-2xl border border-white/5 shadow-2xl overflow-hidden group">
        {/* Document Skeleton Content */}
        <div className="absolute inset-0 p-8 flex flex-col gap-4 opacity-40">
          <div className="h-5 w-3/4 bg-white/20 rounded-md"></div>
          <div className="h-4 w-1/2 bg-white/10 rounded-md mb-4"></div>
          <div className="space-y-2">
            <div className="h-2.5 w-full bg-white/10 rounded-sm"></div>
            <div className="h-2.5 w-full bg-white/10 rounded-sm"></div>
            <div className="h-2.5 w-5/6 bg-white/10 rounded-sm"></div>
            <div className="h-2.5 w-full bg-white/10 rounded-sm"></div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-2.5 w-full bg-white/10 rounded-sm"></div>
            <div className="h-2.5 w-11/12 bg-white/10 rounded-sm"></div>
            <div className="h-2.5 w-4/6 bg-white/10 rounded-sm"></div>
          </div>
          <div className="mt-auto flex gap-3 items-center">
            <div className="h-10 w-10 rounded-full bg-white/10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-sm"></div>
              <div className="h-2 w-2/3 bg-white/10 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* The Scan Line (Animation) */}
        <div className="absolute top-[10%] left-0 w-full z-20 animate-scan">
          {/* Glowing Line */}
          <div className="h-[2px] w-full bg-primary shadow-[0_0_15px_2px_rgba(48,232,122,0.8)]"></div>
          {/* Gradient Trail Below */}
          <div className="h-24 w-full bg-gradient-to-b from-primary/20 to-transparent"></div>
        </div>
      </div>

      {/* Text Feedback */}
      <div className="flex flex-col items-center text-center gap-2 w-full max-w-xs mx-auto">
        <h2 className="text-white text-[26px] font-bold leading-tight">{status.message}</h2>
        <p className="text-white/60 text-base font-normal leading-relaxed">This usually takes about 5-10 seconds.</p>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-[260px] flex flex-col gap-2">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full shadow-glow transition-all duration-300 ease-out"
            style={{ width: `${status.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between px-1">
          <span className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Scanning</span>
          <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{Math.round(status.progress)}%</span>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-center pb-6 z-10">
        <button 
            onClick={onCancel}
            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px] text-white/70 group-hover:text-white transition-colors">close</span>
          <span>Cancel Scan</span>
        </button>
      </div>
    </div>
  );
};
