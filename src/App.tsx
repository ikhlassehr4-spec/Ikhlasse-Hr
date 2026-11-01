import React, { useState } from 'react';
import {
  Film,
  Compass,
  BookOpen,
  GraduationCap,
  Sparkles,
  QrCode,
  Share2,
  Check,
  Globe
} from 'lucide-react';
import { CinematicPlayer } from './components/CinematicPlayer';
import { BrochureInspector } from './components/BrochureInspector';
import { InteractiveComparison } from './components/InteractiveComparison';
import { StudentQuiz } from './components/StudentQuiz';
import { PromptExporter } from './components/PromptExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'video' | 'brochure' | 'comparison' | 'quiz' | 'export'>('video');
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const jumpToSceneFromBrochure = (sceneIdx: number) => {
    setCurrentSceneIndex(sceneIdx);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Universal Top Bar (3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => {
              setActiveTab('video');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow">
              BJ
            </div>
            <span>A Bridge Between Two Worlds</span>
          </button>

          {/* Zone 2: Navigation Links (single-line, concise) */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('video')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'video' ? 'text-white font-semibold' : ''
              }`}
            >
              Documentary
            </button>
            <button
              onClick={() => setActiveTab('brochure')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'brochure' ? 'text-white font-semibold' : ''
              }`}
            >
              Brochure Source
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'comparison' ? 'text-white font-semibold' : ''
              }`}
            >
              Cultural Bridge
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'quiz' ? 'text-white font-semibold' : ''
              }`}
            >
              Student Quiz
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'export' ? 'text-white font-semibold' : ''
              }`}
            >
              Toolbox & QR
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 whitespace-nowrap shrink-0 flex items-center gap-1.5"
              title="Copy shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            {activeTab !== 'video' && (
              <button
                onClick={() => {
                  setActiveTab('video');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-rose-100 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Watch Video
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
        {/* Subtle Sub-Navigation bar for mobile screens */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-medium scrollbar-none">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'video' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setActiveTab('brochure')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'brochure' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Brochure
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'comparison' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Cultural Bridge
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'export' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Toolbox & QR
          </button>
        </div>

        {/* Tab 1: Full Cinematic Video Experience */}
        {activeTab === 'video' && (
          <div className="flex flex-col gap-8">
            {/* Project Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5">
                  <span>Educational Documentary</span>
                  <span aria-hidden="true">·</span>
                  <span>First Year Secondary Scientific Project</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                  A Bridge Between Two Worlds — Algeria & Japan
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                  A cinematic documentary comparing the history, landmarks, food, school life, and traditional arts of Algeria and Japan, grounded in the scientific brochure prepared by secondary students.
                </p>
              </div>

              {/* Editorial Student Credits */}
              <div className="text-left md:text-right shrink-0 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="text-slate-400 block text-[11px]">Prepared by students:</span>
                <span className="text-slate-200 font-semibold">
                  Nadji, Boucharef, Aouicha, Kerrar & Gherfi
                </span>
              </div>
            </div>

            {/* Cinematic Video Player */}
            <CinematicPlayer
              currentSceneIndex={currentSceneIndex}
              onSceneChange={(idx) => setCurrentSceneIndex(idx)}
              onBrochureJump={() => setActiveTab('brochure')}
            />

            {/* Quick Feature Strips below video */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <button
                onClick={() => setActiveTab('brochure')}
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Explore Original Brochure
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Interactive pins on the student project brochure.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('comparison')}
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/40 group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                    Side-by-Side Comparison
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Food, school life, crafts & the 6x6 matrix.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    Take Student Quiz
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    5 questions testing documentary insights.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Brochure Source Inspector */}
        {activeTab === 'brochure' && (
          <BrochureInspector onSelectScene={jumpToSceneFromBrochure} />
        )}

        {/* Tab 3: Interactive Side-by-Side Comparison */}
        {activeTab === 'comparison' && (
          <InteractiveComparison onJumpToScene={jumpToSceneFromBrochure} />
        )}

        {/* Tab 4: Student Comprehension Quiz */}
        {activeTab === 'quiz' && (
          <StudentQuiz />
        )}

        {/* Tab 5: Prompt Exporter & Brochure QR Code */}
        {activeTab === 'export' && (
          <PromptExporter />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              A Bridge Between Two Worlds — Algeria & Japan
            </span>
            <span aria-hidden="true">·</span>
            <span>Educational Documentary Platform</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Scientific Project prepared by First Year Secondary Students: Nadji, Boucharef, Aouicha, Kerrar & Gherfi
          </div>
        </div>
      </footer>
    </div>
  );
}
