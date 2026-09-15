export const dynamic = "force-dynamic";

export default async function Leaderboard() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/stroop_scores?order=score.desc&limit=10`;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fetch the top 10 scores from your Supabase database
  const res = await fetch(url, {
    headers: {
      'apikey': key || '',
      'Authorization': `Bearer ${key}`
    }
  });
  
  const scores = await res.json();

  return (
    <div className="min-h-screen bg-[#121212] text-[#00ff41] p-10 font-mono flex flex-col items-center">
      <h1 className="text-5xl mb-10 border-b-2 border-[#00ff41] pb-4 tracking-widest drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
        GLOBAL LEADERBOARD
      </h1>
      
      <table className="w-full max-w-2xl text-left text-xl">
        <thead>
          <tr className="border-b-2 border-[#00ff41]">
            <th className="py-4">RANK</th>
            <th className="py-4">PLAYER</th>
            <th className="py-4">SCORE</th>
          </tr>
        </thead>
        <tbody>
          {scores && scores.length > 0 ? (
            scores.map((s: any, i: number) => (
              <tr key={s.id} className="border-b border-[#00ff41]/30 hover:bg-[#00ff41]/10 transition-colors">
                <td className="py-4">#{i + 1}</td>
                <td className="py-4 uppercase">{s.player_name}</td>
                <td className="py-4">{s.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">No scores yet. Go play the game!</td>
            </tr>
          )}
        </tbody>
      </table>

      <a href="/" className="mt-12 px-8 py-4 bg-[#222] border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold">
        RETURN TO MAIN MENU
      </a>
    </div>
  );
}
