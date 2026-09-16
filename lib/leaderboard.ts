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
        // We log both variables so TypeScript knows they are officially "used"
        console.log("Saving score for game:", gameId, "Options:", options);

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
            // Force the browser to reload the page to bypass the cache
            window.location.assign("/en/get-started");
        } else {
            const errorText = await res.text();
            window.alert(`DATABASE ERROR: ${errorText}`);
            console.error("Supabase rejected the score:", errorText);
        }
    // We use 'unknown' instead of 'any' to satisfy strict TypeScript rules
    } catch (e: unknown) {
        const errorMsg = e instanceof Error ? e.message : String(e);
        window.alert(`CRITICAL ERROR: ${errorMsg}`);
        console.error("Failed to submit score", e);
    }
}
