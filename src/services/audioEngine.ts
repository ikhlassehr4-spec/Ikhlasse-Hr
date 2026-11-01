/**
 * Audio Engine providing:
 * 1. Procedural Cinematic Orchestral Soundscape using Web Audio API
 * 2. Natural Voiceover Narration using Web SpeechSynthesis
 * 3. Cultural Audio Pronunciation for Arabic & Japanese greetings
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicVolume: number = 0.35;
  private gainNode: GainNode | null = null;
  private chordIntervalId: number | null = null;
  private voiceEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeSceneId: number | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- PROCEDURAL CINEMATIC SOUNDTRACK ---
  // A gentle ambient pentatonic progression blending Japanese In-sen / Hirajoshi & Algerian Bayati/Rast harmonic resonances
  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;
    this.isMusicPlaying = true;

    // Notes in Hz: Pentatonic D minor / Hirajoshi (D, Eb, G, A, Bb, D5) & Mediterranean Oud harmonics
    const chords = [
      [146.83, 220.00, 261.63, 329.63], // Dm9 gentle
      [130.81, 196.00, 246.94, 329.63], // Cmaj9
      [116.54, 174.61, 233.08, 293.66], // Bbmaj7
      [146.83, 220.00, 293.66, 369.99], // D / A oriental warm
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.ctx || !this.isMusicPlaying || !this.gainNode) return;
      const now = this.ctx.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Soft sine and triangle mix for flute/harp/oud gentle ambiance
        osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope with slow attack and release
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(0.045 / (idx + 1), now + 2.5);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

        osc.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start(now);
        osc.stop(now + 8);
      });
    };

    playChord();
    this.chordIntervalId = window.setInterval(playChord, 6500);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.chordIntervalId) {
      clearInterval(this.chordIntervalId);
      this.chordIntervalId = null;
    }
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  public getMusicVolume() {
    return this.musicVolume;
  }

  public isMusicActive() {
    return this.isMusicPlaying;
  }

  // --- VOICEOVER NARRATION ---
  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (!enabled) {
      this.stopNarration();
    }
  }

  public isVoiceActive() {
    return this.voiceEnabled;
  }

  public speakNarration(text: string, sceneId: number, speed: number = 0.95) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (this.activeSceneId === sceneId && window.speechSynthesis.speaking) {
      return;
    }

    this.stopNarration();
    this.activeSceneId = sceneId;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Pick best natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopNarration() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.activeSceneId = null;
    }
  }

  public pauseNarration() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resumeNarration() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  // --- PRONUNCIATION SOUNDS ---
  public speakWord(text: string, lang: 'ar' | 'ja' | 'en') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.lang = lang === 'ar' ? 'ar-SA' : lang === 'ja' ? 'ja-JP' : 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  // Scene transition chime
  public playTransitionChime() {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5

    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.linearRampToValueAtTime(0.04, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(chimeGain);
    chimeGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 1.0);
  }
}

export const audioEngine = new AudioEngine();
