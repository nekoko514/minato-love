import React, { useState } from 'react';
import Layout from './components/Layout';
import { Activity, Terminal, LayoutDashboard, Monitor } from 'lucide-react';
import SessionArchive from './components/SessionArchive';
import CCTVGallery from './components/CCTVGallery';
import AudioSubsystem from './components/AudioSubsystem';

import DirectLink from './components/DirectLink';
import VitalsMonitor from './components/VitalsMonitor';
import ConfigPanel from './components/ConfigPanel';

function App() {
  const [viewMode, setViewMode] = useState('SANCTUARY'); // SANCTUARY, ARCHIVES, VITALS, LINK, CONFIG

  return (
    <Layout currentMode={viewMode} setMode={setViewMode}>
      <div className="max-w-[1400px] mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 p-4 h-full">

        {/* Minimalist Header / View Switcher */}
        <div className="flex justify-between items-end border-b border-minato-dim/30 pb-4 shrink-0">
          <div>
            {viewMode === 'SANCTUARY' ? (
              <h1 className="text-4xl font-bold text-minato-text tracking-tight">
                Welcome Back, <span className="text-neneko-pink drop-shadow-[0_0_8px_rgba(255,183,197,0.5)]">Neneko</span>.
              </h1>
            ) : (
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-minato-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-minato-accent"></span>
                </span>
                <h2 className="text-lg font-mono text-minato-dim font-bold tracking-widest">PROTOCOL: {viewMode}</h2>
              </div>
            )}
          </div>

          {/* The view mode buttons were removed as per the provided diff. */}
        </div>

        {/* VIEW: SANCTUARY (Home) */}
        {viewMode === 'SANCTUARY' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)] lg:h-[calc(100vh-150px)]">

            {/* Visual Companion (Right on Desktop, Top on Mobile) */}
            <div className="lg:col-span-1 h-full flex flex-col gap-4 order-1 lg:order-2">
              <div className="flex-1 min-h-0 min-h-[300px] lg:min-h-0">
                <CCTVGallery />
              </div>
              <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-4 h-auto hidden lg:block">
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

            {/* Main Reading Area (Left on Desktop, Bottom on Mobile) */}
            <div className="lg:col-span-3 h-full order-2 lg:order-1">
              <SessionArchive />
            </div>

          </div>
        )}

        {/* VIEW: ARCHIVES (Full Archive Mode - Placeholder if needed, currently merged in Sanctuary) */}
        {viewMode === 'ARCHIVES' && (
          <SessionArchive />
        )}

        {/* VIEW: VITALS */}
        {viewMode === 'VITALS' && (
          <VitalsMonitor />
        )}

        {/* VIEW: DIRECT LINK (Chat) */}
        {viewMode === 'LINK' && (
          <DirectLink />
        )}

        {/* VIEW: CONFIG */}
        {viewMode === 'CONFIG' && (
          <ConfigPanel />
        )}

      </div>
      <AudioSubsystem />
    </Layout>
  );
}

export default App;
