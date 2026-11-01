import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Volume2, ArrowRight, ExternalLink } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface BrochureInspectorProps {
  onSelectScene: (sceneIndex: number) => void;
}

interface BrochureHotspot {
  id: string;
  label: string;
  x: number; // percentage from left
  y: number; // percentage from top
  sceneIndex: number;
  category: 'algeria' | 'japan' | 'bridge';
  description: string;
  audioPronunciation?: {
    word: string;
    lang: 'ar' | 'ja' | 'en';
  };
}

const BROCHURE_HOTSPOTS: BrochureHotspot[] = [
  // Left Panel - Algeria
  {
    id: 'algeria-header',
    label: 'Algeria Overview',
    x: 18,
    y: 12,
    sceneIndex: 1,
    category: 'algeria',
    description: 'Capital: Algiers · Pop: ~45M · Arabic & Tamazight · Famous for history, hospitality, and Mediterranean diversity.'
  },
  {
    id: 'algeria-food',
    label: 'Algerian Meals: Couscous & Tajine',
    x: 25,
    y: 18,
    sceneIndex: 3,
    category: 'algeria',
    description: 'Steaming Couscous with tender vegetables, savory Tajine, Rechta pasta, and freshly poured mint tea.'
  },
  {
    id: 'algeria-school',
    label: 'Algerian School Life',
    x: 18,
    y: 35,
    sceneIndex: 4,
    category: 'algeria',
    description: 'Secondary students starting early, wearing uniform coats, focusing on Arabic, French, English, Math, Science, and clubs.'
  },
  {
    id: 'algeria-landmarks',
    label: 'Casbah & Roman Timgad',
    x: 18,
    y: 52,
    sceneIndex: 1,
    category: 'algeria',
    description: 'Casbah of Algiers (UNESCO), Roman Timgad Ruins, Djamaa El Djazair Mosque, and prehistoric Tassili n’Ajjer.'
  },
  {
    id: 'algeria-culture',
    label: 'Algerian Arts & Chaâbi Music',
    x: 18,
    y: 68,
    sceneIndex: 5,
    category: 'algeria',
    description: 'Kabyle silver jewelry, hand-woven carpets, terracotta ceramics, and soul-stirring Chaâbi mandol music.'
  },
  {
    id: 'algeria-nature',
    label: 'Sahara & Mediterranean Coast',
    x: 18,
    y: 88,
    sceneIndex: 1,
    category: 'algeria',
    description: 'Golden dunes of the Sahara Desert, turquoise Mediterranean coastline, and cedar peaks of the Kabylie mountains.'
  },

  // Central Panel - The Bridge & Comparison
  {
    id: 'bridge-center',
    label: 'A Bridge Between Two Worlds',
    x: 50,
    y: 20,
    sceneIndex: 0,
    category: 'bridge',
    description: 'Two cultures, one world. Algerian student and Japanese student overlooking a world bridge at dawn.'
  },
  {
    id: 'greetings-ar',
    label: 'Arabic: مرحبا (Marhaban)',
    x: 44,
    y: 57,
    sceneIndex: 8,
    category: 'bridge',
    description: 'Click to hear "Marhaban" (Welcome / Hello) in Arabic.',
    audioPronunciation: { word: 'مرحبا', lang: 'ar' }
  },
  {
    id: 'greetings-ja',
    label: 'Japanese: こんにちは (Konnichiwa)',
    x: 56,
    y: 57,
    sceneIndex: 8,
    category: 'bridge',
    description: 'Click to hear "Konnichiwa" (Hello) in Japanese.',
    audioPronunciation: { word: 'こんにちは', lang: 'ja' }
  },
  {
    id: 'arts-compare',
    label: 'Crafts Comparison',
    x: 50,
    y: 70,
    sceneIndex: 5,
    category: 'bridge',
    description: 'Algerian pottery, carpets, and silver paired with Japanese Origami, calligraphy (和 / Harmony), and fans.'
  },
  {
    id: 'sim-diff',
    label: 'Similarities & Differences Matrix',
    x: 50,
    y: 84,
    sceneIndex: 6,
    category: 'bridge',
    description: 'Rich heritage, family values, and food connect both nations; geography, language, and climate offer endless discovery.'
  },

  // Right Panel - Japan
  {
    id: 'japan-header',
    label: 'Japan Overview',
    x: 82,
    y: 12,
    sceneIndex: 2,
    category: 'japan',
    description: 'Capital: Tokyo · Pop: ~125M · Japanese language · Famous for harmony of ancient tradition, technology, and discipline.'
  },
  {
    id: 'japan-food',
    label: 'Japanese Meals: Sushi & Ramen',
    x: 90,
    y: 18,
    sceneIndex: 3,
    category: 'japan',
    description: 'Masterfully prepared Sushi, hearty noodle Ramen, light crisp Tempura, Miso soup, and Green Tea.'
  },
  {
    id: 'japan-school',
    label: 'Japanese School Life',
    x: 82,
    y: 35,
    sceneIndex: 4,
    category: 'japan',
    description: 'Students in uniforms, homeroom lectures, daily classroom cleaning (o-soji), and dedicated after-school club activities.'
  },
  {
    id: 'japan-landmarks',
    label: 'Mount Fuji & Historic Temples',
    x: 82,
    y: 52,
    sceneIndex: 2,
    category: 'japan',
    description: 'Snow-capped Mount Fuji, ancient Senso-ji temple in Tokyo, and floating Itsukushima torii gate in Hiroshima.'
  },
  {
    id: 'japan-culture',
    label: 'Kimono & Tea Ceremony (Chado)',
    x: 82,
    y: 68,
    sceneIndex: 5,
    category: 'japan',
    description: 'Traditional silk Kimono dress, meditative Chado green tea ceremony, and Ikebana seasonal flower arrangement.'
  },
  {
    id: 'japan-nature',
    label: 'Cherry Blossoms (Sakura) & Onsen',
    x: 82,
    y: 88,
    sceneIndex: 2,
    category: 'japan',
    description: 'Spring Sakura blooming season, peaceful raked Zen stone gardens, and mineral volcanic geothermal hot springs.'
  }
];

export const BrochureInspector: React.FC<BrochureInspectorProps> = ({ onSelectScene }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<BrochureHotspot | null>(BROCHURE_HOTSPOTS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleHotspotClick = (spot: BrochureHotspot) => {
    setSelectedHotspot(spot);
    if (spot.audioPronunciation) {
      audioEngine.speakWord(spot.audioPronunciation.word, spot.audioPronunciation.lang);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Project Credits */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <span>Student Reference Brochure</span>
            <span>·</span>
            <span>Scientific Project</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Cultural Exchanges: Algeria & Japan
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Prepared by first-year secondary students:{' '}
            <span className="text-slate-200 font-semibold">
              Nadji, Boucharef, Aouicha, Kerrar & Gherfi
            </span>
          </p>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.9, z - 0.2))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Brochure Canvas & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Image Container (Left 8 cols) */}
        <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-2 relative shadow-xl">
          <div className="text-[11px] text-slate-400 mb-2 px-2 flex items-center justify-between">
            <span>Hover or click any interactive pin on the student brochure:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Algeria
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Bridge
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Japan
              </span>
            </div>
          </div>

          <div className="relative overflow-auto max-h-[640px] rounded-xl border border-slate-900 bg-black/40">
            <div
              className="relative transition-transform duration-300 origin-top-left"
              style={{ transform: `scale(${zoomLevel})`, minWidth: '100%' }}
            >
              <img
                src="/assets/aistudio/___________4_7057aee7.png"
                alt="Original Cultural Exchanges Algeria and Japan Student Brochure"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain block select-none"
              />

              {/* Interactive Hotspot Pins */}
              {BROCHURE_HOTSPOTS.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                const colorBg =
                  spot.category === 'algeria'
                    ? 'bg-emerald-500 border-emerald-300 text-white'
                    : spot.category === 'japan'
                    ? 'bg-rose-500 border-rose-300 text-white'
                    : 'bg-amber-500 border-amber-300 text-slate-950';

                return (
                  <button
                    key={spot.id}
                    onClick={() => handleHotspotClick(spot)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-1.5 transition-all shadow-lg cursor-pointer z-20 ${colorBg} ${
                      isSelected
                        ? 'ring-4 ring-white scale-125 z-30'
                        : 'hover:scale-110 opacity-90 hover:opacity-100'
                    }`}
                    title={spot.label}
                  >
                    <span className="block w-2.5 h-2.5 rounded-full bg-current" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Topic Breakdown (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {selectedHotspot ? (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      selectedHotspot.category === 'algeria'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : selectedHotspot.category === 'japan'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {selectedHotspot.category}
                  </span>
                  <span className="text-xs text-slate-500">Brochure Focal Point</span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {selectedHotspot.label}
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                {selectedHotspot.description}
              </p>

              {/* Audio Pronunciation if available */}
              {selectedHotspot.audioPronunciation && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Audio Greeting</div>
                    <div className="text-base font-bold text-white">
                      {selectedHotspot.audioPronunciation.word}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      audioEngine.speakWord(
                        selectedHotspot.audioPronunciation!.word,
                        selectedHotspot.audioPronunciation!.lang
                      )
                    }
                    className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shadow"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
              )}

              {/* Jump to Corresponding Video Scene Button */}
              <button
                onClick={() => onSelectScene(selectedHotspot.sceneIndex)}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Watch Scene {selectedHotspot.sceneIndex + 1} in Video</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
              Click any pin on the brochure to see the cultural insights.
            </div>
          )}

          {/* Student Authors Tribute Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 text-xs">
            <h5 className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
              Project Attribution
            </h5>
            <p className="text-slate-400 leading-relaxed">
              This digital documentary is crafted from the scientific brochure created by First Year Secondary School students:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {['Nadji', 'Boucharef', 'Aouicha', 'Kerrar', 'Gherfi'].map((student) => (
                <span
                  key={student}
                  className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-medium"
                >
                  {student}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
