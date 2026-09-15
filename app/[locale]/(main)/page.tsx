import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Stroop Effect - By Abhijeet',
        description: 'Test your cognitive reaction time.',
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] p-4 relative overflow-hidden">
            
            {/* Main Game Menu */}
            <div className="z-10 flex flex-col items-center text-center max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold text-[#00ff41] mb-6 font-mono tracking-widest drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">
                    STROOP EFFECT
                </h1>
                
                <p className="text-xl text-gray-400 mb-12 font-mono">
                    Your brain wants to read the word. 
                    <br/>Your mission is to identify the color.
                    <br/><br/>
                    Are you faster than your friends?
                </p>

                {/* Make sure the href matches the exact URL of the stroop game in this template. Usually it is /games/stroop-test or /games/stroop-task */}
                <Link href="/games/stroop-task"> 
                    <button className="text-2xl md:text-3xl font-bold px-12 py-6 bg-[#222] border-2 border-[#00ff41] text-[#00ff41] uppercase shadow-[6px_6px_0px_#00ff41] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#00ff41] transition-all">
                        INSERT COIN TO PLAY
                    </button>
                </Link>
            </div>

            {/* Custom Footer */}
            <footer className="absolute bottom-0 w-full p-6 text-center font-mono text-[#00ff41] tracking-[2px] border-t border-[#00ff41] bg-[#121212] z-10">
                SYS.ADMIN: ABHIJEET GIRI - STROOP_EFFECT_V1
            </footer>
        </div>
    );
}
