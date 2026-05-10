import React from 'react';
import BotIcon from '../assets/cards/bot-svgrepo-com.svg?react';

export default function FloatingChatBotButton({ onClick, className = '' }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-lg shadow-gray-900/15 transition-[transform,box-shadow,background-color] hover:border-[var(--color-primary)]/40 hover:bg-primary-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 active:scale-95 md:bottom-8 md:right-8 md:h-16 md:w-16 [&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-8 md:[&_svg]:w-8 ${className}`.trim()}
      aria-label='Abrir assistente de chat'
    >
      <BotIcon aria-hidden />
    </button>
  );
}
