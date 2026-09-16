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
        console.log("Saving score for game:", gameId);

        let playerName = localStorage.getItem("arcade_player_name");
        
        if (!playerName) {
            playerName = window.prompt(`GAME OVER! Final Score: ${score}\n\nEnter your initials:`);
        }
        
        if (!playerName) return;

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
                player_name: playerName.substring(0, 15).toUpperCase(),
                score: score
            }),
        });

        if (res.ok) {
            // Force the browser to completely reload the leaderboard page so it doesn't use a cached version!
            window.location.assign("/en/get-started");
        } else {
            // If it fails, loudly tell us why!
            const errorText = await res.text();
            window.alert(`DATABASE ERROR: ${errorText}`);
            console.error("Supabase rejected the score:", errorText);
        }
    } catch (e: any) {
        window.alert(`CRITICAL ERROR: ${e.message}`);
        console.error("Failed to submit score", e);
    }
}
