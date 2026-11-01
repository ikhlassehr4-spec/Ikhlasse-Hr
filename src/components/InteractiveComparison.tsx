import React, { useState } from 'react';
import {
  Utensils,
  GraduationCap,
  Landmark,
  Palette,
  Scale,
  Globe2,
  Volume2,
  Check,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';
import { CULTURAL_TOPICS } from '../data/documentaryData';
import { audioEngine } from '../services/audioEngine';

interface InteractiveComparisonProps {
  onJumpToScene?: (sceneIndex: number) => void;
}

export const InteractiveComparison: React.FC<InteractiveComparisonProps> = ({ onJumpToScene }) => {
  const [activeTab, setActiveTab] = useState<string>('food');

  const selectedTopic = CULTURAL_TOPICS.find((t) => t.id === activeTab) || CULTURAL_TOPICS[0];

  const tabs = [
    { id: 'food', label: 'Food & Meals', icon: Utensils, sceneIndex: 3 },
    { id: 'school', label: 'School Life', icon: GraduationCap, sceneIndex: 4 },
    { id: 'landmarks', label: 'Landmarks & Nature', icon: Landmark, sceneIndex: 1 },
    { id: 'arts', label: 'Arts & Crafts', icon: Palette, sceneIndex: 5 },
    { id: 'overview', label: 'Geography & Stats', icon: Globe2, sceneIndex: 0 },
    { id: 'matrix', label: 'Similarities & Differences', icon: Scale, sceneIndex: 6 }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white border-t-2 border-rose-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Greetings Audio Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-rose-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-rose-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Language Greetings</h4>
            <p className="text-xs text-slate-400">
              Listen to authentic greetings featured on the students’ central brochure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Arabic */}
          <button
            onClick={() => audioEngine.speakWord('مرحبا', 'ar')}
            className="px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="text-sm font-arabic font-bold">مرحبا</span>
            <span className="text-[11px] opacity-80">(Marhaban - Arabic)</span>
            <Volume2 className="w-3.5 h-3.5 ml-1 text-emerald-400" />
          </button>

          {/* Japanese */}
          <button
            onClick={() => audioEngine.speakWord('こんにちは', 'ja')}
            className="px-3.5 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800/80 border border-rose-700/50 text-rose-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="text-sm font-japanese font-bold">こんにちは</span>
            <span className="text-[11px] opacity-80">(Konnichiwa - Japanese)</span>
            <Volume2 className="w-3.5 h-3.5 ml-1 text-rose-400" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'matrix' ? (
        /* Similarities and Differences Matrix View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Similarities Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Similarities (Brochure Column 1)</span>
            </div>
            <h3 className="text-lg font-bold text-white">What Unites Algeria & Japan</h3>
            <p className="text-xs text-slate-300">
              Despite being located thousands of kilometers apart across two continents, both societies share deep timeless human values:
            </p>

            <div className="space-y-2.5 mt-2">
              {[
                { title: 'Rich cultural heritage', desc: 'Centuries of historical monuments, poetry, and enduring cultural pride.' },
                { title: 'Strong family values', desc: 'Centrality of the household, respect for grandparents and parents.' },
                { title: 'Delicious traditional food', desc: 'Rich gastronomic identities built around fresh wholesome ingredients and sharing.' },
                { title: 'Beautiful natural landscapes', desc: 'Dramatic coastal scenery, majestic mountains, and sacred natural wonders.' },
                { title: 'Important festivals', desc: 'National and cultural holidays that unite towns and families in celebration.' },
                { title: 'Respect for traditions', desc: 'Dedication to passing craftsmanship, folklore, and customs to youth.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-emerald-950 text-xs flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-semibold text-white block">{item.title}</span>
                    <span className="text-slate-400 text-[11px]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Differences Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/30 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <ArrowRightLeft className="w-4 h-4 text-rose-400" />
              <span>Differences (Brochure Column 2)</span>
            </div>
            <h3 className="text-lg font-bold text-white">What Enriches Our Diversity</h3>
            <p className="text-xs text-slate-300">
              Cultural differences are what make international exchange vibrant, inspiring, and worth exploring:
            </p>

            <div className="space-y-2.5 mt-2">
              {[
                { title: 'Geographical location', algeria: 'North Africa / Mediterranean', japan: 'East Asia / Pacific Archipelago' },
                { title: 'Language', algeria: 'Arabic & Tamazight (Afroasiatic)', japan: 'Japanese (Japonic)' },
                { title: 'Climate and landscapes', algeria: 'Mediterranean coast & Sahara desert', japan: 'Temperate volcanic islands & snowy peaks' },
                { title: 'Traditional clothing', algeria: 'Karakou, Burnous, Chedda, Gandoura', japan: 'Kimono, Yukata, Hakama, Obi' },
                { title: 'Architecture style', algeria: 'Islamic, Ottoman, and Moorish arches', japan: 'Wooden Buddhist temples, Shinto torii gates' },
                { title: 'Daily customs', algeria: 'Warm Mediterranean handshakes & communal tea', japan: 'Respectful bows (ojigi) & shoe removal at door' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-rose-950 text-xs flex flex-col gap-1.5">
                  <span className="font-semibold text-rose-200">{item.title}</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-1.5 rounded bg-slate-950 text-emerald-300">
                      🇩🇿 {item.algeria}
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 text-rose-300">
                      🇯🇵 {item.japan}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Side-by-Side Dual Culture Comparison Cards */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Algeria Pillar */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-800/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇩🇿</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Algeria
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Africa</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedTopic.algeria.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedTopic.algeria.description}
                </p>

                <div className="space-y-2 mb-4">
                  {selectedTopic.algeria.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-300">
                <span className="font-bold block mb-1">Cultural Highlight</span>
                {selectedTopic.algeria.highlight}
              </div>
            </div>

            {/* Japan Pillar */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-rose-800/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇯🇵</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Japan
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Asia</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedTopic.japan.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedTopic.japan.description}
                </p>

                <div className="space-y-2 mb-4">
                  {selectedTopic.japan.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300">
                <span className="font-bold block mb-1">Cultural Highlight</span>
                {selectedTopic.japan.highlight}
              </div>
            </div>
          </div>

          {/* Bridge Synthesis Takeaway */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 flex-shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  The Cultural Bridge
                </span>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {selectedTopic.bridgeTakeaway}
                </p>
              </div>
            </div>

            {onJumpToScene && (
              <button
                onClick={() => {
                  const targetTab = tabs.find((t) => t.id === activeTab);
                  if (targetTab) onJumpToScene(targetTab.sceneIndex);
                }}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
              >
                Watch Video Scene
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
