import React, { useState } from 'react';
import InfoModal from './InfoModal.jsx';
import Text from './text.jsx';
import Input from './input.jsx';
import Button from './button.jsx';
import CalculatorIcon from '../assets/cards/calculator-svgrepo-com.svg?react';

const selectClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 outline-none transition-[border-color,box-shadow] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30';

export default function CalculatorForm({ onCompare, variant = 'standalone' }) {
  const [renda, setRenda] = useState('');
  const [custos, setCustos] = useState('');
  const [profissao, setProfissao] = useState('');
  const [errors, setErrors] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  const isHome = variant === 'home';

  function validate() {
    const e = {};
    const rendaNum = Number(renda);
    const custosNum = Number(custos);

    if (!renda) e.renda = 'Renda mensal é obrigatória.';
    else if (rendaNum <= 0 || rendaNum > 15000)
      e.renda = 'Informe um valor entre R$ 1 e R$ 15.000.';

    if (custos === '' || Number.isNaN(custosNum))
      e.custos = 'Custos mensais obrigatórios.';
    else if (custosNum < 0) e.custos = 'Custos não podem ser negativos.';

    if (!profissao) e.profissao = 'Selecione uma profissão.';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onCompare({
      rendaMensal: Number(renda),
      custosMensais: Number(custos),
      profissao,
    });
  }

  const formFields = (
    <>
      <div className={isHome ? 'grid gap-4 sm:grid-cols-2' : 'space-y-5'}>
        {isHome ? (
          <>
            <div>
              <Text
                as='label'
                htmlFor='renda'
                size='sm'
                weight='medium'
                color='text'
                className='mb-1.5 block'
              >
                Renda mensal (R$)
              </Text>
              <div className='relative'>
                <Input
                  id='renda'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Ex: 8.000,00'
                  variant={errors.renda ? 'error' : 'default'}
                  value={renda}
                  onChange={(ev) => setRenda(ev.target.value)}
                  aria-invalid={!!errors.renda}
                  aria-describedby={errors.renda ? 'err-renda' : undefined}
                  className='pr-10'
                />
                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400'>
                  R$
                </span>
              </div>
              {errors.renda && (
                <Text
                  id='err-renda'
                  size='sm'
                  color='danger'
                  className='mt-1'
                  role='alert'
                >
                  {errors.renda}
                </Text>
              )}
            </div>
            <div>
              <Text
                as='label'
                htmlFor='custos'
                size='sm'
                weight='medium'
                color='text'
                className='mb-1.5 block'
              >
                Total de custos mensais (R$)
              </Text>
              <div className='relative'>
                <Input
                  id='custos'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Ex: 1.200,00'
                  variant={errors.custos ? 'error' : 'default'}
                  value={custos}
                  onChange={(ev) => setCustos(ev.target.value)}
                  aria-invalid={!!errors.custos}
                  aria-describedby={errors.custos ? 'err-custos' : undefined}
                  className='pr-10'
                />
                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400'>
                  R$
                </span>
              </div>
              {errors.custos && (
                <Text
                  id='err-custos'
                  size='sm'
                  color='danger'
                  className='mt-1'
                  role='alert'
                >
                  {errors.custos}
                </Text>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='grid gap-2 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-6'>
              <Text
                as='label'
                htmlFor='renda'
                size='md'
                weight='medium'
                color='primaryDark'
                className='pt-2 md:pt-2.5'
              >
                Renda mensal (R$) — até R$ 15.000
              </Text>
              <div>
                <Input
                  id='renda'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Ex: 5000.00'
                  variant={errors.renda ? 'error' : 'default'}
                  value={renda}
                  onChange={(ev) => setRenda(ev.target.value)}
                  aria-invalid={!!errors.renda}
                  aria-describedby={errors.renda ? 'err-renda' : undefined}
                />
                {errors.renda && (
                  <Text
                    id='err-renda'
                    size='sm'
                    color='danger'
                    className='mt-1'
                    role='alert'
                  >
                    {errors.renda}
                  </Text>
                )}
              </div>
            </div>

            <div className='grid gap-2 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-6'>
              <Text
                as='label'
                htmlFor='custos'
                size='md'
                weight='medium'
                color='primaryDark'
                className='pt-2 md:pt-2.5'
              >
                Total de custos mensais (R$)
              </Text>
              <div>
                <Input
                  id='custos'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Ex: 1200.00'
                  variant={errors.custos ? 'error' : 'default'}
                  value={custos}
                  onChange={(ev) => setCustos(ev.target.value)}
                  aria-invalid={!!errors.custos}
                  aria-describedby={errors.custos ? 'err-custos' : undefined}
                />
                {errors.custos && (
                  <Text
                    id='err-custos'
                    size='sm'
                    color='danger'
                    className='mt-1'
                    role='alert'
                  >
                    {errors.custos}
                  </Text>
                )}
              </div>
            </div>
          </>
        )}

        <div
          className={
            isHome
              ? 'sm:col-span-2'
              : 'grid gap-2 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-6'
          }
        >
          <Text
            as='label'
            htmlFor='profissao'
            size={isHome ? 'sm' : 'md'}
            weight='medium'
            color={isHome ? 'text' : 'primaryDark'}
            className={isHome ? 'mb-1.5 block' : 'pt-2 md:pt-2.5'}
          >
            Profissão
          </Text>
          <div className={isHome ? '' : ''}>
            <select
              id='profissao'
              className={selectClass}
              value={profissao}
              onChange={(ev) => setProfissao(ev.target.value)}
            >
              <option value=''>Selecione sua profissão</option>
              <option>Psicólogo(a)</option>
              <option>Arquiteto(a)</option>
              <option>Advogado(a)</option>
            </select>
            {errors.profissao && (
              <Text
                size='sm'
                color='danger'
                className='mt-1'
                role='alert'
              >
                {errors.profissao}
              </Text>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          isHome
            ? 'mt-6 flex justify-end sm:col-span-2'
            : 'mt-8 flex justify-end'
        }
      >
        <Button
          type='submit'
          variant='primary'
          size='lg'
          className='min-w-[200px]'
        >
          Comparar PF × PJ →
        </Button>
      </div>
    </>
  );

  if (isHome) {
    return (
      <form
        id='calculatorForm'
        onSubmit={handleSubmit}
        className='space-y-6'
      >
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary'>
              <CalculatorIcon
                className='h-7 w-7'
                aria-hidden
              />
            </div>
            <div>
              <Text
                as='h2'
                size='lg'
                weight='bold'
                color='primary'
                className='!text-[var(--color-primary)]'
              >
                Nova simulação
              </Text>
              <Text
                size='sm'
                className='mt-0.5 text-gray-600'
              >
                Preencha seus dados para comparar PF e PJ
              </Text>
            </div>
          </div>
          <button
            type='button'
            onClick={() => setShowInfo(true)}
            className='self-start rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--color-primary-dark)] shadow-sm transition-colors hover:bg-primary-light/50'
          >
            Ajuda
          </button>
        </div>

        {formFields}

        <InfoModal
          show={showInfo}
          onHide={() => setShowInfo(false)}
        />
      </form>
    );
  }

  return (
    <form
      id='calculatorForm'
      onSubmit={handleSubmit}
      className='animate__animated animate__fadeInUp rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-xl shadow-gray-900/10 md:p-8'
    >
      <div className='mb-6 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] px-5 py-5 text-white md:flex-row md:items-center md:justify-between'>
        <div>
          <Text
            as='h2'
            size='xl'
            weight='bold'
            className='!text-white'
          >
            Simulação
          </Text>
          <Text
            size='sm'
            className='mt-1 text-green-100'
          >
            Compare PF e PJ com seus dados mensais.
          </Text>
        </div>
        <button
          type='button'
          onClick={() => setShowInfo(true)}
          className='rounded-full border border-white/70 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80'
        >
          Ajuda
        </button>
      </div>

      {formFields}

      <InfoModal
        show={showInfo}
        onHide={() => setShowInfo(false)}
      />
    </form>
  );
}
