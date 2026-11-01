import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  Subtitles,
  Info,
  Sparkles
} from 'lucide-react';
import { Scene } from '../types/documentary';
import { SCENES, TOTAL_DURATION } from '../data/documentaryData';
import { audioEngine } from '../services/audioEngine';

interface CinematicPlayerProps {
  currentSceneIndex: number;
  onSceneChange: (index: number) => void;
  onBrochureJump?: () => void;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  currentSceneIndex,
  onSceneChange,
  onBrochureJump
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTakeaways, setShowTakeaways] = useState<boolean>(false);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const lastSpokenSceneRef = useRef<number | null>(null);

  const currentTimeRef = useRef<number>(currentTime);
  currentTimeRef.current = currentTime;

  const currentSceneIndexRef = useRef<number>(currentSceneIndex);
  currentSceneIndexRef.current = currentSceneIndex;

  const onSceneChangeRef = useRef(onSceneChange);
  onSceneChangeRef.current = onSceneChange;

  const currentScene: Scene = SCENES[currentSceneIndex] || SCENES[0];

  // Sync currentTime if currentSceneIndex was changed externally (e.g. via Brochure or Comparison)
  const prevSceneIndexRef = useRef<number>(currentSceneIndex);
  useEffect(() => {
    if (prevSceneIndexRef.current !== currentSceneIndex) {
      prevSceneIndexRef.current = currentSceneIndex;
      const target = SCENES[currentSceneIndex];
      if (
        target &&
        (currentTimeRef.current < target.startTime || currentTimeRef.current >= target.endTime)
      ) {
        currentTimeRef.current = target.startTime;
        setCurrentTime(target.startTime);
      }
    }
  }, [currentSceneIndex]);

  // Active synchronized subtitle cue based on current time
  const activeSubtitle = (() => {
    if (!currentScene) return '';
    if (currentScene.subtitleCues && currentScene.subtitleCues.length > 0) {
      const matched = currentScene.subtitleCues.find(
        (cue) => currentTime >= cue.start && currentTime <= cue.end
      );
      if (matched) return matched.text;
      if (currentTime < currentScene.subtitleCues[0].start) {
        return currentScene.subtitleCues[0].text;
      }
      return currentScene.subtitleCues[currentScene.subtitleCues.length - 1].text;
    }
    return currentScene.narration;
  })();

  const elapsedInScene = currentTime - currentScene.startTime;
  const showSceneTitle = elapsedInScene >= 0.2 && elapsedInScene <= 3.8;

  // Sync current time with active scene during playback without updating state inside an updater
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      const nextTime = currentTimeRef.current + 0.1 * speed;

      if (nextTime >= TOTAL_DURATION) {
        setIsPlaying(false);
        audioEngine.stopMusic();
        audioEngine.stopNarration();
        currentTimeRef.current = 0;
        setCurrentTime(0);
        return;
      }

      currentTimeRef.current = nextTime;
      setCurrentTime(nextTime);

      // Check if we need to switch scene
      const newSceneIndex = SCENES.findIndex(
        (s) => nextTime >= s.startTime && nextTime < s.endTime
      );

      if (newSceneIndex !== -1 && newSceneIndex !== currentSceneIndexRef.current) {
        currentSceneIndexRef.current = newSceneIndex;
        onSceneChangeRef.current(newSceneIndex);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, speed]);

  // Handle Narration audio when scene changes during playback
  useEffect(() => {
    if (isPlaying && voiceEnabled) {
      if (lastSpokenSceneRef.current !== currentScene.id) {
        lastSpokenSceneRef.current = currentScene.id;
        audioEngine.speakNarration(currentScene.narration, currentScene.id, 0.95 * speed);
      }
    }
  }, [isPlaying, voiceEnabled, currentScene, speed]);

  // Handle Play / Pause toggle
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (musicEnabled) {
        audioEngine.startMusic();
      }
      if (voiceEnabled) {
        lastSpokenSceneRef.current = currentScene.id;
        audioEngine.speakNarration(currentScene.narration, currentScene.id, 0.95 * speed);
      }
    } else {
      setIsPlaying(false);
      audioEngine.stopMusic();
      audioEngine.stopNarration();
    }
  };

  const handleSeek = (newTime: number) => {
    currentTimeRef.current = newTime;
    setCurrentTime(newTime);
    const newIndex = SCENES.findIndex(
      (s) => newTime >= s.startTime && newTime < s.endTime
    );
    if (newIndex !== -1 && newIndex !== currentSceneIndex) {
      currentSceneIndexRef.current = newIndex;
      onSceneChange(newIndex);
    }
    if (isPlaying && voiceEnabled) {
      lastSpokenSceneRef.current = -1; // trigger speak for new scene
    }
  };

  const handleRestart = () => {
    currentTimeRef.current = 0;
    setCurrentTime(0);
    currentSceneIndexRef.current = 0;
    onSceneChange(0);
    if (isPlaying) {
      lastSpokenSceneRef.current = -1;
    }
  };

  const jumpToScene = (index: number) => {
    const targetScene = SCENES[index];
    if (targetScene) {
      currentSceneIndexRef.current = index;
      onSceneChange(index);
      currentTimeRef.current = targetScene.startTime;
      setCurrentTime(targetScene.startTime);
      audioEngine.playTransitionChime();
      if (isPlaying && voiceEnabled) {
        lastSpokenSceneRef.current = targetScene.id;
        audioEngine.speakNarration(targetScene.narration, targetScene.id, 0.95 * speed);
      }
    }
  };

  const toggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    if (next && isPlaying) {
      audioEngine.startMusic();
    } else {
      audioEngine.stopMusic();
    }
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    audioEngine.setVoiceEnabled(next);
    if (next && isPlaying) {
      audioEngine.speakNarration(currentScene.narration, currentScene.id, 0.95 * speed);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setMusicVolume(val);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine animation style based on scene camera movement
  const getCameraAnimationClass = () => {
    switch (currentScene.cameraMovement) {
      case 'zoom-in':
        return 'animate-kenburns-zoom-in';
      case 'zoom-out':
        return 'animate-kenburns-zoom-out';
      case 'pan-right':
        return 'animate-kenburns-pan-right';
      case 'pan-left':
        return 'animate-kenburns-pan-left';
      default:
        return 'animate-kenburns-zoom-in';
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 16:9 Cinematic Video Display Container */}
      <div
        ref={playerContainerRef}
        className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 group select-none ${
          isFullscreen ? 'rounded-none' : ''
        }`}
      >
        {/* Background Visual Scene */}
        <div className="absolute inset-0 overflow-hidden">
          {currentScene.imageSrc ? (
            <img
              key={`img-${currentScene.id}`}
              src={currentScene.imageSrc}
              alt={currentScene.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                isPlaying ? getCameraAnimationClass() : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900" />
          )}

          {/* Cinematic Vignette & Film Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
        </div>

        {/* Top Header Badge & Live Scene Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider text-rose-200 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Scene {currentScene.number} of {SCENES.length}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-slate-300 drop-shadow">
              {currentScene.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onBrochureJump && (
              <button
                onClick={onBrochureJump}
                className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/50 text-xs font-medium backdrop-blur-md transition-all shadow-sm flex items-center gap-1.5"
                title="View original student brochure"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Brochure Source</span>
              </button>
            )}
            <button
              onClick={() => setShowTakeaways(!showTakeaways)}
              className={`p-2 rounded-lg backdrop-blur-md border text-xs font-medium transition-colors ${
                showTakeaways
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-black/60 text-slate-200 border-white/15 hover:bg-black/80'
              }`}
              title="Toggle scene educational takeaways"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side-by-side split screen badge indicator if Scene is a dual culture comparison */}
        {currentScene.countryFocus === 'both' && currentScene.id !== 1 && currentScene.id !== 9 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Algeria
              </span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Japan
              </span>
            </div>
          </div>
        )}

        {/* Subtle Lower-Third Scene Title (Unobtrusive, fades out after 3.8s, bottom-left) */}
        {showSceneTitle && (
          <div className="absolute bottom-20 sm:bottom-22 left-4 sm:left-6 z-15 pointer-events-none transition-opacity duration-700 max-w-xs sm:max-w-md">
            {currentScene.onScreenSubtitle && (
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-rose-300 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {currentScene.onScreenSubtitle}
              </p>
            )}
            <h2 className="text-xs sm:text-sm md:text-base font-extrabold tracking-wide text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {currentScene.onScreenTitle}
            </h2>
          </div>
        )}

        {/* Professional Cinematic Subtitles (Centered at the bottom 15-20%, subtle inline background) */}
        {subtitlesEnabled && activeSubtitle && (
          <div className="absolute bottom-14 sm:bottom-16 md:bottom-18 inset-x-0 flex justify-center z-20 pointer-events-none px-4 sm:px-6">
            <div className="inline-block bg-black/60 backdrop-blur-[2px] px-3 py-1 sm:py-1.5 rounded-md max-w-[90%] sm:max-w-lg md:max-w-xl text-center shadow-sm">
              <p className="text-white text-[11px] sm:text-xs md:text-sm font-medium tracking-normal leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {activeSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Educational Takeaways Overlay Drawer (Optional) */}
        {showTakeaways && (
          <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 p-5 z-30 overflow-y-auto transition-transform flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-400" />
                Student Takeaways
              </h4>
              <button
                onClick={() => setShowTakeaways(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-rose-300 font-medium">
                {currentScene.brochureReference}
              </div>

              <div className="space-y-2">
                {currentScene.keyPoints.map((pt, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    • {pt}
                  </div>
                ))}
              </div>

              {currentScene.culturalDetails.algeria && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-200">
                  <span className="font-bold block mb-1">🇩🇿 Algerian Perspective</span>
                  {currentScene.culturalDetails.algeria}
                </div>
              )}

              {currentScene.culturalDetails.japan && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200">
                  <span className="font-bold block mb-1">🇯🇵 Japanese Perspective</span>
                  {currentScene.culturalDetails.japan}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Control Bar (Bottom overlay) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 z-20 transition-opacity">
          {/* Progress Timeline with Chapter Markers */}
          <div className="relative w-full h-2 mb-3 bg-slate-800/80 rounded-full cursor-pointer group/bar flex items-center">
            {/* Base timeline click handler */}
            <input
              type="range"
              min={0}
              max={TOTAL_DURATION}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
            />

            {/* Filled progress bar */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-rose-500 to-amber-400 rounded-full transition-all relative"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
            </div>

            {/* Scene Chapter Tick Marks */}
            {SCENES.map((s, idx) => (
              <div
                key={s.id}
                title={`Scene ${s.number}: ${s.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToScene(idx);
                }}
                className={`absolute top-0 bottom-0 w-1 rounded-full pointer-events-auto hover:w-1.5 transition-all ${
                  currentSceneIndex === idx
                    ? 'bg-rose-400 shadow-sm'
                    : 'bg-white/40 hover:bg-white'
                }`}
                style={{ left: `${(s.startTime / TOTAL_DURATION) * 100}%` }}
              />
            ))}
          </div>

          {/* Controls Strip */}
          <div className="flex items-center justify-between text-slate-200 text-xs sm:text-sm">
            {/* Left Controls: Play/Pause, Rewind, Scene jumps, Time display */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-950 hover:bg-rose-100 transition-colors shadow-md"
                title={isPlaying ? 'Pause' : 'Play Cinematic Video'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Restart from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentSceneIndex === 0}
                  onClick={() => jumpToScene(currentSceneIndex - 1)}
                  className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Previous scene"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  disabled={currentSceneIndex === SCENES.length - 1}
                  onClick={() => jumpToScene(currentSceneIndex + 1)}
                  className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Next scene"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Time readout */}
              <div className="font-mono text-xs tabular-nums text-slate-300 ml-1">
                <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                <span className="text-slate-500 mx-1">/</span>
                <span>{formatTime(TOTAL_DURATION)}</span>
              </div>
            </div>

            {/* Right Controls: Subtitles, Audio options, Speed, Fullscreen */}
            <div className="flex items-center gap-3">
              {/* Narration Voiceover button */}
              <button
                onClick={toggleVoice}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  voiceEnabled
                    ? 'bg-rose-950/60 border-rose-600/70 text-rose-300'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
                title={voiceEnabled ? 'Mute Narrator Voice' : 'Enable Narrator Voice'}
              >
                {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">Voice</span>
              </button>

              {/* Ambient Orchestral Music button */}
              <button
                onClick={toggleMusic}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  musicEnabled
                    ? 'bg-emerald-950/60 border-emerald-600/70 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
                title={musicEnabled ? 'Mute Music' : 'Enable Gentle Music'}
              >
                {musicEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">Music</span>
              </button>

              {/* Volume Slider (desktop) */}
              <div className="hidden lg:flex items-center gap-1.5 w-20">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Subtitles CC Toggle */}
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  subtitlesEnabled
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                }`}
                title={subtitlesEnabled ? 'Turn subtitles off' : 'Turn subtitles on'}
              >
                <Subtitles className="w-4 h-4" />
              </button>

              {/* Speed cycle button */}
              <button
                onClick={() => {
                  const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 0.75 : 1;
                  setSpeed(nextSpeed);
                }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono font-medium text-slate-200 transition-colors"
                title="Playback speed"
              >
                {speed}x
              </button>

              {/* Fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Scene Selector Horizontal Rail */}
      <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SCENES.map((scene, idx) => {
          const isActive = currentSceneIndex === idx;
          return (
            <button
              key={scene.id}
              onClick={() => jumpToScene(idx)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-rose-500/10 border-rose-500 text-white shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold text-rose-400">
                <span>Scene {scene.number}</span>
                <span className="text-slate-500 font-mono text-[10px]">
                  {formatTime(scene.startTime)} - {formatTime(scene.endTime)}
                </span>
              </div>
              <div className="text-xs font-medium text-white truncate max-w-[150px] mt-0.5">
                {scene.title.replace(/^Scene \d+: /, '')}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
