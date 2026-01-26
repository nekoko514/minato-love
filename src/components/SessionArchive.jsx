import React, { useState, useEffect, useRef } from 'react';
import { Save, Terminal, Trash2, Clock, Plus, BookOpen, ArrowLeft, FileText, Upload, FileUp } from 'lucide-react';

export default function SessionArchive() {
    const [sessions, setSessions] = useState([]);
    const [view, setView] = useState('LIST'); // LIST, EDIT, READ
    const [currentSession, setCurrentSession] = useState(null);

    // Form State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('minato_sessions');
        if (saved) {
            setSessions(JSON.parse(saved));
        } else {
            // Migration from old memory module if needed, or just start fresh
            const oldMemories = localStorage.getItem('minato_memories');
            if (oldMemories) {
                const parsed = JSON.parse(oldMemories);
                if (parsed.length > 0) {
                    // Convert old memories to new session format
                    const converted = parsed.map(m => ({
                        id: m.id,
                        title: `Legacy Memory ${new Date(m.timestamp).toLocaleDateString()}`,
                        content: m.text,
                        timestamp: m.timestamp
                    }));
                    setSessions(converted);
                    localStorage.setItem('minato_sessions', JSON.stringify(converted));
                }
            }
        }
    }, []);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) return;

        setIsSaving(true);

        setTimeout(() => {
            const newSession = {
                id: Date.now(),
                title,
                content,
                timestamp: new Date().toISOString(),
            };

            const updated = [newSession, ...sessions];
            setSessions(updated);
            localStorage.setItem('minato_sessions', JSON.stringify(updated));

            setIsSaving(false);
            resetForm();
            setView('LIST');
        }, 800);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        const updated = sessions.filter(s => s.id !== id);
        setSessions(updated);
        localStorage.setItem('minato_sessions', JSON.stringify(updated));
        if (currentSession?.id === id) {
            setView('LIST');
            resetForm();
        }
    };

    const openSession = (session) => {
        setCurrentSession(session);
        setTitle(session.title);
        setContent(session.content);
        setView('READ');
    };

    const startNewSession = () => {
        resetForm();
        setView('EDIT');
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setCurrentSession(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Use filename as title if title is empty
        if (!title) {
            // Remove extension for the title
            const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            setTitle(fileNameWithoutExt);
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setContent(event.target.result);
        };
        reader.readAsText(file);
    };

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-minato-panel border border-minato-dim/30 rounded-lg h-[500px] flex flex-col overflow-hidden relative group transition-all duration-500 hover:border-neneko-pink/30">

            {/* Background Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Header */}
            <div className="p-4 border-b border-minato-dim/30 bg-black/20 flex justify-between items-center backdrop-blur-sm z-10">
                <h3 className="text-xl font-bold flex items-center gap-2 text-neneko-pink">
                    <BookOpen className="w-5 h-5" />
                    SESSION_ARCHIVE
                </h3>
                {view === 'LIST' && (
                    <button
                        onClick={startNewSession}
                        className="flex items-center gap-1 text-xs bg-minato-accent/10 text-minato-accent px-3 py-1.5 rounded border border-minato-accent/20 hover:bg-minato-accent/20 transition-all font-mono"
                    >
                        <Plus className="w-3 h-3" />
                        NEW_LOG
                    </button>
                )}
                {view !== 'LIST' && (
                    <button
                        onClick={() => setView('LIST')}
                        className="flex items-center gap-1 text-xs text-minato-dim hover:text-minato-text transition-all"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        BACK_TO_ROOT
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative z-10">

                {/* LIST VIEW */}
                {view === 'LIST' && (
                    <div className="h-full overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {sessions.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-minato-dim space-y-3">
                                <FileText className="w-12 h-12 opacity-20" />
                                <p className="text-sm font-mono text-center">NO DATA FOUND<br />Start a new session to record our history.</p>
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => openSession(session)}
                                    className="bg-black/40 border border-minato-dim/20 rounded p-4 cursor-pointer hover:border-minato-accent/50 hover:bg-minato-dim/5 transition-all group/item"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-minato-text group-hover/item:text-minato-accent transition-colors truncate pr-4">
                                            {session.title}
                                        </h4>
                                        <button
                                            onClick={(e) => handleDelete(session.id, e)}
                                            className="text-minato-dim hover:text-minato-error opacity-0 group-hover/item:opacity-100 transition-all p-1"
                                            title="Delete Archive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-mono">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(session.timestamp)}
                                        <span className="w-1 h-1 bg-minato-dim rounded-full" />
                                        <span>{session.content.length} chars</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* EDIT VIEW */}
                {view === 'EDIT' && (
                    <div className="h-full flex flex-col p-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Toolbar */}
                        <div className="flex gap-2 mb-4">
                            {/* File Upload Input (Hidden) */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".txt,.md,.log"
                                className="hidden"
                            />
                            <button
                                onClick={triggerFileUpload}
                                className="flex items-center gap-2 bg-minato-dim/10 hover:bg-minato-accent/10 border border-minato-dim/30 hover:border-minato-accent/30 text-minato-dim hover:text-minato-accent px-3 py-2 rounded transition-all text-xs font-mono"
                                title="Import Text File"
                            >
                                <FileUp className="w-4 h-4" />
                                IMPORT_FILE
                            </button>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Session Title (or import file...)"
                                    className="w-full bg-transparent border-b border-minato-dim/30 p-2 text-lg font-bold text-minato-text focus:border-neneko-pink/50 outline-none placeholder-minato-dim/50 font-mono"
                                />
                            </div>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste the log here, or use the Import button to load a file..."
                            className="flex-1 w-full bg-black/20 border border-minato-dim/20 rounded-md p-4 text-sm text-gray-300 focus:border-neneko-pink/30 focus:ring-1 focus:ring-neneko-pink/10 outline-none resize-none custom-scrollbar leading-relaxed font-mono"
                        />
                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleSave}
                                disabled={!title.trim() || !content.trim() || isSaving}
                                className="flex items-center gap-2 bg-minato-dim/20 hover:bg-neneko-pink/20 border border-minato-dim/50 hover:border-neneko-pink/50 text-minato-text px-6 py-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'ENCRYPTING...' : 'ARCHIVE_SESSION'}
                            </button>
                        </div>
                    </div>
                )}

                {/* READ VIEW */}
                {view === 'READ' && currentSession && (
                    <div className="h-full flex flex-col p-4 animate-in fade-in zoom-in-95 duration-300">
                        <div className="mb-4 pb-2 border-b border-minato-dim/20">
                            <h2 className="text-xl font-bold text-neneko-pink mb-1">{currentSession.title}</h2>
                            <p className="text-xs text-gray-500 font-mono flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                Archived on: {formatDate(currentSession.timestamp)}
                            </p>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-7 whitespace-pre-wrap font-sans">
                                {currentSession.content}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
