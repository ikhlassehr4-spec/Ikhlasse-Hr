export interface SubtitleCue {
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
}

export interface Scene {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  narration: string;
  subtitleCues: SubtitleCue[];
  onScreenTitle: string;
  onScreenSubtitle?: string;
  cameraMovement: 'zoom-in' | 'zoom-out' | 'pan-right' | 'pan-left' | 'split-screen';
  countryFocus: 'both' | 'algeria' | 'japan';
  imageSrc?: string;
  brochureReference: string;
  keyPoints: string[];
  culturalDetails: {
    algeria?: string;
    japan?: string;
  };
}

export interface CulturalTopic {
  id: string;
  title: string;
  algeria: {
    title: string;
    description: string;
    items: string[];
    highlight: string;
  };
  japan: {
    title: string;
    description: string;
    items: string[];
    highlight: string;
  };
  bridgeTakeaway: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
