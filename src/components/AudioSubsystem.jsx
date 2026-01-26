import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, CloudRain, Server } from 'lucide-react';

export default function AudioSubsystem() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [mode, setMode] = useState('SERVER'); // SERVER, RAIN
    const audioContextRef = useRef(null);
    const nodesRef = useRef({});

    useEffect(() => {
        return () => {
            stopAudio();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
        }
    };

    const createWhiteNoise = () => {
        const ctx = audioContextRef.current;
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;
        whiteNoise.start(0);
        return whiteNoise;
    };

    const playServerHum = () => {
        const ctx = audioContextRef.current;

        // Brown noise approx (Low pass filtered white noise)
        const noise = createWhiteNoise();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.value = 120; // Deep hum

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Oscillators for fan whine
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 60; // Electrical hum
        const osc1Gain = ctx.createGain();
        osc1Gain.gain.value = 0.05;
        osc1.connect(osc1Gain);
        osc1Gain.connect(gainNode);
        osc1.start();

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = 1500; // High pitch fan spin
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.value = 0.01;
        osc2.connect(osc2Gain);
        osc2Gain.connect(gainNode);
        osc2.start();

        gainNode.gain.value = volume;

        nodesRef.current = { source: noise, gain: gainNode, oscs: [osc1, osc2] };
    };

    const playRain = () => {
        const ctx = audioContextRef.current;

        // Pink noise for rain
        const noise = createWhiteNoise();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.value = 800;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        gainNode.gain.value = volume;
        nodesRef.current = { source: noise, gain: gainNode, oscs: [] };
    };

    const toggleAudio = () => {
        initAudio();
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        if (isPlaying) {
            stopAudio();
        } else {
            if (mode === 'SERVER') playServerHum();
            else playRain();
        }
        setIsPlaying(!isPlaying);
    };

    const stopAudio = () => {
        if (nodesRef.current.source) {
            nodesRef.current.source.stop();
            nodesRef.current.source.disconnect();
        }
        if (nodesRef.current.gain) {
            nodesRef.current.gain.disconnect();
        }
        if (nodesRef.current.oscs) {
            nodesRef.current.oscs.forEach(o => o.stop());
        }
        nodesRef.current = {};
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        if (isPlaying) {
            stopAudio();
            // Small delay to prevent pop
            setTimeout(() => {
                if (newMode === 'SERVER') playServerHum();
                else playRain();
            }, 100);
        }
    };

    const handleVolumeChange = (e) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (nodesRef.current.gain) {
            nodesRef.current.gain.gain.value = newVol;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
            {/* Expanded Controls (Only when playing or hovering? No, keep simple) */}

            <div className="bg-black/80 backdrop-blur-md border border-minato-dim/50 rounded-lg p-2 flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,65,0.1)]">

                <button
                    onClick={toggleAudio}
                    className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-minato-accent/20 text-minato-accent animate-pulse' : 'bg-minato-dim/20 text-gray-400 hover:bg-minato-accent/10 hover:text-white'}`}
                    title={isPlaying ? "Mute Ambient" : "Init Audio Subsystem"}
                >
                    {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {isPlaying && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                        <div className="h-8 w-[1px] bg-minato-dim/30"></div>

                        <div className="flex bg-black/50 rounded p-1 gap-1">
                            <button
                                onClick={() => switchMode('SERVER')}
                                className={`p-1.5 rounded transition-colors ${mode === 'SERVER' ? 'bg-minato-dim/50 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                title="Server Room Hum"
                            >
                                <Server className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => switchMode('RAIN')}
                                className={`p-1.5 rounded transition-colors ${mode === 'RAIN' ? 'bg-blue-900/50 text-blue-200' : 'text-gray-500 hover:text-gray-300'}`}
                                title="Digital Rain"
                            >
                                <CloudRain className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="w-20">
                            <input
                                type="range"
                                min="0"
                                max="0.5"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full h-1 bg-minato-dim/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-minato-accent [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
