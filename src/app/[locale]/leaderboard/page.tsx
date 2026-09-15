import { setRequestLocale } from 'next-intl/server';
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function Leaderboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/stroop_scores?order=score.desc&limit=10`;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let scores = [];
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': key || '',
        'Authorization': `Bearer ${key}`
      },
      cache: 'no-store'
    });
    if (res.ok) {
      scores = await res.json();
    }
  } catch (err) {
    console.error("Error fetching scores:", err);
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#00ff41] p-4 md:p-10 font-mono flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl mb-10 border-b-2 border-[#00ff41] pb-4 tracking-widest drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] text-center">
        GLOBAL LEADERBOARD
      </h1>
      
      <div className="w-full max-w-2xl bg-[#222] border-2 border-[#00ff41] p-4 md:p-8 shadow-[6px_6px_0px_#00ff41]">
        <table className="w-full text-left text-lg md:text-xl">
          <thead>
            <tr className="border-b-2 border-[#00ff41]">
              <th className="py-4 w-16">#</th>
              <th className="py-4">PLAYER</th>
              <th className="py-4 text-right">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {scores && scores.length > 0 ? (
              scores.map((s: any, i: number) => (
                <tr key={s.id} className="border-b border-[#00ff41]/30 hover:bg-[#00ff41]/10 transition-colors">
                  <td className="py-4 text-[#ffcc00] font-bold">{i + 1}</td>
                  <td className="py-4 uppercase">{s.player_name}</td>
                  <td className="py-4 text-right">{s.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">NO SCORES YET. GO PLAY!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link href="/">
        <button className="mt-12 px-8 py-4 bg-[#222] border-2 border-[#ffcc00] text-[#ffcc00] hover:translate-y-[2px] hover:translate-x-[2px] shadow-[6px_6px_0px_#ffcc00] hover:shadow-[4px_4px_0px_#ffcc00] transition-all font-bold text-xl uppercase">
          RETURN TO MAIN MENU
        </button>
      </Link>
    </div>
  );
}
