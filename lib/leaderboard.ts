"use client";

export interface LeaderboardSubmissionOptions {
    mode?: string;
    details?: Record<string, boolean | number | string | null | undefined>;
}

export async function submitScoreToLeaderboard(
    gameId: string,
    score: number,
    options: LeaderboardSubmissionOptions = {}
) {
    try {
        // 1. Arcade-style pop-up asking for their name
        const playerName = window.prompt(`GAME OVER! Final Score: ${score}\n\nEnter your initials/name for the Global Leaderboard:`);
        
        // If they click cancel, just stop and don't save
        if (!playerName) {
            console.log("Score submission cancelled.");
            return;
        }

        // 2. Connect to your Supabase Database
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/stroop_scores`;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": key || "",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                player_name: playerName.substring(0, 15).toUpperCase(), // Keep it short and uppercase like an arcade!
                score: score
            }),
        });

        if (res.ok) {
            // 3. Teleport them straight to the leaderboard to see their rank
            window.location.href = "/en/leaderboard";
        } else {
            console.error("Supabase rejected the score:", await res.text());
        }
    } catch (e) {
        console.error("Failed to submit score", e);
    }
}
