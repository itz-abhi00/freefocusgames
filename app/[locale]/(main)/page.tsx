"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LeaderboardEntry {
    id: number;
    player_name: string;
    score: number;
}

export default function Home() {
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);

    // Fetch initial scores and subscribe to live changes
    useEffect(() => {
        const fetchScores = async () => {
            const { data } = await supabase
                .from("scores")
                .select("id, player_name, score")
                .order("score", { ascending: false })
                .limit(10);

            if (data) setScores(data);
        };

        fetchScores();

        // Subscribe to real-time additions to the scores table
        const channel = supabase
            .channel("realtime-leaderboard")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "scores" },
                () => {
                    // Re-fetch top scores whenever someone submits a new score
                    fetchScores();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const playerName = window.prompt("ENTER YOUR PLAYER NAME:");
        if (playerName) {
            localStorage.setItem("arcade_player_name", playerName);
            window.location.href = "/en/games/stroop-effect-test";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#121212] p-4 relative pb-24">
            {/* HERO SECTION */}
            <div className="z-10 flex-grow flex flex-col items-center justify-center text-center min-h-[85vh]">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#00ff41] mb-6 font-mono tracking-widest drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">
                        STROOP EFFECT
                    </h1>
                    
                    <p className="text-xl text-gray-400 mb-12 font-mono">
                        Your brain wants to read the word. 
                        <br/>Your mission is to identify the color.
                        <br/><br/>
                        Are you faster than your friends?
                    </p>

                    <div className="flex justify-center">
                        <button 
                            onClick={handleStartGame}
                            className="text-2xl font-bold px-10 py-6 bg-[#222] border-2 border-[#00ff41] text-[#00ff41] uppercase shadow-[6px_6px_0px_#00ff41] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#00ff41] transition-all cursor-pointer">
                            INSERT COIN TO PLAY
                        </button>
                    </div>
                </div>
            </div>

            {/* REAL-TIME LEADERBOARD */}
            <div className="z-10 w-full max-w-4xl mx-auto mt-12 pb-16 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-8">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff41]"></span>
                    </span>
                    <h2 className="text-3xl font-bold text-[#ffcc00] font-mono tracking-widest drop-shadow-[0_0_10px_rgba(255,204,0,0.5)] uppercase">
                        Live High Scores
                    </h2>
                </div>

                <div className="w-full bg-[#1a1a1a] border-2 border-[#ffcc00] p-6 shadow-[6px_6px_0px_#ffcc00]">
                    <table className="w-full text-left font-mono text-lg sm:text-xl">
                        <thead>
                            <tr className="text-[#ffcc00] border-b border-[#333]">
                                <th className="pb-4 pl-4">RANK</th>
                                <th className="pb-4">PLAYER</th>
                                <th className="pb-4 pr-4 text-right">SCORE</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {scores.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-6 text-center text-gray-500">
                                        NO SCORES RECORDED YET. BE THE FIRST!
                                    </td>
                                </tr>
                            ) : (
                                scores.map((entry, index) => {
                                    const rankColor = 
                                        index === 0 ? "text-[#00ff41]" : 
                                        index === 1 ? "text-[#ffcc00]" : 
                                        index === 2 ? "text-red-500" : "text-gray-400";
                                    
                                    const rankLabel = 
                                        index === 0 ? "1ST" : 
                                        index === 1 ? "2ND" : 
                                        index === 2 ? "3RD" : `${index + 1}TH`;

                                    return (
                                        <tr key={entry.id} className="border-b border-[#222] hover:bg-[#252525] transition-colors">
                                            <td className={`py-4 pl-4 font-bold ${rankColor}`}>{rankLabel}</td>
                                            <td className="py-4 uppercase">{entry.player_name}</td>
                                            <td className="py-4 pr-4 text-right font-bold">{entry.score}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="absolute bottom-0 left-0 w-full p-6 text-center font-mono text-[#00ff41] tracking-[2px] border-t border-[#00ff41] bg-[#121212] z-10">
                SYS.ADMIN: ABHIJEET GIRI - STROOP_EFFECT_V1
            </footer>
        </div>
    );
}
