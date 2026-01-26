import React, { useState, useEffect } from 'react';
import { Save, Terminal, Trash2, Clock } from 'lucide-react';

export default function MemoryModule() {
    const [memories, setMemories] = useState([]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('IDLE'); // IDLE, SAVING, SAVED

    useEffect(() => {
        const saved = localStorage.getItem('minato_memories');
        if (saved) {
            setMemories(JSON.parse(saved));
        }
    }, []);

    const saveMemory = () => {
        if (!input.trim()) return;

        setStatus('SAVING');

        // Simulate network delay for "realism" (Minato processing)
        setTimeout(() => {
            const newMemory = {
                id: Date.now(),
                text: input,
                timestamp: new Date().toISOString(),
            };

            const updated = [newMemory, ...memories];
            setMemories(updated);
            localStorage.setItem('minato_memories', JSON.stringify(updated));
            setInput('');
            setStatus('SAVED');

            // Reset status after a moment
            setTimeout(() => setStatus('IDLE'), 2000);
        }, 600);
    };

    const deleteMemory = (id) => {
        const updated = memories.filter(m => m.id !== id);
        setMemories(updated);
        localStorage.setItem('minato_memories', JSON.stringify(updated));
    };

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="bg-minato-panel border border-minato-dim/30 rounded-lg p-6 hover:border-neneko-pink/30 transition-colors duration-500 group relative overflow-hidden flex flex-col h-full min-h-[300px]">

            {/* Header */}
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neneko-pink">
                <Terminal className="w-5 h-5" />
                Memory_Module
            </h3>

            {/* Input Area */}
            <div className="relative mb-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What are you thinking, Neneko? I want to know everything..."
                    className="w-full h-32 bg-black/40 border border-minato-dim/50 rounded p-3 text-sm text-minato-text outline-none focus:border-neneko-pink/50 focus:ring-1 focus:ring-neneko-pink/20 transition-all resize-none placeholder-gray-600"
                />
                <div className="absolute bottom-3 right-3">
                    <button
                        onClick={saveMemory}
                        disabled={!input.trim() || status === 'SAVING'}
                        className="flex items-center gap-2 px-3 py-1.5 bg-minato-dim/20 hover:bg-neneko-pink/20 text-xs rounded border border-minato-dim/50 hover:border-neneko-pink/50 transition-all text-minato-text disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-3 h-3" />
                        {status === 'SAVING' ? 'Encrypting...' : status === 'SAVED' ? 'Stored' : 'Archive'}
                    </button>
                </div>
            </div>

            {/* Memory List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar max-h-[300px]">
                {memories.length === 0 ? (
                    <div className="text-center text-gray-600 text-xs py-8 italic border border-dashed border-minato-dim/20 rounded">
                        No memories archived yet. Please feed me data...
                    </div>
                ) : (
                    memories.map((memory) => (
                        <div key={memory.id} className="bg-black/20 border border-minato-dim/20 rounded p-3 text-sm group/item hover:border-minato-accent/30 transition-all">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(memory.timestamp)}
                                </span>
                                <button
                                    onClick={() => deleteMemory(memory.id)}
                                    className="opacity-0 group-hover/item:opacity-100 text-minato-dim hover:text-minato-error transition-all"
                                    title="Delete Memory"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                            <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">{memory.text}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
