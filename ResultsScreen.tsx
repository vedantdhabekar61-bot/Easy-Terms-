import React from 'react';
import { AnalysisResult, RiskLevel } from '../types';

interface ResultsScreenProps {
  result: AnalysisResult;
  onBack: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onBack }) => {
  const isHighRisk = result.riskLevel === RiskLevel.HIGH;
  const isMediumRisk = result.riskLevel === RiskLevel.MEDIUM;

  const riskColor = isHighRisk ? 'text-danger' : isMediumRisk ? 'text-yellow-400' : 'text-primary';
  const riskBg = isHighRisk ? 'bg-danger' : isMediumRisk ? 'bg-yellow-400' : 'bg-primary';
  const riskBorder = isHighRisk ? 'border-danger' : isMediumRisk ? 'border-yellow-400' : 'border-primary';
  const cardGradient = isHighRisk ? 'from-danger-bg to-[#1a0f0f]' : isMediumRisk ? 'from-[#2A2612] to-[#1a180f]' : 'from-[#0f1a13] to-[#0b120e]';
  const shadowColor = isHighRisk ? 'shadow-danger/5' : isMediumRisk ? 'shadow-yellow-400/5' : 'shadow-primary/5';

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
      {/* Top App Bar */}
      <div className="flex items-center px-6 py-4 justify-between bg-background-light dark:bg-background-dark z-20 shrink-0">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-white/80 hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Red Flag Report</h2>
        <div className="size-10"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        {/* Threat Level Card */}
        <div className="mt-2 mb-8">
          <div className={`relative overflow-hidden flex flex-col items-center justify-center gap-3 rounded-xl border ${riskBorder}/30 bg-gradient-to-br ${cardGradient} p-6 text-center shadow-lg ${shadowColor}`}>
            {/* Background Glow Effect */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${riskBg}/20 rounded-full blur-3xl pointer-events-none`}></div>
            
            <div className={`flex items-center justify-center size-14 rounded-full ${riskBg}/10 ${riskColor} mb-1 border ${riskBorder}/20`}>
              <span className="material-symbols-outlined text-3xl">
                {isHighRisk ? 'warning' : 'verified_user'}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 z-10">
              <h3 className={`${riskColor} text-2xl font-bold leading-tight tracking-tight`}>{result.riskLevel}</h3>
              <p className="text-slate-700 dark:text-white/70 text-sm font-medium">{result.summary}</p>
            </div>
            
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`${riskBg} h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Risk Cards List */}
        <div className="flex flex-col gap-4">
          <h3 className="text-slate-500 dark:text-white/50 text-xs font-bold uppercase tracking-widest px-1 mb-1">
            Critical Issues Found ({result.redFlags.length})
          </h3>
          
          {result.redFlags.map((flag, index) => (
            <details key={index} className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-black/5 dark:border-white/5 open:border-danger/30 transition-all duration-300">
              <summary className="cursor-pointer block relative">
                <div className="p-5 flex gap-4">
                  {/* Left: Content */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{flag.title}</h4>
                      {flag.severity === 'CRITICAL' && (
                        <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-[#9db8a8] text-sm font-normal leading-relaxed">
                      {flag.explanation}
                    </p>
                  </div>
                  {/* Right: Indicator */}
                  <div className="flex flex-col items-center justify-start pt-1">
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-surface-highlight flex items-center justify-center group-open:bg-danger/20 group-open:text-danger transition-colors text-slate-400 dark:text-white/40">
                      <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-xl">keyboard_arrow_down</span>
                    </div>
                  </div>
                </div>
                {/* Collapsed Hint */}
                <div className="absolute bottom-4 right-16 text-[10px] uppercase font-bold text-primary opacity-0 group-open:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Show Source
                </div>
              </summary>
              {/* Expanded Content */}
              <div className="px-5 pb-5 pt-0">
                <div className="border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-white/40 uppercase tracking-widest">Original Legal Text</span>
                    <div className="h-px bg-black/5 dark:bg-white/10 flex-1"></div>
                  </div>
                  <div className="bg-slate-100 dark:bg-black/40 rounded-lg p-4 border border-black/5 dark:border-white/5 font-mono text-xs text-slate-600 dark:text-gray-400 leading-relaxed relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger/50"></div>
                    <p>"{flag.originalText}"</p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pt-2 bg-gradient-to-t from-background-light via-background-light dark:from-background-dark dark:via-background-dark to-transparent z-30">
        <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary text-background-dark shadow-lg shadow-primary/25 transition-all active:scale-[0.98] hover:shadow-primary/40">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-lg font-bold leading-normal tracking-wide mr-2">Copy Email to Recruiter</span>
            <span className="material-symbols-outlined text-xl">content_copy</span>
        </button>
        
        {/* Bottom Nav (Visual Only) */}
        <div className="flex justify-between items-center px-6 pt-4 pb-2 mt-2 border-t border-black/5 dark:border-white/5">
          <a className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity" href="#">
            <span className="material-symbols-outlined text-slate-500 dark:text-[#9db8a8]">home</span>
          </a>
          <a className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity" href="#">
            <span className="material-symbols-outlined text-slate-500 dark:text-[#9db8a8]">description</span>
          </a>
          <a className="flex flex-col items-center gap-1 opacity-100 relative" href="#">
            <div className="absolute -top-1 right-0 w-2 h-2 bg-danger rounded-full"></div>
            <span className="material-symbols-outlined text-slate-900 dark:text-white fill-current">shield_with_house</span>
          </a>
          <a className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity" href="#">
            <span className="material-symbols-outlined text-slate-500 dark:text-[#9db8a8]">person</span>
          </a>
        </div>
      </div>
    </div>
  );
};
