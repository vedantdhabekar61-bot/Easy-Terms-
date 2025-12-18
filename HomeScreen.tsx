import React, { useState } from 'react';

interface HomeScreenProps {
  onAnalyze: (text: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onAnalyze }) => {
  const [text, setText] = useState('');
  const [inputMethod, setInputMethod] = useState<'paste' | 'upload'>('paste');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.trim().length > 10) {
      onAnalyze(text);
    } else {
      alert("Please enter at least 10 characters of legal text.");
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
          if (event.target?.result) {
              setText(event.target.result as string);
              setInputMethod('paste'); // Switch back to view the text
          }
      };
      reader.readAsText(file);
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto border-x border-black/5 dark:border-white/5 shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>verified_user</span>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">RiskScanner</span>
        </div>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">history</span>
        </button>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col px-6 pb-32 overflow-y-auto no-scrollbar">
        {/* Headline */}
        <div className="mt-4 mb-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            Don't sign until you <br />
            <span className="text-slate-400 dark:text-slate-500">know the risks.</span>
          </h1>
        </div>

        {/* Hero Input Area */}
        <div className="flex-1 min-h-[280px] relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-lg -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <label className="sr-only" htmlFor="doc-text">Paste your document text</label>
          
          <textarea
            className="w-full h-full min-h-[280px] resize-none rounded-lg bg-surface-light dark:bg-surface-dark border-0 p-5 text-sm md:text-base font-mono leading-relaxed shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none text-slate-800 dark:text-slate-200"
            id="doc-text"
            placeholder={inputMethod === 'paste' ? "Paste your rental lease, freelance contract, or NDA here..." : "Uploaded text will appear here..."}
            value={text}
            onChange={handleTextChange}
            disabled={inputMethod === 'upload'}
          ></textarea>

          {/* Floating corner icon/hint */}
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-background-light dark:bg-background-dark px-2 py-1 rounded border border-black/5 dark:border-white/5">
              TXT
            </span>
          </div>
        </div>

        {/* Input Methods (Segmented Buttons) */}
        <div className="mt-6">
          <div className="flex p-1 bg-surface-light dark:bg-surface-dark rounded-full border border-black/5 dark:border-white/5 shadow-sm">
            <label className="flex-1 relative cursor-pointer group">
              <input 
                type="radio" 
                name="input_method" 
                className="peer sr-only" 
                value="paste"
                checked={inputMethod === 'paste'}
                onChange={() => setInputMethod('paste')}
              />
              <div className="flex items-center justify-center py-2.5 rounded-full text-sm font-medium text-slate-500 transition-all peer-checked:bg-background-dark dark:peer-checked:bg-background-light peer-checked:text-white dark:peer-checked:text-background-dark peer-checked:shadow-md">
                <span className="material-symbols-outlined mr-2 text-[18px]">content_paste</span>
                Paste Text
              </div>
            </label>
            <label className="flex-1 relative cursor-pointer group">
              <input 
                type="radio" 
                name="input_method" 
                className="peer sr-only" 
                value="upload"
                checked={inputMethod === 'upload'}
                onChange={() => setInputMethod('upload')}
              />
              <div className="flex items-center justify-center py-2.5 rounded-full text-sm font-medium text-slate-500 transition-all peer-checked:bg-background-dark dark:peer-checked:bg-background-light peer-checked:text-white dark:peer-checked:text-background-dark peer-checked:shadow-md">
                 <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    accept=".txt,.md,.json"
                    onChange={handleFileUpload}
                 />
                <span className="material-symbols-outlined mr-2 text-[18px]">upload_file</span>
                Upload File
              </div>
            </label>
          </div>
        </div>

        {/* Incognito Toggle */}
        <div className="mt-6 mb-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-light dark:bg-background-dark text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined">visibility_off</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Incognito Mode</span>
                <span className="text-xs text-slate-500 dark:text-slate-500">Data is not saved to cloud</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </main>

      {/* Bottom CTA Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark z-20">
        <button 
          onClick={handleSubmit}
          className="group w-full relative flex items-center justify-center gap-3 bg-primary hover:bg-green-400 text-background-dark font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_20px_rgba(48,232,122,0.3)] transition-all active:scale-[0.98]">
          <span>Find Red Flags</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-3">
          By scanning, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};
