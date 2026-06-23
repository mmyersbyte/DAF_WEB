import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalculatorForm from '../components/CalculatorForm.jsx';
import CompareResult from '../components/CompareResult.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import Text from '../components/text.jsx';
import Button from '../components/button.jsx';
import BusinessPlanAnimate from '../assets/business-plan-animate.svg?react';
import TimePastIcon from '../assets/cards/time-past-svgrepo-com.svg?react';
import DataIcon from '../assets/cards/data-svgrepo-com.svg?react';
import FloatingChatBotButton from '../components/FloatingChatBotButton.jsx';
import Chatbot from '../components/chatbot/Chatbot.jsx';
import { logout } from '../services/authService';
import { compareTaxes } from '../util/tax';

function FeatureIconWrap({ children }) {
  return (
    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-[var(--color-primary)] [&_svg]:h-6 [&_svg]:w-6'>
      {children}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      className='h-6 w-6'
      fill='currentColor'
      aria-hidden
    >
      <path d='M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 2.18 6 2.67V11c0 4.52-2.98 8.69-6 9.81-3.02-1.12-6-5.29-6-9.81V5.85l6-2.67Z' />
    </svg>
  );
}

export default function Home() {
  const [result, setResult] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  async function handleCompare(data) {
    try {
      const result = await compareTaxesRequest({
        rendaMensal: data.rendaMensal,
        custosMensais: data.custosMensais,
        profissao: data.profissao,
      });

      setResult(result);
    } catch (error) {
      console.error('Erro ao calcular comparativo:', error);

      if (error.response?.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      alert(
        error.response?.data?.message ||
          'Não foi possível calcular o comparativo.',
      );
    }
  }

  function handleBack() {
    setResult(null);
  }

  function handleChatFabClick() {
    setChatOpen(true);
  }

  return (
    <div className='min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]'>
      <header className='border-b border-[var(--color-border)] bg-white px-4 py-5 md:px-8'>
        <div className='mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <Text
              as='h1'
              size='subtitle'
              weight='bold'
              color='text'
            >
              Calculadora Tributária
            </Text>
            <Text
              size='md'
              className='mt-1 text-gray-600'
            >
              Compare PF e PJ de forma simples
            </Text>
          </div>
          <Button
            type='button'
            variant='secondary'
            className='shrink-0 border-[var(--color-border)] bg-white text-[var(--color-primary-dark)] hover:bg-primary-light'
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </header>

      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6'>
        {!result ? (
          <>
            <section className='grid items-center gap-10 lg:grid-cols-2 lg:gap-12'>
              <div className='space-y-6'>
                <div className='inline-flex items-center rounded-full border border-[var(--color-primary)]/20 bg-primary-light px-4 py-1.5 text-sm font-medium text-[var(--color-primary-dark)]'>
                  Bem-vindo(a) de volta!{' '}
                  <span
                    className='ml-1'
                    aria-hidden
                  >
                    👋
                  </span>
                </div>

                <div>
                  <Text
                    as='h2'
                    size='display'
                    weight='bold'
                    color='text'
                    className='text-balance'
                  >
                    Compare PF e PJ e descubra a melhor opção para o{' '}
                    <span className='text-[var(--color-primary)]'>
                      seu bolso
                    </span>
                    .
                  </Text>
                  <Text
                    size='md'
                    className='mt-3 max-w-xl text-gray-600'
                  >
                    Nossa calculadora analisa os custos e impostos para você
                    economizar tempo e dinheiro.
                  </Text>
                </div>

                <div className='rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-xl shadow-gray-900/10 md:p-8'>
                  <CalculatorForm
                    onCompare={handleCompare}
                    variant='home'
                  />
                </div>
              </div>

              <div
                className='relative flex justify-center lg:justify-end'
                aria-hidden
              >
                {/* Tamanho da ilustração: troque max-w-md por max-w-lg, max-w-xl, max-w-2xl ou max-w-[600px] */}

                <div className='relative w-full max-w-lg'>
                  <div className='pointer-events-none absolute -right-6 -top-6 -z-10 h-48 w-48 rounded-full bg-primary-light/80 blur-2xl md:h-64 md:w-64' />
                  <div className='home-hero-svg'>
                    <BusinessPlanAnimate className='animated h-auto w-full max-w-full' />
                  </div>
                </div>
              </div>
            </section>

            <section className='mt-16 grid gap-6 md:grid-cols-3'>
              <FeatureCard
                icon={
                  <FeatureIconWrap>
                    <TimePastIcon aria-hidden />
                  </FeatureIconWrap>
                }
                title='Simulações rápidas'
                description='Compare diferentes cenários em segundos.'
              />
              <FeatureCard
                icon={
                  <FeatureIconWrap>
                    <ShieldIcon />
                  </FeatureIconWrap>
                }
                title='Decisão inteligente'
                description='Escolha o regime tributário que oferece a maior economia.'
              />
              <FeatureCard
                icon={
                  <FeatureIconWrap>
                    <DataIcon aria-hidden />
                  </FeatureIconWrap>
                }
                title='Resultados claros'
                description='Entenda os números e tome decisões com confiança.'
              />
            </section>
          </>
        ) : (
          <CompareResult
            result={result}
            onBack={handleBack}
          />
        )}
      </div>

      <FloatingChatBotButton onClick={handleChatFabClick} />

      {chatOpen ? (
        <>
          <button
            type='button'
            className='fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px]'
            aria-label='Fechar chat'
            onClick={() => setChatOpen(false)}
          />
          <div className='fixed bottom-0 right-0 z-[110] flex h-[min(85vh,640px)] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-[var(--color-border)] bg-white shadow-2xl'>
            <Chatbot onClose={() => setChatOpen(false)} />
          </div>
        </>
      ) : null}
    </div>
  );
}
