import React, { useState, useCallback } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ScanningScreen } from './components/ScanningScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { analyzeContract } from './services/geminiService';
import { ScreenState, AnalysisResult, ScanStatus } from './types';

function App() {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.HOME);
  const [scanStatus, setScanStatus] = useState<ScanStatus>({ message: 'Initializing...', progress: 0 });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const startAnalysis = useCallback(async (text: string) => {
    setScreen(ScreenState.SCANNING);
    setScanStatus({ message: 'Reading document...', progress: 10 });

    // Simulate progress while waiting for API
    const progressInterval = setInterval(() => {
      setScanStatus(prev => {
        if (prev.progress >= 90) return prev;
        return { ...prev, progress: prev.progress + (Math.random() * 5) };
      });
    }, 500);

    // Dynamic messages
    const messageTimeout1 = setTimeout(() => setScanStatus(prev => ({ ...prev, message: 'Checking IP rights...' })), 1500);
    const messageTimeout2 = setTimeout(() => setScanStatus(prev => ({ ...prev, message: 'Analyzing non-competes...' })), 3500);

    try {
      const data = await analyzeContract(text);
      clearInterval(progressInterval);
      clearTimeout(messageTimeout1);
      clearTimeout(messageTimeout2);
      
      setScanStatus({ message: 'Finalizing report...', progress: 100 });
      
      // Slight delay to show 100%
      setTimeout(() => {
        setResult(data);
        setScreen(ScreenState.RESULTS);
      }, 500);

    } catch (error) {
      console.error("Analysis process error", error);
      setScreen(ScreenState.ERROR);
      alert("Something went wrong. Please check your API key or internet connection.");
      setScreen(ScreenState.HOME);
    }
  }, []);

  const handleBack = () => {
    setScreen(ScreenState.HOME);
    setResult(null);
    setScanStatus({ message: '', progress: 0 });
  };

  const handleCancelScan = () => {
     setScreen(ScreenState.HOME);
     setScanStatus({ message: '', progress: 0 });
  };

  return (
    <div className="w-full h-full flex justify-center bg-background-light dark:bg-background-dark">
      {screen === ScreenState.HOME && (
        <HomeScreen onAnalyze={startAnalysis} />
      )}

      {screen === ScreenState.SCANNING && (
        <ScanningScreen onCancel={handleCancelScan} status={scanStatus} />
      )}

      {screen === ScreenState.RESULTS && result && (
        <ResultsScreen result={result} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
