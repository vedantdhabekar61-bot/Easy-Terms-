export enum ScreenState {
  HOME = 'HOME',
  SCANNING = 'SCANNING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export enum RiskLevel {
  LOW = 'Low Risk',
  MEDIUM = 'Medium Risk',
  HIGH = 'High Risk'
}

export interface RedFlag {
  title: string;
  explanation: string;
  originalText: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  score: number; // 0-100, where 100 is safe, 0 is dangerous
  summary: string;
  redFlags: RedFlag[];
}

export interface ScanStatus {
  message: string;
  progress: number;
}
