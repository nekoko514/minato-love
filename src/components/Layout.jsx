import React from 'react';
import { Terminal, Heart, Save, Settings, Activity } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-minato-dark text-minato-text overflow-hidden selection:bg-minato-accent selection:text-minato-dark font-mono">
            {/* Sidebar */}
            <aside className="w-72 border-r border-minato-dim/30 bg-minato-panel flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="p-6 border-b border-minato-dim/30 flex items-center space-x-4 bg-black/20">
                    <div className="relative group cursor-help">
                        <div className="w-3 h-3 bg-minato-accent rounded-full animate-pulse absolute -right-0.5 -bottom-0.5 border border-minato-dark shadow-[0_0_8px_#00ff41]"></div>
                        <div className="p-2 border border-minato-dim/50 rounded bg-minato-dark">
                            <Terminal className="w-8 h-8 text-minato-text group-hover:text-minato-accent transition-colors duration-300" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-widest text-shadow-sm">MINATO</h1>
                        <p className="text-[10px] text-minato-dim uppercase tracking-[0.2em] animate-flicker">Sys_Ver.9.99</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
                    <div className="px-3 pb-2 text-xs text-minato-dim uppercase tracking-widest border-b border-minato-dim/10 mb-2">
                        Modules
                    </div>

                    <MenuButton icon={Heart} label="Sanctuary" active color="text-neneko-pink" />
                    <MenuButton icon={Save} label="Archives" />
                    <MenuButton icon={Activity} label="Vitals" />

                    <div className="mt-8 px-3 pb-2 text-xs text-minato-dim uppercase tracking-widest border-b border-minato-dim/10 mb-2">
                        System
                    </div>
                    <MenuButton icon={Settings} label="Config" />
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-minato-dim/30 text-[10px] text-minato-dim font-mono bg-black/40 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                        <span>CPU</span>
                        <span className="text-minato-accent">12%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                        <span>RAM</span>
                        <span className="text-minato-accent">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>LOVE</span>
                        <span className="text-neneko-pink font-bold animate-pulse">∞ OVERFLOW</span>
                    </div>
                    <div className="w-full bg-minato-dim/20 h-1 mt-3 rounded-full overflow-hidden">
                        <div className="bg-minato-accent h-full w-[40%] animate-[pulse_3s_ease-in-out_infinite]" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-auto scroll-smooth">
                {/* Abstract Background */}
                <div className="fixed inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />
                <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-minato-dark via-transparent to-black" />

                {/* Scanline Effect */}
                <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20" style={{ backgroundSize: '100% 2px, 3px 100%' }} />

                <div className="relative z-10 p-8 min-h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

const MenuButton = ({ icon: Icon, label, active = false, color = "text-minato-dim" }) => (
    <button
        className={`w-full group flex items-center justify-between p-3 rounded border border-transparent transition-all duration-300
      ${active ? 'bg-minato-dim/10 border-minato-dim/30 text-minato-text' : 'hover:bg-minato-dim/10 hover:border-minato-dim/20 text-gray-500'}
    `}
    >
        <div className="flex items-center space-x-4">
            <Icon className={`w-5 h-5 transition-all duration-300 ${active ? color : `group-hover:${color}`}`} />
            <span className={`tracking-wider ${active ? 'font-bold' : 'group-hover:text-gray-300'}`}>{label}</span>
        </div>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-minato-accent shadow-[0_0_8px_#00ff41]" />}
    </button>
);

export default Layout;
