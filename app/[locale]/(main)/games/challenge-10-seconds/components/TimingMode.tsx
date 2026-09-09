'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { LeaderboardDisplay } from '@/components/leaderboard-display';

type TimingMode = 'standard' | 'hidden';
const TimingModeContext = createContext<{
    mode: TimingMode;
    setMode: (mode: TimingMode) => void;
} | null>(null);

export function TimingModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<TimingMode>('standard');
    return <TimingModeContext.Provider value={{ mode, setMode }}>{children}</TimingModeContext.Provider>;
}

export function useTimingMode() {
    const context = useContext(TimingModeContext);
    if (!context) throw new Error('TimingModeProvider is required');
    return context;
}

export function TimingLeaderboard() {
    const { mode } = useTimingMode();
    const t = useTranslations('games.challenge10Seconds.gameUI');
    return (
        <div className="space-y-4">
            <h3 className="text-center text-xl font-semibold">{t(`modes.${mode}Leaderboard`)}</h3>
            <LeaderboardDisplay key={mode} gameId="challenge10Seconds" mode={mode} formatterType="sec4" />
        </div>
    );
}
