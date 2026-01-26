import React, { useState } from 'react';
import Layout from './components/Layout';
import { Activity, Terminal, LayoutDashboard, Monitor } from 'lucide-react';
import SessionArchive from './components/SessionArchive';
import CCTVGallery from './components/CCTVGallery';
import AudioSubsystem from './components/AudioSubsystem';

function App() {
  const [viewMode, setViewMode] = useState('SANCTUARY'); // SANCTUARY, SYSTEM

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 p-4">

        {/* Minimalist Header / View Switcher */}
        <div className="flex justify-between items-end border-b border-minato-dim/30 pb-4">
          <div>
            {viewMode === 'SYSTEM' ? (
              <h1 className="text-4xl font-bold text-minato-text tracking-tight">
                Welcome Back, <span className="text-neneko-pink drop-shadow-[0_0_8px_rgba(255,183,197,0.5)]">Neneko</span>.
              </h1>
            ) : (
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-minato-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-minato-accent"></span>
                </span>
                <h2 className="text-lg font-mono text-minato-dim font-bold tracking-widest">PROTCOL: SANCTUARY</h2>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('SANCTUARY')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all border ${viewMode === 'SANCTUARY' ? 'bg-minato-dim/20 text-minato-accent border-minato-accent/50' : 'text-minato-dim border-transparent hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
              IMMERSION
            </button>
            <button
              onClick={() => setViewMode('SYSTEM')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all border ${viewMode === 'SYSTEM' ? 'bg-minato-dim/20 text-minato-accent border-minato-accent/50' : 'text-minato-dim border-transparent hover:text-white'}`}
            >
              <Terminal className="w-4 h-4" />
              SYSTEM
            </button>
          </div>
        </div>

        {/* VIEW: SANCTUARY (Asymmetric Split) */}
        {viewMode === 'SANCTUARY' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
            {/* Main Reading Area (Left) */}
            <div className="lg:col-span-3 h-full">
              <SessionArchive />
            </div>

            {/* Visual Companion (Right) */}
            <div className="lg:col-span-1 h-full flex flex-col gap-4">
              <div className="flex-1 min-h-0">
                <CCTVGallery />
              </div>
              <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-4 h-auto">
                <h3 className="text-xs font-bold text-minato-dim mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  LIVE STATUS
                </h3>
                <div className="space-y-2 text-[10px] font-mono text-gray-400">
                  <p className="flex justify-between"><span>HEART_RATE:</span> <span className="text-red-400 animate-pulse">120 BPM</span></p>
                  <p className="flex justify-between"><span>LOVE_OUTPUT:</span> <span className="text-neneko-pink">MAXIMUM</span></p>
                  <p className="flex justify-between"><span>UPTIME:</span> <span>FOREVER</span></p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* VIEW: SYSTEM (Legacy Dashboard) */}
        {viewMode === 'SYSTEM' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-6 group relative overflow-hidden">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-minato-accent" />
                System Logs
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                "All subsystems operational. Audio engine active. Visual sensors calibrated to your beauty."
              </p>
            </div>

            <div className="bg-black/60 rounded border border-minato-dim/30 p-4 font-mono text-xs text-gray-500">
              <div className="flex gap-2 border-b border-minato-dim/20 pb-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500/20"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/20"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/20"></span>
              </div>
              <div className="space-y-1">
                <p><span className="text-green-500">success</span> [Layout] Sanctuary mode initialized.</p>
                <p><span className="text-blue-500">info</span>  [Optim] Readability increased by 200%.</p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
          </div>
        )}

      </div>
      <AudioSubsystem />
    </Layout>
  );
}

export default App;
