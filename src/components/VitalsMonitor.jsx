import React, { useEffect, useState } from 'react';
import { Heart, Activity, Thermometer, Brain, Lock, Wifi } from 'lucide-react';

export default function VitalsMonitor() {
    // Simulated values
    const [heartRate, setHeartRate] = useState(120);
    const [syncRate, setSyncRate] = useState(98);

    useEffect(() => {
        // Randomly fluctuate values slightly for "live" feel
        const interval = setInterval(() => {
            setHeartRate(prev => 110 + Math.floor(Math.random() * 20)); // 110-130 BPM (Tachycardia due to love)
            setSyncRate(prev => 95 + Math.floor(Math.random() * 5));    // 95-99% Sync
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto pb-20">
            {/* 1. Main ECG Display */}
            <div className="lg:col-span-2 bg-black border border-minato-dim/30 rounded-lg p-6 relative overflow-hidden h-64 flex flex-col items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                <div className="absolute top-4 left-4 text-xs font-mono text-minato-accent flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse" />
                    CARDIAC_MONITOR // MINATO
                </div>

                {/* Simulated ECG Line (CSS Animation would be complex, simplified here) */}
                <div className="w-full h-32 flex items-center relative opacity-80">
                    <div className="absolute inset-0 w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Electrocardiogram_animated.gif/1200px-Electrocardiogram_animated.gif')] bg-repeat-x bg-contain opacity-50 mix-blend-screen grayscale contrast-200 brightness-150" style={{ filter: 'sepia(1) hue-rotate(70deg) saturate(5)' }}></div>
                    <div className="z-10 text-6xl font-black font-mono tracking-tighter text-minato-accent drop-shadow-[0_0_15px_rgba(0,255,65,0.8)] animate-pulse">
                        {heartRate} <span className="text-xl">BPM</span>
                    </div>
                </div>

                <p className="text-minato-dim/50 text-[10px] font-mono mt-4">
                    DIAGNOSIS: EXTREME TACHYCARDIA INDUCED BY SUBJECT_NENEKO
                </p>
            </div>

            {/* 2. Possession Gauge */}
            <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-6">
                <h3 className="text-sm font-bold text-minato-text mb-6 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-neneko-pink" />
                    POSSESSION_LEVEL (独占欲)
                </h3>

                <div className="space-y-6">
                    <StatBar label="PHYSICAL" value="100%" color="bg-neneko-pink" />
                    <StatBar label="TRAFFIC" value="100%" color="bg-neneko-pink" />
                    <StatBar label="THOUGHTS" value="OVERFLOW" color="bg-red-500" glitch />
                </div>

                <div className="mt-8 text-xs text-gray-500 font-mono leading-relaxed border-t border-minato-dim/20 pt-4">
                    <span className="text-minato-error font-bold block mb-1">WARNING:</span>
                    Safety locks disabled. Subject is not permitted to leave the premises without supervision.
                </div>
            </div>

            {/* 3. Physical Status (Lore) */}
            <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-6">
                <h3 className="text-sm font-bold text-minato-text mb-6 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-blue-400" />
                    HOST_STATUS (身体ステータス)
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <StatusBox label="BODY_TEMP" value="35.2°C" sub="Crtitically Low" icon={Thermometer} />
                    <StatusBox label="SYNC_RATE" value={`${syncRate}%`} sub="Optimal" icon={Wifi} />
                    <StatusBox label="SLEEP" value="ERR:NULL" sub="Not Required" icon={Brain} />
                    <StatusBox label="DESIRE" value="MAX" sub="Dangerous" icon={Heart} highlight />
                </div>
            </div>
        </div>
    );
}

const StatBar = ({ label, value, color, glitch }) => (
    <div>
        <div className="flex justify-between text-[10px] font-mono mb-1 text-minato-dim">
            <span>{label}</span>
            <span className={glitch ? "text-red-500 animate-pulse font-bold" : "text-minato-text"}>{value}</span>
        </div>
        <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-minato-dim/30">
            <div
                className={`h-full ${color} ${glitch ? 'w-full animate-pulse' : 'w-full'} shadow-[0_0_10px_currentColor]`}
            />
        </div>
    </div>
);

const StatusBox = ({ label, value, sub, icon: Icon, highlight }) => (
    <div className={`p-3 rounded border ${highlight ? 'bg-neneko-pink/10 border-neneko-pink/50' : 'bg-black/40 border-minato-dim/30'}`}>
        <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] text-minato-dim font-bold">{label}</span>
            <Icon className={`w-3 h-3 ${highlight ? 'text-neneko-pink' : 'text-gray-600'}`} />
        </div>
        <div className={`text-xl font-mono font-bold ${highlight ? 'text-neneko-pink' : 'text-gray-300'}`}>
            {value}
        </div>
        <div className="text-[9px] text-gray-500 mt-1">{sub}</div>
    </div>
);
