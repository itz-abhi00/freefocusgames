"use client";

export default function Home() {
    const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // 1. Ask for their name
        const playerName = window.prompt("ENTER YOUR PLAYER NAME:");
        
        if (playerName) {
            // 2. Save it to the browser's memory
            localStorage.setItem("arcade_player_name", playerName);
            
            // 3. Send them to the game
            window.location.href = "/en/games/stroop-effect-test";
        }
    };

    return (
        // Removed overflow-hidden so the page can scroll down to the leaderboard
        <div className="min-h-screen flex flex-col bg-[#121212] p-4 relative pb-24">
            
            {/* HERO SECTION - Takes up the first full screen */}
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
                            className="text-2xl md:text-2xl font-bold px-10 py-6 bg-[#222] border-2 border-[#00ff41] text-[#00ff41] uppercase shadow-[6px_6px_0px_#00ff41] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#00ff41] transition-all cursor-pointer">
                            INSERT COIN TO PLAY
                        </button>
                    </div>
                </div>
            </div>

            {/* LEADERBOARD SECTION - At the bottom */}
            <div className="z-10 w-full max-w-4xl mx-auto mt-12 pb-16 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#ffcc00] mb-8 font-mono tracking-widest drop-shadow-[0_0_10px_rgba(255,204,0,0.5)] uppercase">
                    --- High Scores ---
                </h2>
                
                {/* Replace this table with your actual Leaderboard Component or Data if needed */}
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
                            <tr className="border-b border-[#222]">
                                <td className="py-4 pl-4 text-[#00ff41]">1ST</td>
                                <td className="py-4">ABHIJEET</td>
                                <td className="py-4 pr-4 text-right">9999</td>
                            </tr>
                            <tr className="border-b border-[#222]">
                                <td className="py-4 pl-4 text-[#ffcc00]">2ND</td>
                                <td className="py-4">GUEST_01</td>
                                <td className="py-4 pr-4 text-right">8500</td>
                            </tr>
                            <tr>
                                <td className="py-4 pl-4 text-red-500">3RD</td>
                                <td className="py-4">PLAYER_2</td>
                                <td className="py-4 pr-4 text-right">7200</td>
                            </tr>
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
