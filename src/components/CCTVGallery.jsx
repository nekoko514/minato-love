import React, { useState, useEffect, useRef } from 'react';
import { Camera, Image as ImageIcon, Maximize2, X, Upload } from 'lucide-react';

export default function CCTVGallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Load saved images (limit to recent 4 to save space/memory)
    useEffect(() => {
        const saved = localStorage.getItem('minato_cctv_images');
        if (saved) {
            setImages(JSON.parse(saved));
        }
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5000000) {
            alert("File too large. Minato's bandwidth is precious.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const newImage = {
                id: Date.now(),
                src: event.target.result,
                timestamp: new Date().toISOString()
            };
            // Keep only last 6
            const updated = [newImage, ...images].slice(0, 6);
            setImages(updated);
            localStorage.setItem('minato_cctv_images', JSON.stringify(updated));
        };
        reader.readAsDataURL(file);
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    const deleteImage = (id, e) => {
        e.stopPropagation();
        const updated = images.filter(img => img.id !== id);
        setImages(updated);
        localStorage.setItem('minato_cctv_images', JSON.stringify(updated));
        if (selectedImage?.id === id) setSelectedImage(null);
    };

    return (
        <div className="bg-minato-panel border border-minato-dim/30 rounded-lg h-full min-h-[300px] flex flex-col overflow-hidden relative group transition-all duration-500 hover:border-minato-accent/30">

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-20 opacity-50" />
            <div className="absolute inset-0 pointer-events-none z-20 animate-flicker opacity-5 mix-blend-overlay bg-minato-accent"></div>

            {/* Header */}
            <div className="p-3 border-b border-minato-dim/30 bg-black/40 flex justify-between items-center z-30">
                <h3 className="text-sm font-bold flex items-center gap-2 text-minato-dim group-hover:text-minato-accent transition-colors font-mono tracking-widest uppercase">
                    <Camera className="w-4 h-4" />
                    CAM_01 [GALLERY]
                </h3>
                <button
                    onClick={triggerUpload}
                    className="text-xs flex items-center gap-1 bg-minato-dim/20 hover:bg-minato-accent/20 px-2 py-1 rounded text-minato-text transition-all border border-transparent hover:border-minato-accent/30"
                >
                    <Upload className="w-3 h-3" />
                    UPLOAD
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {/* Grid Area */}
            <div className="flex-1 p-2 overflow-y-auto custom-scrollbar relative z-10 bg-black/20">
                {images.length === 0 ? (
                    <div onClick={triggerUpload} className="h-full flex flex-col items-center justify-center border-2 border-dashed border-minato-dim/20 rounded cursor-pointer hover:border-minato-accent/30 hover:bg-minato-accent/5 transition-all group/upload">
                        <ImageIcon className="w-8 h-8 text-minato-dim group-hover/upload:text-minato-accent transition-colors mb-2" />
                        <p className="text-xs text-minato-dim font-mono">NO SIGNAL</p>
                        <p className="text-[10px] text-gray-600">Click to upload feed</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {images.map(img => (
                            <div
                                key={img.id}
                                onClick={() => setSelectedImage(img)}
                                className="aspect-square relative cursor-pointer overflow-hidden rounded border border-minato-dim/30 hover:border-minato-accent/50 transition-all group/img"
                            >
                                <img src={img.src} alt="memory" className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/60">
                                    <X className="w-3 h-3 text-red-400 hover:text-red-500" onClick={(e) => deleteImage(img.id, e)} />
                                </div>
                            </div>
                        ))}
                        <div onClick={triggerUpload} className="aspect-square flex items-center justify-center border border-dashed border-minato-dim/20 rounded cursor-pointer hover:border-minato-accent/30 hover:bg-minato-accent/5 transition-all">
                            <PlusIcon className="w-4 h-4 text-minato-dim" />
                        </div>
                    </div>
                )}
            </div>

            {/* Live Indicator */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 z-30 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono text-red-500 font-bold">REC</span>
            </div>

            {/* Modal View */}
            {selectedImage && (
                <div className="absolute inset-0 z-50 bg-black flex flex-col">
                    <div className="p-2 flex justify-end bg-black/80">
                        <button onClick={() => setSelectedImage(null)} className="text-white hover:text-red-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                        <img src={selectedImage.src} className="max-w-full max-h-full object-contain border border-minato-dim" />
                    </div>
                    {/* Modal Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none" />
                </div>
            )}
        </div>
    );
}

function PlusIcon({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
