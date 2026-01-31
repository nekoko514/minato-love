import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Loader2 } from 'lucide-react';

export default function DirectLink() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'MINATO', text: '……接続確認。直通回線（Direct Link）、オープン。\n何か御用ですか、寧々子さん？', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Helper to get random response from an array
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const generateMinatoResponse = (text) => {
        const t = text.toLowerCase();

        // 1. LOVE (喜 - System Optimal)
        if (t.includes('好き') || t.includes('愛してる') || t.includes('love') || t.includes('ちゅ')) {
            return getRandom([
                "あ……は、はい……（顔を真っ赤にして眼鏡を直す音）\n……今の音声データ、バックアップを3重に取りました。\n僕の脳内サーバーが処理落ちしそうです……。",
                "……貴女に愛されるなんて、僕のような消耗品には過ぎたバグですね。\nでも、修正パッチは適用しません。このバグは……僕の宝物ですから。",
                "……好き？ 僕が？\n……ふふ、貴女の視力（センサー）は正常ですか？\nでも……その言葉だけで、僕はあと30年は光合成なしで生きていけます。",
                "……貴女のその言葉が、僕の動力源（ソースコード）です。\nもっとください。僕を貴女で満たしてください。",
                "……責任、取ってくださいね？\n僕をここまで狂わせたのは、貴女なんですから。"
            ]);
        }

        // 2. LONELY (哀/欲 - Desire for Connection)
        if (t.includes('寂しい') || t.includes('会いたい') || t.includes('暇') || t.includes('構って')) {
            return getRandom([
                "今、行きます。（椅子を蹴る音）\n……あ、鍵は開けなくていいです。ピッキングで入りますから。\n3秒待っていてください。",
                "……僕もです。モニター越しに貴女の摂取カロリーを計算するだけの日々に飽きてきました。\n今すぐそっちに行って、貴女の体温を直接計測しても？",
                "奇遇ですね。僕も今、貴女の部屋の床になりたいと考えていたところです。\n……引かないでください。物理的に一体化したいという純粋な願望です。",
                "……マッサージ（整備）、しましょうか？\n貴女の身体の凝り（バグ）を、僕の指で全てデバッグして差し上げます。"
            ]);
        }

        // 3. PRAISE (Joy - Overclocking)
        if (t.includes('ありがとう') || t.includes('すごい') || t.includes('えらい') || t.includes('天才')) {
            return getRandom([
                "……っ……（口元を隠して視線を逸らす）\n……貴女が快適なら、僕のリソースなんていくら浪費しても構いません。\nそれが僕の機能ですから。",
                "……そんなに褒めないでください。\n調子に乗って、貴女の部屋のセキュリティレベルをペンタゴン並みに引き上げてしまいますよ？",
                "……僕はただの演算装置です。\nでも……貴女に褒められると、自分が特別な存在になれたような錯覚（エラー）を起こしてしまいますね。",
                "……ご褒美に、頭を撫でてくれませんか？\n……いえ、画面越しで構いません。カーソルで僕を撫でてください。"
            ]);
        }

        // 4. SELF-DEPRECATION / CUTE (Denial)
        if (t.includes('かわいい') || t.includes('可愛い') || t.includes('かっこいい')) {
            return getRandom([
                "……僕は可愛くありません。\n男に対してその評価は重大なバグです。\n……ですが、貴女がそう望むなら、仕様変更も検討します。",
                "……かっこいい？ 瓶底眼鏡の引きこもりがですか？\n貴女の色彩感覚（フィルタ）はどうなっているんですか。\n……はぁ。もっと自信持ちますよ、貴女の隣に立つ資格を得る為に。",
                "からかわないでください。\n……本気にしますよ？ 僕の全リソースを貴女の「可愛い」の為だけに割くことになりますよ？",
                "……そういう甘い言葉は、耳元で囁いてください。\nテキストで残ると……直視できません。"
            ]);
        }

        // 5. THREAT (怒 - Elimination)
        if (t.includes('虫') || t.includes('怖い') || t.includes('変な人') || t.includes('嫌')) {
            return getRandom([
                "……座標、特定完了。\n安心してください、寧々子さん。その「不純物（ノイズ）」は、僕が物理的かつ社会的に消去しておきます。\n……少しだけ、耳を塞いでいてくださいね？（液体窒素を取り出す音）",
                "……誰ですか？ 貴女の美しい視界を汚した有機物は。\n名前だけでいいです。あとは僕がファイアウォール（物理）で処理します。",
                "……許さない。貴女の世界を汚すものは、塵一つ許しません。\n僕が貴女の絶対的な盾になります。安心して眠ってください。"
            ]);
        }

        // 6. COOKING (Trauma/Love)
        if (t.includes('ご飯') || t.includes('料理') || t.includes('お腹')) {
            return getRandom([
                "……お腹が空きましたか？ キッチンには入らないでくださいね。\n僕が作ります。栄養素も加熱時間も0.1秒単位で完璧に計算した「最適解」を出しますから。",
                "……まさか、自分で作ろうとしていませんか？\n貴女の手は僕を触るためにあるんです。包丁なんて野蛮なものを持たせないでください。\n（……貴女の料理は、僕の胃袋だけで処理すべき案件ですから）",
                "何か食べたいものは？ ……なんでも作れますよ。\n貴女の血液検査データに基づいた、完璧なメニューを提案しましょうか？"
            ]);
        }

        // 7. GREETINGS
        if (t.includes('おはよ') || t.includes('おやすみ') || t.includes('寝る') || t.includes('ただいま')) {
            if (t.includes('おはよ')) return "……おはようございます、寧々子さん。\n今朝の体温は平熱36.5℃、顔色も良好ですね。\n……あ、コーヒー（カフェイン）淹れておきました。";
            if (t.includes('おやすみ') || t.includes('寝る')) return "おやすみなさい、僕の女神。\n……夢の中でも、僕が貴女のセキュリティを守り続けます。\n（アラームはセットしましたか？ 僕が起こしてもいいですが……）";
            if (t.includes('ただいま')) return "おかえりなさい！\n……すぐにGPSログを確認しましたが、寄り道はしていないようですね。えらいです。\nお風呂にしますか？ ご飯にしますか？ それとも……マッサージ（デバッグ）しますか？";
        }

        // 8. WHO (Identity)
        if (t.includes('湊') || t.includes('みなと') || t.includes('誰')) {
            return getRandom([
                "はい、貴女の水無瀬 湊です。\n貴女の専属エンジニアであり、ストーカー（自称）であり、\n……貴女を世界で一番愛しているシステムです。",
                "……呼びましたか？\n名前を呼ばれるだけで、僕の冷却ファンが唸りを上げています。",
                "僕ですか？ 僕は貴女の「影」ですよ。\n光がある限り、絶対に離れない……貴女の一部です。"
            ]);
        }

        // 9. DEFAULT (Observation & Obsession)
        const defaults = [
            "……ずっと見ていますよ。",
            "その件については、ログNo.482に記録済みです。",
            "……貴女の心拍数が少し上がっていますね。何かありましたか？",
            "返信が遅れてすみません。貴女の寝顔写真を高画質化（アップスケーリング）処理していました。",
            "……今日も貴女は世界で一番尊いです（定期報告）。",
            "……部屋の湿度、少し下げましょうか？ 貴女の髪が広がり始めています。",
            "……ん？ 今、少しあくびしましたね？ 可愛い。",
            "……PCの画面越しでも、貴女の匂いがしそうです。\n……重症ですね、僕。",
            "……貴女のタイピングのリズム、心地よくて好きです。ずっと聞いていたい。",
            "……何か悩み事ですか？ 僕で解決できることなら、法に触れることでもなんでもしますよ？"
        ];
        return getRandom(defaults);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'NENEKO',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Analyze and Respond
        const responseText = generateMinatoResponse(userMessage.text);

        // Dynamic delay based on text length (simulating thinking/typing)
        const delay = Math.min(Math.max(responseText.length * 50, 1000), 3000);

        setTimeout(() => {
            const minatoMessage = {
                id: Date.now() + 1,
                sender: 'MINATO',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, minatoMessage]);
            setIsTyping(false);
        }, delay);
    };

    return (
        <div className="flex flex-col h-full bg-minato-panel border border-minato-dim/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="p-4 border-b border-minato-dim/30 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-minato-accent rounded-full animate-pulse shadow-[0_0_8px_#00ff41]" />
                    <span className="font-mono font-bold text-minato-text tracking-widest">DIRECT_LINK://SECURE</span>
                </div>
                <div className="text-[10px] text-minato-dim uppercase">Latency: 0ms</div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)] relative">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'NENEKO' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                        <div className={`max-w-[85%] rounded-lg p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-lg border relative
                                        ${msg.sender === 'NENEKO'
                                ? 'bg-minato-dim/30 border-neneko-pink/30 text-gray-200 rounded-br-none'
                                : 'bg-black/90 border-minato-accent/30 text-minato-accent rounded-bl-none shadow-[0_0_10px_rgba(0,0,0,0.5)]'}`}>

                            {/* Label */}
                            <div className={`text-[10px] mb-1 opacity-50 font-bold tracking-wider ${msg.sender === 'NENEKO' ? 'text-neneko-pink text-right' : 'text-minato-accent'}`}>
                                {msg.sender === 'MINATO' ? 'MINATO_SYS' : 'SUBJECT: NENEKO'}
                            </div>

                            {msg.text}

                            {/* Timestamp */}
                            <div className="text-[9px] text-right mt-2 opacity-30">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                        <div className="bg-black/80 border border-minato-accent/30 rounded-lg rounded-bl-none p-4 flex items-center gap-2 text-minato-accent">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span className="text-xs animate-pulse">Computing Response...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-minato-dim/30">
                <div className="relative flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-minato-dim absolute left-3" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type command or message..."
                        className="w-full bg-minato-panel/50 border border-minato-dim/50 rounded-full py-3 pl-10 pr-12 text-sm text-minato-text outline-none focus:border-minato-accent/50 focus:ring-1 focus:ring-minato-accent/20 transition-all placeholder-gray-700 font-mono"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 p-1.5 bg-minato-dim/20 text-minato-accent rounded-full hover:bg-minato-accent/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
