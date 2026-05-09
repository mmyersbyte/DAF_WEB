import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/text.jsx';
import Button from '../components/button.jsx';
import LandingHeader from '../components/LandingHeader.jsx';
import LandingFooter from '../components/LandingFooter.jsx';
import FinanceAppSvg from '../assets/finance-app.svg?react';
import FeatureCard from '../components/FeatureCard.jsx';
import CalculatorIcon from '../assets/cards/calculator-svgrepo-com.svg?react';
import TimePastIcon from '../assets/cards/time-past-svgrepo-com.svg?react';
import DataIcon from '../assets/cards/data-svgrepo-com.svg?react';
import BotIcon from '../assets/cards/bot-svgrepo-com.svg?react';

export default function Landing() {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <LandingHeader />

      {/* BODY */}
      <main
        id='inicio'
        className='mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-12'
      >
        <section className='grid items-center gap-10 rounded-3xl bg-gradient-to-b from-white to-primary-light/20 p-7 md:grid-cols-2 md:gap-14 md:p-12'>
          <div>
            <span className='inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-dark'>
              Simule, compare, economize
            </span>

            <Text
              as='h1'
              size='display'
              weight='bold'
              color='text'
              className='mt-4 max-w-2xl !text-5xl !leading-tight md:!text-6xl'
            >
              Descubra se vale mais a pena ser{' '}
              <span className='text-primary'>PJ</span> ou{' '}
              <span className='text-primary'>PF</span> e pague menos impostos.
            </Text>

            <Text
              size='body'
              color='text'
              className='mt-5 max-w-xl !text-xl !leading-8 text-gray-600'
            >
              Nossa calculadora tributaria compara cenarios em minutos, mostra
              encargos e ajuda voce a tomar uma decisao com mais seguranca.
            </Text>

            <div className='mt-8 flex flex-wrap gap-3.5'>
              <Button
                as={Link}
                to='/register'
                variant='primary'
                className='min-w-[185px] !text-base'
              >
                Comecar agora
              </Button>
              <Button
                as={Link}
                to='/login'
                variant='outline'
                className='min-w-[185px] !text-base'
              >
                Ja tenho conta
              </Button>
            </div>

            <div className='mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-600'>
              <span className='inline-flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-primary' />
                Seus dados sao seguros
              </span>
              <span className='inline-flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-primary' />
                Sem compromisso
              </span>
            </div>
          </div>

          <figure className='flex justify-center rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-sm md:p-7'>
            <FinanceAppSvg
              className='animated h-auto w-full max-w-[600px]'
              role='img'
              aria-label='Ilustracao de app financeiro para comparacao tributaria'
            />
            <figcaption className='sr-only'>
              Ilustracao de um aplicativo de financas representando simulacao de custos para decidir entre PF e PJ.
            </figcaption>
          </figure>
        </section>

        <section
          id='por-que-usar'
          aria-labelledby='por-que-usar-heading'
          className='scroll-mt-24'
        >
          <Text
            as='h2'
            id='por-que-usar-heading'
            size='title'
            weight='bold'
            color='primaryDark'
            className='mb-10 text-center'
          >
            Por que usar nossa calculadora?
          </Text>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <FeatureCard
              icon={<CalculatorIcon aria-hidden />}
              title='Cálculos precisos'
              description='Simulações baseadas nas regras da Receita Federal sempre atualizadas.'
            />
            <FeatureCard
              icon={<TimePastIcon aria-hidden />}
              title='Economize tempo'
              description='Em poucos minutos, descubra a melhor opção para o seu perfil.'
            />
            <FeatureCard
              icon={<DataIcon aria-hidden />}
              title='Compare cenários'
              description='Visualize diferentes cenários e escolha o mais vantajoso para você.'
            />
            <FeatureCard
              icon={<BotIcon aria-hidden />}
              title='Assistente com IA'
              description='Use o chatbot de inteligência artificial para tirar dúvidas sobre tributação e simulações, com linguagem didática.'
            />
          </div>
        </section>

        <section
          id='perguntas-frequentes'
          className='rounded-3xl bg-white p-6 shadow-sm md:p-8'
        >
          <Text
            as='h2'
            size='title'
            weight='bold'
            color='primaryDark'
            className='mb-2 text-center'
          >
            Perguntas frequentes
          </Text>
          <Text
            size='body'
            className='mx-auto mb-6 max-w-3xl text-center text-gray-600'
          >
            Principais duvidas sobre a simulacao PF x PJ, calculos de tributos e
            suporte ao NAF.
          </Text>

          <div className='mx-auto max-w-4xl space-y-2'>
            <details className='group rounded-xl border border-[var(--color-border)] bg-white px-4 py-3'>
              <summary className='cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:content-none'>
                A calculadora realmente e gratuita?
              </summary>
              <Text size='md' className='mt-2 text-gray-600'>
                Sim. A ferramenta tem foco academico e uso educacional, sem custo
                para simulacoes.
              </Text>
            </details>

            <details className='group rounded-xl border border-[var(--color-border)] bg-white px-4 py-3'>
              <summary className='cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:content-none'>
                Quais dados preciso informar na simulacao?
              </summary>
              <Text size='md' className='mt-2 text-gray-600'>
                Voce informa renda mensal, custos mensais e profissao. Com isso o
                sistema compara os cenarios PF e PJ.
              </Text>
            </details>

            <details className='group rounded-xl border border-[var(--color-border)] bg-white px-4 py-3'>
              <summary className='cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:content-none'>
                Como o sistema calcula os tributos de PF?
              </summary>
              <Text size='md' className='mt-2 text-gray-600'>
                O calculo considera IRRF e compara as duas modalidades (deducoes e
                desconto simplificado), escolhendo a mais vantajosa conforme os
                dados informados.
              </Text>
            </details>

            <details className='group rounded-xl border border-[var(--color-border)] bg-white px-4 py-3'>
              <summary className='cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:content-none'>
                Como funciona o calculo de PJ no Simples Nacional?
              </summary>
              <Text size='md' className='mt-2 text-gray-600'>
                Para PJ, a base principal e a receita mensal. O sistema estima DAS,
                INSS sobre pro-labore e IRRF do pro-labore para compor os encargos.
              </Text>
            </details>

            <details className='group rounded-xl border border-[var(--color-border)] bg-white px-4 py-3'>
              <summary className='cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:content-none'>
                Posso enviar os resultados para tirar duvidas com o NAF?
              </summary>
              <Text size='md' className='mt-2 text-gray-600'>
                Sim. A plataforma permite encaminhar os resultados por e-mail para
                o NAF da Unichristus quando voce precisar de orientacao.
              </Text>
            </details>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
