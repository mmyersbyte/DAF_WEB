import React from 'react';
import { Link } from 'react-router-dom';
import Text from './text.jsx';
import Button from './button.jsx';
import LogoIcon from './LogoIcon.jsx';
//vou alterar o background pro verde escuro
export default function LandingHeader() {
  return (
    <header className='z-30 border-b border-[var(--color-border)] bg-white/90 px-3 py-2 backdrop-blur-sm md:px-5'>
      <div className='flex w-full items-center justify-between gap-2'>
        <LogoIcon />

        <nav className='hidden items-center gap-2 md:flex'>
          <Text
            as='a'
            href='#inicio'
            size='md'
            weight='bold'
            color='text'
            className='rounded-full px-3 py-1.5 !text-[var(--color-text)] no-underline decoration-transparent outline-none transition-all visited:!text-[var(--color-text)] hover:bg-primary-light/70 hover:!text-primary-dark focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'
          >
            Início
          </Text>
          <Text
            as='a'
            href='#por-que-usar'
            size='sm'
            weight='medium'
            color='text'
            className='rounded-full px-3 py-1.5 !text-[var(--color-text)] no-underline decoration-transparent outline-none transition-all visited:!text-[var(--color-text)] hover:bg-primary-light/70 hover:!text-primary-dark focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'
          >
            Por que usar
          </Text>
          <Text
            as='a'
            href='#perguntas-frequentes'
            size='sm'
            weight='medium'
            color='text'
            className='rounded-full px-3 py-1.5 !text-[var(--color-text)] no-underline decoration-transparent outline-none transition-all visited:!text-[var(--color-text)] hover:bg-primary-light/70 hover:!text-primary-dark focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'
          >
            Perguntas frequentes
          </Text>
        </nav>

        <div className='flex items-center gap-1.5'>
          <Button
            as={Link}
            to='/login'
            variant='outline'
            size='sm'
            className='hidden sm:inline-flex'
          >
            Login
          </Button>
          <Button
            as={Link}
            to='/register'
            variant='primary'
            size='sm'
          >
            Criar conta
          </Button>
        </div>
      </div>
    </header>
  );
}
