import React, { useState } from 'react';
import { Copy, Check, QrCode, FileText, Download, Sparkles, Printer } from 'lucide-react';
import { SCENES } from '../data/documentaryData';

export const PromptExporter: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'flow' | 'qr' | 'lesson'>('flow');

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://algeria-japan-bridge.edu';

  const fullPromptText = `# FLOW VIDEO GENERATION PROMPT
## A Bridge Between Two Worlds — Algeria & Japan
ROLE: World-class educational documentary filmmaker, cultural storyteller, and cinematic video director.
AUDIENCE: First-year secondary school students.
DURATION: 90-120 seconds | 16:9 Landscape | English Narration & Subtitles.
REFERENCE: Student Scientific Project Brochure by Nadji, Boucharef, Aouicha, Kerrar & Gherfi.

${SCENES.map(
  (s) => `### SCENE ${s.number}: ${s.title.toUpperCase()} (${s.startTime}-${s.endTime}s)
On-screen Title: ${s.onScreenTitle}
${s.onScreenSubtitle ? `Subtitle: ${s.onScreenSubtitle}\n` : ''}Narration: "${s.narration}"
Key Visuals: ${s.keyPoints.join('; ')}
Brochure tie-in: ${s.brochureReference}
`
).join('\n')}`;

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <span>Production & Classroom Toolkit</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Video Generation Prompts & Brochure QR Code
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Export clip-by-clip prompts for AI video generators (Flow, Veo, Sora) or generate the authentic brochure QR code.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'flow'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scene Prompts
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'qr'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Brochure QR Code
          </button>
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'lesson'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Teacher Lesson Plan
          </button>
        </div>
      </div>

      {activeTab === 'flow' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Generate scene clips individually in Flow / Veo / Sora and splice with narration:
            </span>
            <button
              onClick={() => copyToClipboard(fullPromptText)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Copied Full Storyboard!' : 'Copy All 9 Scenes'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENES.map((scene, idx) => {
              const scenePrompt = `Prompt for Scene ${scene.number} (${scene.startTime}-${scene.endTime}s):
Title: ${scene.onScreenTitle}
Visual Style: 4K realistic cinematic documentary, slow ${scene.cameraMovement} movement, warm balanced grading.
Scene Description: ${scene.keyPoints.join('. ')}.
On-Screen Title: "${scene.onScreenTitle} - ${scene.onScreenSubtitle || ''}"
English Narration Voiceover: "${scene.narration}"`;

              const isCopied = copiedIndex === idx;

              return (
                <div
                  key={scene.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-rose-400 uppercase tracking-wide">
                        Scene {scene.number} ({scene.startTime}s - {scene.endTime}s)
                      </span>
                      <button
                        onClick={() => copyToClipboard(scenePrompt, idx)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="Copy this scene's prompt"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <h5 className="font-semibold text-white mb-1">{scene.title}</h5>
                    <p className="text-slate-400 leading-relaxed font-mono text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      "{scene.narration}"
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2 flex items-center justify-between">
                    <span>Camera: {scene.cameraMovement}</span>
                    <span className="truncate max-w-[150px]">{scene.countryFocus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'qr' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center gap-6 shadow-xl max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-white">Brochure QR Code Link</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              As specified in Rule 11 of the project brief: This real QR code can be printed and affixed to the physical brochure so viewers can scan it to watch this video documentary!
            </p>
          </div>

          {/* Real QR Code Image pointing to this app's URL */}
          <div className="p-4 bg-white rounded-2xl shadow-2xl border border-slate-200">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                appUrl
              )}`}
              alt="QR Code for Algeria and Japan Cultural Exchange Documentary"
              className="w-48 h-48 block"
            />
            <div className="mt-2 text-center text-[10px] font-bold text-slate-900 uppercase tracking-wider">
              Scan to Watch Video
            </div>
          </div>

          <div className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 truncate text-center">
            {appUrl}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(appUrl)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Web URL</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sticker Badge</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'lesson' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5 text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">
                Educational Curriculum Companion
              </span>
              <h4 className="text-lg font-bold text-white">First Year Secondary Lesson Guide</h4>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-sm">Classroom Objectives</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>Identify key geographic and demographic facts for Algeria and Japan.</li>
                <li>Compare secondary school daily life, schedules, and club routines.</li>
                <li>Analyze traditional cuisine and cultural etiquette around communal dining.</li>
                <li>Examine UNESCO cultural heritage sites (Casbah, Timgad, Itsukushima, Senso-ji).</li>
                <li>Synthesize shared human values versus cultural diversity.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-sm">Discussion Prompts</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>How does Algerian hospitality (Ikram al-Dayf) compare to Japanese Omotenashi?</li>
                <li>Why do both countries emphasize secondary school uniforms and morning discipline?</li>
                <li>What role does traditional handicraft play in preserving generational identity?</li>
                <li>How can first-year students build meaningful cultural bridges with peers abroad?</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Project Authors & Acknowledgements</div>
              <div className="text-slate-400 mt-0.5">
                Scientific Project by: Nadji, Boucharef, Aouicha, Kerrar & Gherfi (1ère Année Secondaire)
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 text-emerald-300 font-semibold text-[11px]">
              Classroom Ready
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
