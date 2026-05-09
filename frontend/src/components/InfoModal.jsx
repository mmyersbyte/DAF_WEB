import React, { useEffect } from 'react';
import Button from './button.jsx';
import Text from './text.jsx';
import FeatureCard from './FeatureCard.jsx';
import CalculatorIcon from '../assets/cards/calculator-svgrepo-com.svg?react';
import DataIcon from '../assets/cards/data-svgrepo-com.svg?react';

export default function InfoModal({ show, onHide }) {
  useEffect(() => {
    if (!show) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onHide();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='info-modal-title'
    >
      <Button
        type='button'
        variant='secondary'
        onClick={onHide}
        aria-label='Fechar modal'
        className='absolute inset-0 z-0 min-h-full min-w-full rounded-none border-0 bg-black/45 p-0 shadow-none backdrop-blur-[2px] hover:bg-black/50 hover:brightness-100 active:brightness-100 [&]:text-transparent [&]:focus-visible:ring-offset-0'
      />

      <div className='relative z-10 w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-2xl'>
        <div className='mb-4 flex items-start justify-between gap-4'>
          <Text
            as='h2'
            id='info-modal-title'
            size='xl'
            weight='bold'
            color='primaryDark'
          >
            Informações
          </Text>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={onHide}
            aria-label='Fechar'
            className='min-h-0 shrink-0 px-2.5 py-2 text-[var(--color-primary-dark)]'
          >
            <span aria-hidden className='text-xl leading-none'>
              ×
            </span>
          </Button>
        </div>

        <div className='space-y-4'>
          <FeatureCard
            className='border border-[var(--color-border)] bg-primary-light/25 shadow-none'
            icon={<CalculatorIcon aria-hidden />}
            title='Renda mensal'
            description='É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas.'
          />
          <FeatureCard
            className='border border-[var(--color-border)] bg-primary-light/25 shadow-none'
            icon={<DataIcon aria-hidden />}
            title='Custos mensais'
            description='São os gastos mensais necessários para o seu trabalho acontecer, como aluguel da sala, internet, energia, telefone, material de escritório, entre outros. Essas despesas podem ser usadas para reduzir a base de cálculo do imposto (no caso da pessoa física).'
          />
        </div>

        <div className='mt-6 flex justify-end'>
          <Button type='button' variant='primary' onClick={onHide}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
