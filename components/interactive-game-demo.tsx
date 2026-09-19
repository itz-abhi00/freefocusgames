'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface InteractiveGameDemoProps {
  size?: 'default' | 'compact';
  variant?: 'primary' | 'secondary';
}

export function InteractiveGameDemo({ size = 'default', variant = 'primary' }: InteractiveGameDemoProps) {
  const t = useTranslations('blog.interactiveDemo');

  const isCompact = size === 'compact';
  const buttonClass = variant === 'primary'
    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white";

  return (
    <div className={`${isCompact ? 'my-4 p-4' : 'my-8 p-6'} border-2 border-dashed border-primary/20 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20`}>
      <div className="text-center mb-4">
        <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-semibold text-primary mb-2`}>
          🎮 {t('title')}
        </h3>
        {!isCompact && (
          <p className="text-muted-foreground mb-4">
            {t('description')}
          </p>
        )}
        <button
          onClick={() => window.location.href = "/"}
          className={`px-6 py-3 ${buttonClass} rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out`}
        >
          🚀 Play Stroop Effect Now!
        </button>
      </div>
    </div>
  );
}
